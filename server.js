#!/usr/bin/env node

const {join} = require('path');
const {createServer} = require('http');
const {parse} = require('url');
const next = require('next');

const app = next({dev: false});
const handle = app.getRequestHandler();
const port = Number.parseInt(process.argv.pop().split('=')[1] || 3000);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const {pathname: pathName} = parsedUrl;
    if (pathName === '/service-worker.js') {
      app.serveStatic(req, res, join(__dirname, '.next', 'service-worker.js'));
      return;
    }
    if (pathName.startsWith('/static/')) {
      res.setHeader('Service-Worker-Allowed', '/');
      app.serveStatic(req, res, join(__dirname, pathName));
      return;
    }
    handle(req, res, req.url);
  }).listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
