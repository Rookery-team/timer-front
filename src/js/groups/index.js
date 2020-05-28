import {GRID_TYPE_GROUPS_JOINED, GRID_TYPE_MY_GROUPS} from "../config/groups";

export function GroupsGrid(options = {}) {

    if (!options || {} === options) {
        throw new Error('GroupsGrid function needs almost the element and type parameters.')
    }

    let element = options.element;
    if (!element) {
        throw new Error('Element parameter is needed to use the GroupsGrid function.');
    }

    let type = options.type;
    if (type) {
        let firstButtonOfGrid;
        switch (type) {
            case GRID_TYPE_MY_GROUPS:
                firstButtonOfGrid = generateCreateGroupElement();
                break;
            case GRID_TYPE_GROUPS_JOINED:
                firstButtonOfGrid = generateJoinGroupElement();
                break;
            default:
                break;
        }
        if (firstButtonOfGrid) addToElement(firstButtonOfGrid);
    }

    function addToElement(_element) {
        element.appendChild(_element);
    }
}

function generateCreateGroupElement(options = {}) {
    return _createElementFromHTML([
        '<div class="group" onclick="(function(element){createGroup(element)})(this)">',
        '<span>Créer un groupe</span>',
        '</div>'
    ].join(''));
}

function generateJoinGroupElement(options = {}) {
    return _createElementFromHTML([
        '<div class="join-group group" onclick="(function(element){joinGroup(element)})(this)">',
        '<span>Rejoindre un groupe</span>',
        '</div>'
    ].join(''));
}

function generateGroupElement(options = {}) {

    const name = options.name || '';

    return _createElementFromHTML([
        '<div class="group" onclick="(function(element){viewGroup(element)})(this)">',
        `<span>${name}</span>`,
        '</div>'
    ].join(''));
}

function _createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

window.createGroup = function (element) {
    const grid = element.closest('.groups-grid');
    const group = generateGroupElement({
        name: 'New group'
    });
    if ( 1 < grid.children.length ) {
        grid.insertBefore(group, grid.children[1]);
        return true;
    }
    grid.appendChild(group);
    return true;
};

window.joinGroup = function (element) {
    const grid = element.closest('.groups-grid');
    const group = generateGroupElement({
        name: 'Group'
    });
    if ( 1 < grid.children.length ) {
        grid.insertBefore(group, grid.children[1]);
        return true;
    }
    grid.appendChild(group);
    return true;
};
window.viewGroup = function (element) {
    return true;
};