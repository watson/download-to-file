'use strict'

var fs = require('fs')
var path = require('path')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')
var pump = require('pump')

module.exports = function (url, dir, name, cb) {
  var transport = url.indexOf('https://') === 0 ? https : http
  return transport.get(url, function (res) {
    if (res.statusCode !== 200) {
      var err = new Error('Unexpected HTTP status code: ' + res.statusCode)
      err.code = res.statusCode
      cb(err)
      return
    }
    mkdirp(dir, function (err) {
      if (err) return cb(err)
      var file = fs.createWriteStream(path.join(dir, name))
      pump(res, file, cb)
    })
  }).on('error', cb)
}
