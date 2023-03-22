const main = document.querySelector('#canvass');

function grid (x = 16) {

    if( x > 100){
        alert(`Computer can't process more than 100x100 pixels`);
    } else {
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
}

function removePixel(canvass) {
    while (canvass.firstChild) {
        canvass.removeChild(canvass.firstChild);
    }
}

const button = document.querySelector('button');
button.addEventListener('click', () => {
    let number = prompt('How many square per side? Max - 100');
    if(number == null || number == ""){
        alert("You canceled");
    } else {
        removePixel(main);
        grid(number);
    }
});

grid();