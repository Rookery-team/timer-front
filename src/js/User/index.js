module.exports = User;

const createElementFromHTML = require('../utils/_createElementFromHTML');

function User (args) {

    let defaultParameters = {
        name: 'Utilisateur',
        id: -1,
        onClick: () => {}
    };
    args = {...defaultParameters, ...args};

    const {name, id, onClick} = args;

    this.name = name;
    this.id = id;
    this.onClick = onClick;

}

User.prototype.getElement = function() {
    const element = createElementFromHTML([
        `<div class="user" data-id="${this.id}">`,
        `<span>${this.name}</span>`,
        '</div>'
    ].join(''));
    element.addEventListener('click', this.onClick);
    return element;
};