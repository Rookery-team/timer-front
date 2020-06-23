module.exports = View;

function View(args) {

    let defaultParameters = {
        name: 'error_404',
        url: '/404',
        callback: () => {}
    };
    args = {...defaultParameters, ...args};

    const {name, url, callback} = args;

    this.name = name;
    this.url = url;
    this.callback = callback;

}

View.prototype.display = function () {

    const viewInstance = this;

    const page = document.getElementById('page');

    if (undefined === page) {
        throw new Error("Page element doesn't exists. To fix that, create an element which his id is 'page'.");
    }

    const pagePath = '/pages/' + this.name + '.html';

    const result = fetch(pagePath).then(function (response) {
        if (!response.ok) {
            throw new Error("Error while displaying the view. Check if there is no issue with the file to display.");
        }
        return response.text();
    }).then(function (content) {
        setTimeout(function() {
            page.innerHTML = content;
            page.setAttribute('data-view', viewInstance.name);
        }, 0);
    }).then(function () {
        window.scrollTo(0, 0);
        let isAlreadyPathname = viewInstance.url === window.location.pathname;
        if (false === isAlreadyPathname) history.pushState({}, document.title, viewInstance.url);
    }).then(function() {
        viewInstance.callback();
    });

};
