import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.server.config.js';
import logMessage from '../src/js/logger';

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(
        DIST_DIR,
        'index.html'
    ),
    compiler = webpack(config);

logMessage({DIST_DIR});

app.use(webpackDevMiddleware(
    compiler,
    {
        publicPath: config.output.publicPath
    }
));

app.use(webpackHotMiddleware(compiler));

app.get(
    '*',
    (
        req,
        res,
        next
    ) => {
        compiler.outputFileSystem.readFile(
            HTML_FILE,
            (
                err,
                result
            ) => {
                if (err) {
                    return next(err);
                }
                // res.set('content-type', 'text/html')
                res.set(
                    'Content-Security-Policy',
                    'style-src \'self\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com; default-src \'self\' https://fonts.gstatic.com'
                );
                res.send(result);
                // res.render('/')
                res.end();
            }
        );
    }
);

const PORT = process.env.PORT || 8042;

app.listen(
    PORT,
    () => {
        console.log(`App listening to ${PORT}....`);
        console.log('Press Ctrl+C to quit.');
    }
);
