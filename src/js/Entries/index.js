module.exports = Entries;

const Entry = require('../Entry');

function Entries (args) {

    const entriesInstance = this;

    let defaultParameters = {
        element: null,
        entries: [],
        onAdd: () => {}
    };
    args = {...defaultParameters, ...args};

    const {entries, element, addButton, onAdd} = args;

    if (undefined === entries || null === entries) {
        throw new Error("Array expected for entries parameters, null/undefined got instead.");
    }

    if (undefined === element || null === element) {
        throw new Error("Element expected for element parameters, null/undefined got instead.");
    }

    this.entries = entries;
    this.element = element;

    for (
        let cursor = 0, cursorMax = entries.length;
        cursor < cursorMax;
        cursor++
    ) {
        const entry = new Entry(groups[cursor]);
        this.addEntry(group);
    }

}

Entries.prototype.addEntry = function(group) {
    const entryElement = group.getElement();
    if (this.element && entryElement) this.element.appendChild(entryElement);
};


Entries.prototype.getElement = function() {
    return this.element;
};