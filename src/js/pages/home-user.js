module.exports = function() {

    const Groups = require('../Groups');

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

    const myGroups = new Groups({
        element: document.getElementById('myGroups'),
        groups: []
    });

    const groupsJoined = new Groups({
        element: document.getElementById('groupsJoined'),
        groups: []
    });

    console.log({groupsJoined, myGroups});

};