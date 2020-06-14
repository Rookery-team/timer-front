const View = require('./js/View');

let view;

switch (window.location.pathname) {
    case '/a':
        view = new View({
            name: 'home-guest',
            url: '/',
            callback: require('./js/pages/home-user')
        });
        view.display();
        break;
    case '/':
        view = new View({
            name: 'home-user',
            url: '/',
            callback: require('./js/pages/home-user')
        });
        view.display();
        break;
}