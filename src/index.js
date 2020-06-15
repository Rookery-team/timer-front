$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

window.onLoad = function () {
    const View = require('./js/View');

    let view, id;
    let url = (function (pathname) {
        let url = pathname;

        const isUrlWithId = (new RegExp('(.+)/([0-9]+)$', 'g')).test(url);

        if (isUrlWithId) {
            id = (function (path) {
                return path.split('/').pop();
            })(url);
            url = (function (pathname) {
                pathname = pathname.split('/');
                pathname = pathname.slice(0, pathname.length - 1);
                pathname = pathname.join('/');
                return pathname;
            })(pathname);
        }

        return url;
    })(window.location.pathname);

    switch (url) {
        case '/':
            view = new View({
                name: 'home-guest',
                url: '/',
                callback: require('./js/pages/home-guest')
            });
            view.display();
            break;
        case '/dashboard':
            view = new View({
                name: 'home-user',
                url: '/dashboard',
                callback: require('./js/pages/home-user')
            });
            view.display();
            break;
        case '/group':
            console.log({id});
            if (undefined === id || null === id) {
                history.pushState({}, document.title, '/error-404');
            } else {
                view = new View({
                    name: 'group',
                    url: '/group/' + id,
                    callback: require('./js/pages/group')
                });
                view.display();
            }
            break;
        default:
            view = new View({
                name: 'error-404',
                url: '/error-404',
                callback: require('./js/pages/error-404')
            });
            view.display();
    }
}

document.addEventListener('DOMContentLoaded', () => onLoad());

window.onpopstate = function (e) {
    onLoad();
};