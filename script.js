const canvass = document.querySelector('#canvass');
let isDown = false;
// append divs 
function grid (x = 16) {

    for(let i = 1; i <= x; i++){
        const row = document.createElement('div');
        row.classList.add('row');
        row.style.cssText = 'background-color:hsl(0,0%,100%);display:flex;flex-basis:720px;'
        canvass.appendChild(row);
    
        for(let j = 1; j <= x; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.cssText = 'background-color:hsl(0,0%,100%); flex-basis:720px; outline: 1px solid grey';
            pixel.addEventListener('mousedown', mouseDown);
            pixel.addEventListener('mouseup', mouseUp);
            pixel.addEventListener('mousemove',makeInk);
            pixel.addEventListener('click',makeInkClick);
            row.appendChild(pixel);
        }
    }
}

function mouseDown(){
    isDown = true;
}
function mouseUp(){
    isDown = false;
}

grid();
// remove divs
function removePixel() {
    while (canvass.firstChild) {
        canvass.removeChild(canvass.firstChild);
    }
}
// prompt for user to input pixels number
const askBTN = document.querySelector('#askPixels');
askBTN.addEventListener('click', () => {

    let number = prompt('How many square per side? Max - 100');
    number = Number(number);
    
        if(number == 0 || isNaN(number)){
            alert("Canceled");
        } else if (number > 100){
            alert(`Computer can't process more than 100x100 pixels`);
        } else {
            removePixel();
            grid(number);
        }
});

//button for black background color
const inkBTN = document.querySelector('#ink');
inkBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousemove',makeInk);
            pixel.addEventListener('click',makeInkClick);
        }
});

const eraserBTN = document.querySelector('#eraser');
eraserBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousemove',eraser);
            pixel.addEventListener('click',eraserClick);
        }
});

function makeInk(e){
    if(isDown == true){
    e.target.style.backgroundColor = "hsl(0,0%,0%)";
    }
};

function makeInkClick (e){
    e.target.style.backgroundColor = "hsl(0,0%,0%)";
};

function eraser(e){
    if(isDown == true){
        e.target.style.backgroundColor = "hsl(0,0%,100%)";
        }
};

function eraserClick (e){
    e.target.style.backgroundColor = "hsl(0,0%,100%)";
};

function removeEvent(pixel){
    pixel.removeEventListener('mousemove',makeInk);
    pixel.removeEventListener('click',makeInkClick);
    pixel.removeEventListener('mousemove',eraser);
    pixel.removeEventListener('click',eraserClick);
    console.log("removed");
};