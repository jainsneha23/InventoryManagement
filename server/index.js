import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import dbConnection from '../api/sp-node-mysql/app.js';
import Routes from '../api/routes';
import config from './config';

import webpack from 'webpack';
import webpackConfig from '../web/webpack.dev';

/* eslint-disable no-console */

const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const app = express();
const dbCon = dbConnection();

const env = port === 3000 ? 'development' : 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  config.headers.forEach(header => res.setHeader(header.key, header.value));
  next();
});

Routes.insertRoutes(app, dbCon);

if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {}));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../web/index.html'));
});

app.use((req, res) => {
  res.send('Page not found', 404);
});

app.use((err, req, res) => {
  res.send('Something went wrong', 500);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception Error: ', err);
});

const server = app.listen(port, ip, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});

export default server;
