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

    initializeProjects();
    initializeUsers();

};

function onClickProject(event) {
    const {target} = event;
    const projectId = target.dataset.id;

    history.pushState({projectId}, document.title, '/project/' + projectId );
    onLoad();
}

function initializeProjects() {
    const Projects = require('../Projects');
    const Modal = require('../Modal');

    const projects = new Projects({
        element: document.querySelector('#projects .projects'),
        projects: [
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
            { id: 0, name: 'Un projet', onClick: onClickProject },
        ],
        onAdd: function (event) {
            const modalCreateProject = new Modal({
                id: 'modalCreateProject',
                trigger: event.target,
                onConfirm: function (modal) {
                    // TODO : create project
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
            const projectId = target.dataset.id;
            if (projectId) {
                history.pushState({}, document.title, '/project/' + projectId);
                onLoad();
            }
        }
    });
    console.log({projects});
}

function onClickUser(event) {
    const {target} = event;
    const userId = target.dataset.id;

    history.pushState({}, document.title, '/user/' + userId );
    onLoad();
}

function initializeUsers() {
    const Users = require('../Users');
    const Modal = require('../Modal');

    const users = new Users({
        element: document.querySelector('#users .users'),
        users: [
            { id: 0, name: 'Ulysse ARNAUD', onClick: onClickUser },
            { id: 0, name: 'Abd-el-illah BELLIFA\n', onClick: onClickUser },
            { id: 0, name: 'Aurélien SANTANA', onClick: onClickUser },
            { id: 0, name: 'Ryane ABBACHE', onClick: onClickUser }
        ],
        onAdd: function (event) {
            const modalAddUser= new Modal({
                id: 'modalAddUser',
                trigger: event.target,
                onConfirm: function (modal) {
                    // TODO : create project
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
            const userId = target.dataset.id;
            if (userId) {
                history.pushState({}, document.title, '/user/' + userId);
                onLoad();
            }
        }
    });
    console.log({users});
}