const main = document.querySelector('#canvass');

function grid (x = 16) {

        for(let i = 1; i <= x; i++){
            const row = document.createElement('div');
            row.classList.add('row')
            main.appendChild(row);
    
            for(let j = 1; j <= x; j++) {
                const pixel = document.createElement('div');
                pixel.addEventListener('mouseover', () =>  {
                    pixel.style.backgroundColor = 'rgb(0,0,0)';
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
    
    if(number == 0 || isNaN(number)){
        alert("Canceled");
    } else if (number > 100){
        alert(`Computer can't process more than 100x100 pixels`);
    } else {
        removePixel(main);
        grid(number);
    }
});

grid();

const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');

        for(let i = 0; i< pixel.length; i++){
            pixel[i].addEventListener('mouseover',() => {
                pixel[i].style.backgroundColor = 'rgb(255,255,255)';
            });
        }
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');

        for(let i = 0; i< pixel.length; i++){
            pixel[i].addEventListener('mouseover',() => {

                let red = Math.floor(Math.random() * 255) + 1;
                let blue = Math.floor(Math.random() * 255) + 1;
                let green = Math.floor(Math.random() * 255) + 1;

             pixel[i].style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
            });
        }
});

const black = document.querySelector('#black');
black.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');

        for(let i = 0; i< pixel.length; i++){
            pixel[i].addEventListener('mouseover',() => {
                pixel[i].style.backgroundColor = 'rgb(0,0,0)';
            });
        }
});

const darker = document.querySelector('#darker');
darker.addEventListener('click', () => {
    const pixel = document.getElementsByClassName('pixel');

        for(let i = 0; i< pixel.length; i++){
            pixel[i].addEventListener('mouseover',() => {
                const rbgBGColor = pixel[i].style.backgroundColor;
                let hslBgcolor = RGBToHSL(rbgBGColor);
                let h = hslBgcolor[0],
                    s = hslBgcolor[1],
                    l = hslBgcolor[2]+10;
                console.log(rbgBGColor);
                console.log(hslBgcolor);
              let haha = pixel[i].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
              console.log(haha);
            });
        }
});


function RGBToHSL(rgb) {
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
    l = +(l * 100).toFixed(1);

    return [h, s, l];
  }

