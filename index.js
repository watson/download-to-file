'use strict'

var fs = require('fs')
var path = require('path')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')
var pump = require('pump')

module.exports = function (url, filepath, cb) {
  var transport = url.indexOf('https://') === 0 ? https : http
  return transport.get(url, function (res) {
    if (res.statusCode !== 200) {
      var err = new Error('Unexpected HTTP status code: ' + res.statusCode)
      err.code = res.statusCode
      cb(err)
      return
    }
    mkdirp(path.dirname(filepath), function (err) {
      if (err) return cb(err)
      var file = fs.createWriteStream(filepath)
      pump(res, file, function (err) {
        cb(err, filepath)
      })
    })
  }).on('error', cb)
}
