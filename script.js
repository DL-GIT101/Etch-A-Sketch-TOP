const main = document.querySelector('#canvass');

function grid (x = 16) {

    for(let i = 1; i <= x; i++){
        const row = document.createElement('div');
        row.classList.add('row')
        main.appendChild(row);

        for(let j = 1; j <= x; j++) {
            const pixel = document.createElement('div');
            pixel.addEventListener('mouseover', () =>  {
                pixel.style.backgroundColor = 'black';
            });
            pixel.classList.add('pixel');
            row.appendChild(pixel);
        }
    }
}

const button = document.querySelector('button');
button.addEventListener('click', () => {
    let number = prompt('How many square per side?');
    grid(number);
});

grid();