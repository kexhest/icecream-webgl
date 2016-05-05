/* eslint-disable strict, global-require */

'use strict';

const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const path = require('path');

const port = process.env.PORT || 3000;
const root = path.join(__dirname, './../public');
const logLevel = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../webpack.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    // noInfo: true,
    reload: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(compression());
app.use(logger(logLevel));

app.use('/', express.static(root, {
  maxage: 31557600,
}));

app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    res.header('Cache-Control', 'max-age=60, must-revalidate, private');
    res.sendFile('index.html', { root });
  } else {
    next();
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    // return
  }

  console.log('Server running on port %s', port);
});
