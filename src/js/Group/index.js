module.exports = Group;

const createElementFromHTML = require('../utils/_createElementFromHTML');

function Group (args) {

    let defaultParameters = {
        name: 'Nom de groupe',
        id: -1,
        onClick: () => {}
    };
    args = {...defaultParameters, ...args};

    const {name, id, onClick} = args;

    this.name = name;
    this.id = id;
    this.onClick = onClick;

}

Group.prototype.getElement = function() {
    const element = createElementFromHTML([
        `<div class="group" data-id="${this.id}">`,
        `<span>${this.name}</span>`,
        '</div>'
    ].join(''));
    element.addEventListener('click', this.onClick);
    return element;
};