module.exports = Groups;

const Group = require('../Group');

function Groups (args) {

    const groupsInstance = this;

    let defaultParameters = {
        element: null,
        groups: [],
        addButton: 'Ajouter',
        onAdd: () => {}
    };
    args = {...defaultParameters, ...args};

    const {groups, element, addButton, onAdd} = args;

    if (undefined === groups || null === groups) {
        throw new Error("Array expected for groups parameters, null/undefined got instead.");
    }

    if (undefined === element || null === element) {
        throw new Error("Element expected for element parameters, null/undefined got instead.");
    }

    this.groups = groups;
    this.element = element;

    const addButtonGroup = new Group({
        name: addButton,
        onClick: onAdd
    });

    this.addGroup(addButtonGroup);

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
    const groupElement = group.getElement();
    if (this.element && groupElement) this.element.appendChild(groupElement);
};


Groups.prototype.getElement = function() {
    return this.element;
};