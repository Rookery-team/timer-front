module.exports = function() {

    const Groups = require('../Groups');
    const Modal = require('../Modal');

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
        element: document.querySelector('#myGroups .groups'),
        groups: [
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 0, name: 'Un groupe' },
            { id: 1, name: 'Un groupe' },
            { id: 2, name: 'Un groupe' }
        ],
        onAdd: function (event) {
            const modalCreateGroup = new Modal({
                id: 'modalCreateGroup',
                trigger: event.target,
                onConfirm: function (modal) {
                    // TODO : create group
                },
                onDeny: function (modal) {
                    // TODO : error with modal
                },
                onClose: function (modal) {
                    // TODO : on modal close ?
                }
            });
        },
        onClick: function(event) {
            const {target} = event;
            const groupId = target.dataset.id;
            if (groupId) {
                history.pushState({}, document.title, '/group/' + groupId);
                onLoad();
            }
        }
    });

    const groupsJoined = new Groups({
        element: document.querySelector('#groupsJoined .groups'),
        groups: [
            { id: 0, name: 'Un groupe' },
            { id: 1, name: 'Un groupe' },
            { id: 2, name: 'Un groupe' },
            { id: 2, name: 'Un groupe' },
            { id: 2, name: 'Un groupe' }
        ],
        onAdd: function (event) {
            const modalCreateGroup = new Modal({
                id: 'modalJoinGroup',
                trigger: event.target,
                onConfirm: function (modal) {
                    // TODO : create group
                },
                onDeny: function (modal) {
                    // TODO : error with modal
                },
                onClose: function (modal) {
                    // TODO : on modal close ?
                }
            });
        }
    });

    console.log({groupsJoined, myGroups});

};