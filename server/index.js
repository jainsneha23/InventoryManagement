import express from 'express';
import path from 'path';
import template from './template';

/* eslint-disable no-console */

const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const app = express();

app.get('/', (req, res) => {
  res.send(template.compile(path.join(__dirname, '../web/index.html')));
});

app.get('/views/*', (req, res) => {
  res.send(template.compile(path.join(__dirname,`../web/${req.url}/index.html`)));
});

app.use('/web', express.static('web'));

app.use((req, res) => {
  res.send('Invalid request', 404);
});

app.use((err, req, res) => {
  res.send('Something went wrong', 500);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception Error: ',err);
});

const server = app.listen(port, ip, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});

export default server;

