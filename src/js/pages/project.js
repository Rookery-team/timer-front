module.exports = function() {

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

    const Timer = require('../Timer');
    const timer = new Timer({
        element: document.querySelector('.timer'),
        onStart: function() {
            console.log('timer starting !');
        },
        onUpdate: function() {
            console.log('timer updating !');
        },
        onPause: function() {
            console.log('timer pausing !');
        }
    });
    console.log({timer});
    timer.pause();


    window.footimer = timer;

};
