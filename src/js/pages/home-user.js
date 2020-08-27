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

    initializeGroups();

};

function onClickGroup(event) {
    const {target} = event;
    const groupId = target.dataset.id;

    history.pushState({groupId}, document.title, '/group/' + groupId );
    onLoad();
}

function initializeGroups() {
    const Groups = require('../Groups');
    const Modal = require('../Modal');

    fetch(loginForm.action, {
        method: loginForm.method,
        body: formData,
        mode: 'cors',
        headers: {
            'Content-type': 'multipart/form-data'
        }})
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            const {ok} = response;
            if (ok) {
                history.pushState({}, document.title, '/dashboard');
            }
        })
        .catch(function (response) {
            removeSpinnerInButton(target);
            enableButton(target);
            const modalError = new Modal({
                id: 'modalError'
            });
        });

    const myGroups = new Groups({
        element: document.querySelector('#myGroups .groups'),
        groups: [
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 1, name: 'Un groupe', onClick: onClickGroup },
            { id: 2, name: 'Un groupe', onClick: onClickGroup }
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
            { id: 0, name: 'Un groupe', onClick: onClickGroup },
            { id: 1, name: 'Un groupe', onClick: onClickGroup },
            { id: 2, name: 'Un groupe', onClick: onClickGroup },
            { id: 2, name: 'Un groupe', onClick: onClickGroup },
            { id: 2, name: 'Un groupe', onClick: onClickGroup }
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
}