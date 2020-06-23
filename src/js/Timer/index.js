module.exports = Timer;

function Timer(args) {

    const defaultParameters = {
        element: null,
        onStart: () => {
        },
        onUpdate: () => {
        },
        onPause: () => {
        }
    };
    args = {...defaultParameters, ...args};

    const {element, onStart, onUpdate, onPause} = args;

    if (!element) {
        throw new Error('Element expected for element parameter');
    }

    this.onStart = onStart;
    this.onUpdate = onUpdate;
    this.onPause = onPause;

    this.element = element;

    this.paused = false;
}

Timer.prototype.pause = function () {
    const that = this;

    this.element.classList.add('pause');
    this.element.classList.remove('play');

    this.element.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        that.play();
        return false;
    }, false);

    this.onPause();
};

Timer.prototype.play = function () {

    const that = this;

    console.log({that});

    this.element.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        that.paused = true;
        return false;
    }, false);

    this.element.classList.add('play');
    this.element.classList.remove('pause');

    const components = this.element.querySelectorAll('.hand');
    for (
        let cursor = 0, cursorMax = components.length;
        cursor < cursorMax;
        cursor++
    ) {
        const component = components[cursor];
        component.classList.remove('hand');
        setTimeout(function () {
            component.classList.add('hand');
        }, 0);
    }

    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    const face = this.element.querySelector('.face-content');

    this.startDate = new Date();

    this.onStart();

    _onStart();

    function _onStart() {

        const now = new Date();
        const elapsed = now - that.startDate;
        let parts = [];

        parts[0] = '' + (Math.floor(elapsed / oneHour));
        parts[1] = '' + (Math.floor((elapsed % oneHour) / oneMinute));
        parts[2] = '' + (Math.floor(((elapsed % oneHour) % oneMinute) / oneSecond));

        parts[0] = (1 === parts[0].length) ? '0' + parts[0] : parts[0];
        parts[1] = (1 === parts[1].length) ? '0' + parts[1] : parts[1];
        parts[2] = (1 === parts[2].length) ? '0' + parts[2] : parts[2];

        setTimeout(function() {
            face.innerText = parts.join(':');
        }, 0);

        that.update();

        const handle = safeRequestAnimationFrame(_onStart);
        if (true === that.paused) {
            safeCancelAnimationFrame(handle);
            that.pause();
        }
    }
};

Timer.prototype.update = function () {
    this.onUpdate();
};
