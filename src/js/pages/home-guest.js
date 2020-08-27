const ENDPOINT_API = 'http://localhost:8001';

module.exports = function () {

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

    initializeAuthButtons();
};


function initializeAuthButtons() {

    const Modal = require('../Modal');

    const addSpinnerInButton = require('../utils/_addSpinnerInButton');
    const disableButton = require('../utils/_disableButton');
    const removeSpinnerInButton = require('../utils/_removeSpinnerInButton');
    const enableButton = require('../utils/_enableButton');

    _initializeButton('btnLogin', onBtnLoginClick);
    _initializeButton('btnRegister', onBtnRegisterClick);

    function _initializeButton(button, onClick) {
        button = document.getElementById(button);
        button.addEventListener('click', onClick, false);
    }

    function onBtnLoginClick(event) {
        // TODO : add spinner in button
        // TODO : disable button
        // TODO : start fetch
        // TODO :   |  If response, get response.json().
        // TODO :   |  Else : Throw error through response.json()
        // TODO :   |  then, if auth connected : set cookies & change url (with onLoad function)
        // TODO :   |        else, display modal with response error message, remove spinner in button
        // TODO :   |              and re-enable button
        // TODO :   |  End fetch

        const {target} = event;

        addSpinnerInButton(target);
        disableButton(target);

        const loginForm = document.getElementById('form-login');
        const formData = new FormData(loginForm);

        fetch(loginForm.action, {
            method: 'POST',
            body: formData,
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
                    localStorage.setItem('user', data);
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

    function onBtnRegisterClick(event) {
        // TODO : add spinner in button
        // TODO : disable button
        // TODO : start fetch
        // TODO :   |  If response, get response.json().
        // TODO :   |  Else : Throw error through response.json()
        // TODO :   |  then, if auth connected : set cookies & change url (with onLoad function)
        // TODO :   |        else, display modal with response error message, remove spinner in button
        // TODO :   |              and re-enable button
        // TODO :   |  End fetch

        const {target} = event;

        addSpinnerInButton(target);
        disableButton(target);

        const registerForm = document.getElementById('form-register');
        const formData = new FormData(registerForm);

        fetch(registerForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-type': 'application/json'
            }})
            .then(function (response) {
                return response.json();
            })
            .catch(function (response) {
                removeSpinnerInButton(target);
                enableButton(target);
                const modalError = new Modal({
                    id: 'modalError'
                });
            });
    }
}