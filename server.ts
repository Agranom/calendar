import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
import * as pdf from 'html-pdf';
import {enableProdMode} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {renderModuleFactory} from '@angular/platform-server';


enableProdMode();

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');


// app.engine('html', ngExpressEngine({
//     bootstrap: AppServerModuleNgFactory,
//     providers: [
//         provideModuleMap(LAZY_MODULE_MAP)
//     ]
// }));
app.engine('html', (_, options, callback) => {
    const opts = {
        document: template,
        url: options.req.url,
        extraProviders: [{provide: REQUEST, useFactory: () => options.req, deps: []}]
    };
    renderModuleFactory(AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/


// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', {req});
});

app.post('/api/events', (req, res) => {
    app.render('index', {req}, function (error, html) {
        // const htmlWithoutScripts = html.replace(/<script(.*?)+<\/script>/g, '');
        // const testHtml = fs.readFileSync(htmlWithoutScripts, 'utf8');
        // fs.writeFile('tmp.html', htmlWithoutScripts, (err) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     console.log('End of write temporary html file');
        // });
        const testHtml = readFileSync('./tmp.html', 'utf8');
        console.log(testHtml);
        pdf.create(testHtml).toStream((err, stream) => {
            if (err) {
                console.log(err);
            }
            stream.on('error', (errore) => {
                console.log('Error suka in stream');
            });
        });
    });
    res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
