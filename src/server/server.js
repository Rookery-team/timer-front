import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.server.config.js';
import logMessage from '../js/logger';

const app = express(),
    compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {publicPath: config.output.publicPath});
const hotMiddleware = webpackHotMiddleware(compiler);

const VIEW_HOME_GUEST = path.join(process.cwd(), "./dist/views/home-guest.html");
const VIEW_HOME_USER = path.join(process.cwd(), "./dist/views/home-user.html");

app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(path.join(process.cwd(), './dist')));
app.set('views', path.join(process.cwd(), './dist/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res, next) => {
        res.set(
            'Content-Security-Policy',
            'style-src \'self\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com; default-src \'self\' https://fonts.gstatic.com'
        );
        res.render(VIEW_HOME_GUEST);
        res.end();
    }
);
app.get('/dashboard', (req, res, next) => {
        res.set(
            'Content-Security-Policy',
            'style-src \'self\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com; default-src \'self\' https://fonts.gstatic.com'
        );
        res.render(VIEW_HOME_USER);
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
