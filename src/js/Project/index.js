module.exports = Project;

const createElementFromHTML = require('../utils/_createElementFromHTML');

function Project (args) {

    let defaultParameters = {
        name: 'Nom du projet',
        id: -1,
        onClick: () => {}
    };
    args = {...defaultParameters, ...args};

    const {name, id, onClick} = args;

    this.name = name;
    this.id = id;
    this.onClick = onClick;

}

Project.prototype.getElement = function() {
    const element = createElementFromHTML([
        `<div class="project" data-id="${this.id}">`,
        `<span>${this.name}</span>`,
        '</div>'
    ].join(''));
    element.addEventListener('click', this.onClick);
    return element;
};