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

    const ENDPOINT_API = 'http://localhost:8001';
    const urlSaveEntry = ENDPOINT_API + '/entry/save';
    const urlShowEntry = ENDPOINT_API + '/entry/show';

    const groupId = localStorage.getItem('groupId');
    const userId = localStorage.getItem('userId');

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
            fetch(urlSaveEntry, {
                method: 'POST',
                body: {groupId, userId},
                headers: {
                    'Content-type': 'application/json'
                }})
                .then(function (response) {
                    return response.json();
                })
                .then(function(response) {
                    const {ok} = response;
                    if (ok) {
                        // TODO : Mettre l'entrée dans l'affichage des entrées (évite le rechargement de la page)
                    }
                })
                .catch(function (response) {
                    const modalError = new Modal({
                        id: 'modalError'
                    });
                });
        }
    });
    timer.pause();
};

function addEntry() {
    // TODO : Ajoute une entree dans la liste des entrées affichées.
}
