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

function removePixel(canvass) {
    while (canvass.firstChild) {
        canvass.removeChild(canvass.firstChild);
    }
}

const button = document.querySelector('#perSide');
button.addEventListener('click', () => {
    let number = prompt('How many square per side? Max - 100');
    number = Number(number);
    console.log(number);
    if(number == 0 || number == "" || isNaN(number)){
        alert("Canceled");
    } else if (number > 100){
        alert(`Computer can't process more than 100x100 pixels`);
    } else {
        removePixel(main);
        grid(number);
    }
});

grid();

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');

        for(let i = 0; i< pixel.length; i++){
            pixel[i].addEventListener('mouseover',() => {
                pixel[i].style.backgroundColor = 'white';
            });
        }
});