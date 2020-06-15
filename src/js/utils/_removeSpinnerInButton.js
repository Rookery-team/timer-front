module.exports = removeSpinnerInButton;

function removeSpinnerInButton(button) {
    button.innerHTML = button.getAttribute('data-original-value');
    button.removeAttribute('data-original-value');
}