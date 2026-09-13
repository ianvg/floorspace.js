'use strict'

// sass-loader 4 requires a package named node-sass and calls its legacy
// render API. Dart Sass still implements that API, so keep the old loader
// contract local while removing the native LibSass dependency.
module.exports = require('sass')
