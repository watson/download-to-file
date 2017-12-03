# download-to-file

Download a file to disk programmatically.

[![Build status](https://travis-ci.org/watson/download-to-file.svg?branch=master)](https://travis-ci.org/watson/download-to-file)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install download-to-file --save
```

## Usage

```js
var download = require('download-to-file')

console.log('Downloading to /tmp/example.html')
download('http://example.com/', '/tmp/example.html', function (err, filepath) {
  if (err) throw err
  console.log('Download finished:', filepath)
})
```

## API

### `download(url, filepath, callback)`

Will download the content of the given `url` and store it in a file
specified by `filepath`. When done, the `callback` will be called with
an optional error object as the first argument and the `filepath` as the
second argument.

If the server does not return a 200 HTTP status code, the callback will
be called with an error and the file will not be stored on disk.

## License

MIT
