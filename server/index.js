import express from 'express';
import path from 'path';
import template from './template';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send(template.compile(path.join(__dirname, '../web/index.html')));
});

app.get('/views/*', (req, res) => {
  res.send(template.compile(path.join(__dirname,`../web/${req.url}/index.html`)));
});

app.use('/web', express.static('web'));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
