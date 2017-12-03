'use strict'

var os = require('os')
var fs = require('fs')
var path = require('path')
var http = require('http')
var test = require('tape')
var download = require('./')

var DIR = os.tmpdir()

test('200 Ok', function (t) {
  var server = http.createServer(function (req, res) {
    res.end('Hello World')
  })

  server.listen(function () {
    var url = 'http://localhost:' + server.address().port
    var file = path.join(DIR, String(Date.now()))
    download(url, file, function (err, filepath) {
      t.error(err)
      t.ok(fs.existsSync(file))
      t.ok(fs.readFileSync(file), 'Hello World')
      t.equal(file, filepath)
      server.close()
      t.end()
    })
  })
})

test('Not 200 Ok', function (t) {
  var server = http.createServer(function (req, res) {
    res.writeHead(500)
    res.end('Hello World')
  })

  server.listen(function () {
    var url = 'http://localhost:' + server.address().port
    var file = path.join(DIR, String(Date.now()))
    download(url, file, function (err) {
      t.equal(err.code, 500)
      t.equal(err.message, 'Unexpected HTTP status code: 500')
      t.notOk(fs.existsSync(file))
      server.close()
      t.end()
    })
  })
})
