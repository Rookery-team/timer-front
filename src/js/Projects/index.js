module.exports = Projects;

const Project = require('../Project');

function Projects (args) {

    const projectsInstance = this;

    let defaultParameters = {
        element: null,
        projects: [],
        addButton: 'Ajouter',
        onAdd: () => {}
    };
    args = {...defaultParameters, ...args};

    const {projects, element, addButton, onAdd} = args;

    if (undefined === projects || null === projects) {
        throw new Error("Array expected for projects parameters, null/undefined got instead.");
    }

    if (undefined === element || null === element) {
        throw new Error("Element expected for element parameters, null/undefined got instead.");
    }

    this.projects = projects;
    this.element = element;

    const addButtonGroup = new Project({
        name: addButton,
        onClick: onAdd
    });

    this.addProject(addButtonGroup);

    for (
        let cursor = 0, cursorMax = projects.length;
        cursor < cursorMax;
        cursor++
    ) {
        const project = new Project(projects[cursor]);
        this.addProject(project);
    }

}

Projects.prototype.addProject = function(project) {
    const projectElement = project.getElement();
    if (this.element && projectElement) this.element.appendChild(projectElement);
};


Projects.prototype.getElement = function() {
    return this.element;
};