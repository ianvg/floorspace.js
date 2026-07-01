// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var fs = require('fs')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

function hasNonDotFiles (dir) {
  return fs.existsSync(dir) &&
    fs.readdirSync(dir).some(function (file) { return file[0] !== '.' })
}

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
var viewerPath = path.join(config.build.assetsRoot, config.build.viewerSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
mkdir('-p', viewerPath)
if (hasNonDotFiles('static')) {
  cp('-R', 'static/*', assetsPath)
}
if (hasNonDotFiles('3DViewer/build')) {
  cp('3DViewer/build/*', viewerPath)
}

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
  process.exit(0);
})
