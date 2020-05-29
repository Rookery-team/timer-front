import express from 'express';
import {getViewPath} from "../shared/_path";

export const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.set(
        'Content-Security-Policy',
        "style-src-elem 'self' 'unsafe-eval' 'unsafe-inline' data:; img-src 'self' data:; style-src 'unsafe-eval' 'self' https://fonts.googleapis.com; font-src 'unsafe-eval' 'self' https://fonts.gstatic.com; default-src 'self' https://fonts.gstatic.com 'unsafe-inline' 'unsafe-eval'"
    );
    res.render(getViewPath('home-user'));
    res.end();
});

// define the group route
router.get('/group/:id', function(req, res) {
    res.set(
        'Content-Security-Policy',
        "style-src-elem 'self' 'unsafe-eval' 'unsafe-inline' data:; img-src 'self' data:; style-src 'unsafe-eval' 'self' https://fonts.googleapis.com; font-src 'unsafe-eval' 'self' https://fonts.gstatic.com; default-src 'self' https://fonts.gstatic.com 'unsafe-inline' 'unsafe-eval'"
    );
    res.render(getViewPath('group'));
    res.end();
});