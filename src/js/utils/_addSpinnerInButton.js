module.exports = addSpinnerInButton;

function addSpinnerInButton(button) {
    const originalValue = button.innerHTML;
    button.setAttribute('data-original-value', originalValue);
    button.innerHTML = [
        '<div class="spinner-border text-light" role="status">',
        '<span class="sr-only">Loading...</span>',
        '</div>'
    ].join('');
}