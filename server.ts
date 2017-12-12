import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
import {renderModuleFactory} from '@angular/platform-server';
import {enableProdMode} from '@angular/core';

enableProdMode();

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const {AppServerModuleFactory, LAZY_MODULE_APP} = require('./dist/server/main.bundle');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleFactory, {
    document: template,
    url: options.req.url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_APP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
