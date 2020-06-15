
$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

window.onLoad = function () {
    const View = require('./js/View');

    let view;
    let url = window.location.pathname;

    const isGroupUrl = (new RegExp('/group/[0-9]', 'g')).test(url);

    let groupId = null;
    if (isGroupUrl) {
        groupId = (function (path) {
            return path.split('/').pop();
        })(url);
        url = '/group';
    }

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
            view = new View({
                name: 'group',
                url: '/group/' + groupId,
                callback: require('./js/pages/group')
            });
            view.display();
    }
}

document.addEventListener('DOMContentLoaded', () => onLoad());