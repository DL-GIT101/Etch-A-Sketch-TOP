const canvass = document.querySelector('#canvass');
canvass.addEventListener('mouseleave', mouseUp);
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
            pixel.addEventListener('mousedown',makeInk);
            pixel.addEventListener('mouseover',makeInk);
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
            pixel.addEventListener('mousedown',makeInk);
            pixel.addEventListener('mouseover',makeInk);
            pixel.addEventListener('click',makeInkClick);
        }
});

const eraserBTN = document.querySelector('#eraser');
eraserBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousedown',eraser);
            pixel.addEventListener('mouseover',eraser);
            pixel.addEventListener('click',eraserClick);
        }
});

const rainbowBTN = document.querySelector('#rainbow');
rainbowBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousedown',rainbow);
            pixel.addEventListener('mouseover',rainbow);
            pixel.addEventListener('click',rainbowClick);
        }
});

const darkerBTN = document.querySelector('#darker');
darkerBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousedown',darker);
            pixel.addEventListener('mouseover',darker);
            pixel.addEventListener('click', darkerClick);
        }
});

const lighterBTN = document.querySelector('#lighter');
lighterBTN.addEventListener('click', () => {
    let pixels = document.getElementsByClassName('pixel');
        for(let pixel of pixels){
            removeEvent(pixel);
            pixel.addEventListener('mousedown',lighter);
            pixel.addEventListener('mouseover',lighter);
            pixel.addEventListener('click', lighterClick);
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

function rainbow(e){
    if(isDown == true){
        let h = Math.floor(Math.random() * 360);
        let s = Math.floor(Math.random() * (100 - 30)) + 30;
        let l = Math.floor(Math.random() * (90 - 30)) + 30;
        e.target.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
        }
};

function rainbowClick(e){
        let h = Math.floor(Math.random() * 360);
        let s = Math.floor(Math.random() * (100 - 30)) + 30;
        let l = Math.floor(Math.random() * (90 - 30)) + 30;
        e.target.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
};

function darker(e){
    if(isDown == true){
    let bg = e.target.style.backgroundColor;
        bg = RGBToHSL(bg,"dark");
    e.target.style.backgroundColor = bg;
    }
};

function darkerClick(e){
    let bg = e.target.style.backgroundColor;
        bg = RGBToHSL(bg,"dark");
    e.target.style.backgroundColor = bg;
};

function lighter(e){
    if(isDown == true){
    let bg = e.target.style.backgroundColor;
        bg = RGBToHSL(bg,"light");
    e.target.style.backgroundColor = bg;
    }
};

function lighterClick(e){
    let bg = e.target.style.backgroundColor;
        bg = RGBToHSL(bg,"light");
    e.target.style.backgroundColor = bg;
};

function removeEvent(pixel){
    pixel.removeEventListener('mousedown',makeInk);
    pixel.removeEventListener('mouseover',makeInk);
    pixel.removeEventListener('click',makeInkClick);

    pixel.removeEventListener('mousedown',eraser);
    pixel.removeEventListener('mouseover',eraser);
    pixel.removeEventListener('click',eraserClick);

    pixel.removeEventListener('mousedown',rainbow);
    pixel.removeEventListener('mouseover',rainbow);
    pixel.removeEventListener('click',rainbowClick);

    pixel.removeEventListener('mousedown',darker);
    pixel.removeEventListener('mouseover',darker);
    pixel.removeEventListener('click', darkerClick);

    pixel.removeEventListener('mousedown',lighter);
    pixel.removeEventListener('mouseover',lighter);
    pixel.removeEventListener('click', lighterClick);
};

function RGBToHSL(rgb,lightness) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }
  
    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
  
     // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);

    if(lightness == "dark"){
        l -= .1;
    }else if(lightness == "light") {
        l += .1;
    }

    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }