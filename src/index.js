import {initializeHomeUserPage} from "./js/pages/home-user";
require('./js/groups/index');

window.jQuery = window.$ = require('jquery');
require('popper.js');
require('bootstrap');

switch (window.location.pathname) {
    case '/dashboard':
        initializeHomeUserPage();
        break;
}