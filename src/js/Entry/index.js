module.exports = Group;

const createElementFromHTML = require('../utils/_createElementFromHTML');

function Entry (args) {

    let defaultParameters = {
        date: '01-01-1970',
        time: '42',
        onClick: () => {}
    };
    args = {...defaultParameters, ...args};

    const {date, time, onClick} = args;

    this.date = date;
    this.time = time;
    this.onClick = onClick;

}

Group.prototype.getElement = function() {
    const element = createElementFromHTML([
        `<div class="entry">`,
        `<span>${this.date}</span>`,
        `<span>${this.time}</span>`,
        '</div>'
    ].join(''));
    element.addEventListener('click', this.onClick);
    return element;
};