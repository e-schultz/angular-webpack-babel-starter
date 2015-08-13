'use strict';

var path = require('path');
var webpack = require('webpack');
// var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src'),
];

module.exports = function makeWebpackConfig(options) {

  /**
   * ENV Type
   *
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;

  var config = {};

  /**
   * Entry Config
   */
  if (TEST) {
    config.entry = {};
  } else {
    config.entry = {
      app: './src/app.js'
    };
  }

  /**
   * Output Config
   */
  if (TEST) {
    config.output = {};
  } else {
    config.output = {
      path: __dirname + '/dist',
      publicPath: BUILD ? '/' : 'http://localhost:8080/',
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    };
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    preLoaders: [],
    loaders: [{
      /**
       * JS LOADER
       * Reference: https://github.com/babel/babel-loader
       * Transpile .js files using babel-loader
       * Compiles ES6 and ES7 into ES5 code
       */
      test: /\.js$/,
      loaders: [
        'babel?optional=runtime',
        'ng-annotate'
      ],
      exclude: /node_modules/
    }, {
      /**
       * ASSET LOADER
       * Reference: https://github.com/webpack/file-loader
       * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
       * Rename the file using the asset hash
       * Pass along the updated reference to your code
       * You can add here any file extension you want to get copied to your output
       */
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    }, {
      // SASS LOADER
      // Reference: https://github.com/jtangelder/sass-loader
      // Allow loading scss through js
      test: /\.scss$/,
      loader: !TEST ?
        ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) : 'null',
    }]
  };

  if (TEST) {

    // ISPARTA LOADER    
    // Reference: https://github.com/ColCh/isparta-instrumenter-loader   
    // Instrument JS files with Isparta for subsequent code coverage reporting   
    // Skips node_modules and files that end with .test.js   
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.test\.js$/
      ],
      loader: 'isparta-instrumenter'
    });
  }

  if (!TEST) {
    config.module.preLoaders.push({
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: [
        /\.webpack\.js$/,
        /node_modules/,
        /\.test\.js$/,
        /dist/
      ]
    });
  }

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST
    })
  ];

  // Skip rendering index.html in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: BUILD
      })
    );
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './dist',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
};
