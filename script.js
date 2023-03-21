const main = document.querySelector('#canvass');

function grid (x = 16) {

    for(let i = 1; i <= x; i++){
        const row = document.createElement('div');
        row.classList.add('row')
        main.appendChild(row);

        for(let j = 1; j <= x; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')
            row.appendChild(pixel);
        }
    }
}

grid();