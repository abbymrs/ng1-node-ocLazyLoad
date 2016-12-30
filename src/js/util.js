function popInfo(msg, time) {

    let span = document.createElement('span');
    span.classList.add('msg', 'fix-center');
    span.innerHTML = msg;
    document.body.appendChild(span);

    setTimeout(() => {
        document.querySelector('.msg').remove();
    }, time)
}
function generateMask() {
    let mask = document.createElement('div');

    let w = window.innerWidth;
    let h = window.innerHeight;
    mask.classList.add('mask');
    mask.style.width = w + 'px';
    mask.style.height = h + 'px';

    document.body.appendChild(mask);
}
angular.module('utilApp', [])
    .factory('util', function () {
        return {
            popInfo: popInfo,
            generateMask: generateMask
        }
    })