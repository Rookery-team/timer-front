module.exports = Users;

const User = require('../User');

function Users (args) {

    const usersInstance = this;

    let defaultParameters = {
        element: null,
        users: [],
        addButton: 'Ajouter',
        onAdd: () => {}
    };
    args = {...defaultParameters, ...args};

    const {users, element, addButton, onAdd} = args;

    console.log({users,element,addButton});

    if (undefined === users || null === users) {
        throw new Error("Array expected for users parameters, null/undefined got instead.");
    }

    if (undefined === element || null === element) {
        throw new Error("Element expected for element parameters, null/undefined got instead.");
    }

    this.users = users;
    this.element = element;

    const addUserGroup = new User({
        name: addButton,
        onClick: onAdd
    });

    this.addUser(addUserGroup);

    for (
        let cursor = 0, cursorMax = users.length;
        cursor < cursorMax;
        cursor++
    ) {
        const user = new User(users[cursor]);
        this.addUser(user);
    }

}

Users.prototype.addUser = function(user) {
    const userElement = user.getElement();
    if (this.element && userElement) this.element.appendChild(userElement);
};


Users.prototype.getElement = function() {
    return this.element;
};