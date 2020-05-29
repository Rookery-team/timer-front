import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.server.config.js';
import logMessage from '../js/logger';
import {getViewPath} from "./shared/_path";

import {router as dashboardRouter} from './routes/dashboard';

const app = express();
const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {publicPath: config.output.publicPath});
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(path.join(process.cwd(), './dist')));
app.set('views', path.join(process.cwd(), './dist/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', (req, res, next) => {
        res.set(
            'Content-Security-Policy',
            "style-src-elem 'self' 'unsafe-eval' 'unsafe-inline' data:; img-src 'self' data:; style-src 'unsafe-eval' 'self' https://fonts.googleapis.com; font-src 'unsafe-eval' 'self' https://fonts.gstatic.com; default-src 'self' https://fonts.gstatic.com 'unsafe-inline' 'unsafe-eval'"
        );
        res.render(getViewPath('home-guest'));
        res.end();
    }
);

app.use('/dashboard', dashboardRouter);

app.get('*', (req, res, next) => {
        res.set(
            'Content-Security-Policy',
            "style-src-elem 'self' 'unsafe-eval' 'unsafe-inline' data:; img-src 'self' data:; style-src 'unsafe-eval' 'self' https://fonts.googleapis.com; font-src 'unsafe-eval' 'self' https://fonts.gstatic.com; default-src 'self' https://fonts.gstatic.com 'unsafe-inline' 'unsafe-eval'"
        );
        res.render(getViewPath('error_404'));
        res.end();
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
