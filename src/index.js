const View = require('./js/View');


let view;

console.log({
    foo: window.location.pathname
});

switch (window.location.pathname) {
    case '/':
        view = new View({
            name: 'home-guest',
            url: '/',
            callback: function () {
                const leftNav = document.getElementById('leftNav');
                if (leftNav) {
                    leftNav.classList.add('theme-ipssi');
                    leftNav.classList.remove('theme-ipssi-alt');
                }

                const rightNav = document.getElementById('rightNav');
                if (rightNav) {
                    rightNav.classList.add('theme-ipssi-alt');
                    rightNav.classList.remove('theme-ipssi');
                }
            }
        });
        view.display();
        break;
    case '/dashboard':
        view = new View({
            name: 'home-user',
            url: '/dashboard',
            callback: function () {
                const leftNav = document.getElementById('leftNav');
                if (leftNav) {
                    leftNav.classList.add('theme-ipssi');
                    leftNav.classList.remove('theme-ipssi-alt');
                }

                const rightNav = document.getElementById('rightNav');
                if (rightNav) {
                    rightNav.classList.add('theme-ipssi-alt');
                    rightNav.classList.remove('theme-ipssi');
                }
            }
        });
        view.display();
        break;
}