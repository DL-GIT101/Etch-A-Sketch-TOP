const main = document.querySelector('#canvass');


function pixel () {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel')
    main.appendChild(pixel);
}

function grid (x = 16) {

    for(let i = 1; i <= x; i++){
        pixel();
        
    }
}

grid();