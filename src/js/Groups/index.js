module.exports = Groups;

const Group = require('../Group');

function Groups (args) {

    let defaultParameters = {
        element: null,
        groups: []
    };
    args = {...defaultParameters, ...args};

    const {groups, element} = args;

    if (undefined === groups || null === groups) {
        throw new Error("Array expected for groups parameters, null/undefined got instead.");
    }

    if (undefined === element || null === element) {
        throw new Error("Element expected for groups parameters, null/undefined got instead.");
    }

    this.groups = groups;
    this.element = element;

    for (
        let cursor = 0, cursorMax = groups.length;
        cursor < cursorMax;
        cursor++
    ) {
        const group = new Group(groups[cursor]);
        this.addGroup(group);
    }

}

Groups.prototype.addGroup = function(group) {
    console.log({group});
};