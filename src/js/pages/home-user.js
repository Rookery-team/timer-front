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
    const Modal = require('../Modal');

    const ENDPOINT_API = 'http://localhost:8001';
    const urlMyGroups = ENDPOINT_API + '/user/groups/owned';
    const urlGroupsJoined = ENDPOINT_API + '/user/groups/joined';

    const userId = localStorage.getItem('user');

    fetch(urlMyGroups, {
        method: 'POST',
        body: {userId},
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        }})
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            const {ok} = response;
            if (ok) {
                const {data} = response;
                setMyGroups(data);
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

        fetch(urlGroupsJoined, {
            method: 'POST',
            body: {userId},
            headers: {
                'Content-type': 'application/json'
            }})
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            const {ok} = response;
            if (ok) {
                const {data} = response;
                setMyGroups(data);
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
}

function setMyGroups(data) {
    const Groups = require('../Groups');

    let groups = [];

    for (
        let cursor = 0, cursorMax = data.length;
        cursor < cursorMax;
        cursor++) {

        const entry = data[cursor];
        const {id,name} = entry;

        const group = {id, name, onClick, onClickGroup};
        groups.push(group);
    }

    const myGroups = new Groups({
        groups,
        element: document.querySelector('#myGroups .groups'),
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
}


function setGroupsJoined(data) {
    const Groups = require('../Groups');

    let groups = [];

    for (
        let cursor = 0, cursorMax = data.length;
        cursor < cursorMax;
        cursor++) {

        const entry = data[cursor];
        const {id,name} = entry;

        const group = {id, name, onClick, onClickGroup};
        groups.push(group);
    }

    const groupsJoined = new Groups({
        element: document.querySelector('#groupsJoined .groups'),
        groups,
        onAdd: function (event) {
            const modalCreateGroup = new Modal({
                id: 'modalJoinGroup',
                trigger: event.target,
                onConfirm: function (modal) {},
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