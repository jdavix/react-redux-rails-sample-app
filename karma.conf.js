var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'chai' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      resolve: {
        root: path.join(__dirname, '..', 'webpack'),
        extensions: ['', '.js', '.jsx', '.json']
      },
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [{
          test:  /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ["babel-loader"]
        }]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
