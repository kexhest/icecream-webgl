/* eslint-disable strict, global-require, max-len */

'use strict';

const path = require('path');
const webpack = require('webpack');
const objectAssign = require('object-assign');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';
const dev = !(production || test);

const config = {
  resolve: {
    root: [
      path.resolve(__dirname, 'app', 'scripts'),
      path.resolve(__dirname, 'app', 'videos'),
      path.resolve(__dirname, 'app', 'images'),
      path.resolve(__dirname, 'app', 'fonts'),
      path.resolve(__dirname, 'app', 'styles'),
    ],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', 'scss'],
    alias: {},
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(woff|woff2|svg|png|jpg|jpeg|gif|m4a|mp4|webm)$/,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]&limit=10000',
      },
      {
        test: /\.scss$/,
        loader: production
          ? ExtractTextPlugin.extract('style', 'css!postcss!sass')
          : 'style!css!postcss!sass',
      },
    ],
  },

  sassLoader: {
    outputStyle: 'expanded',
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'app', 'styles'),
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      fetch: 'exports?global.fetch!whatwg-fetch',
      'Object.assign': 'exports?global.Object.assign!es6-object-assign',
      'Object.keys': 'exports?global.Object.keys!object-keys',
      CANNON: 'exports?CANNON!cannon',
      CannonDebugRenderer: 'imports?CANNON=cannon!exports?THREE.CannonDebugRenderer!cannon/tools/threejs/CannonDebugRenderer.js',
      THREE: 'exports?THREE!three',
      OrbitControls: 'imports?THREE=three!exports?THREE.OrbitControls!three/examples/js/controls/OrbitControls',
      FirstPersonControls: 'imports?THREE=three!exports?THREE.FirstPersonControls!three/examples/js/controls/FirstPersonControls',
      DeviceOrientationControls: 'imports?THREE=three!exports?THREE.DeviceOrientationControls!three/examples/js/controls/DeviceOrientationControls',
      VRControls: 'imports?THREE=three!exports?THREE.VRControls!three/examples/js/controls/VRControls',
      VREffect: 'imports?THREE=three!exports?THREE.VREffect!three/examples/js/effects/VREffect',
      StereoEffect: 'imports?THREE=three!exports?THREE.StereoEffect!three/examples/js/effects/StereoEffect',
      CardboardEffect: 'imports?THREE=three!exports?THREE.CardboardEffect!three/examples/js/effects/CardboardEffect',
      WEBVR: 'exports?WEBVR!three/examples/js/WebVR',
      Stats: 'exports?Stats!three/examples/js/libs/stats.min',
      'dat.GUI': 'exports?dat.GUI!three/examples/js/libs/dat.gui.min.js',
    }),
  ],
};

if (!test) {
  objectAssign(config, {
    devtool: dev ? 'cheap-module-eval-source-map' : undefined,

    entry: {
      vendor: [
        'three',
        'cannon',
      ],
      app: [
        path.resolve(__dirname, 'app', 'entry.js'),
      ].concat(dev
        ? [
          'eventsource-polyfill', // necessary for hot reloading with IE
          'webpack-hot-middleware/client',
        ]
        : []
      ),
    },

    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: `${production ? '[chunkhash]' : '[name]'}.js`,
      chunkFilename: `${production ? '[chunkhash]' : '[name]'}.js`,
    },

    postcss: [
      require('autoprefixer')({ browsers: ['last 2 version'] }),
    ].concat(production
      ? [require('csswring')({ removeAllComments: true })]
      : []
    ),
  });

  config.plugins.push(...[
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'app', 'index.template.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ]);

  config.plugins.push(...(production ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      mangle: true,
      compress: {
        drop_console: true,
        dead_code: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin(`${production ? '[contenthash]' : '[name]'}.css`),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]));
}

module.exports = config;
