import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
import {enableProdMode} from '@angular/core';

import {ngExpressEngine} from '@nguniversal/express-engine';

import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
enableProdMode();

const app = express();

const PORT = process.env.PORT || 5000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');



app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
