
let container = document.querySelector('.container');
let images = [...document.querySelectorAll('.img')];

let thunder = document.getElementById('thunder');
thunder.volume = 0.5;

let vals = new Array(images.length).fill(0);
vals[8] = 1;
images.forEach((image, _) => {
    image.style.backgroundImage = `url(media/saker-0.png)`;
});
images[8].style.backgroundImage = `url(media/saker-1.png)`;

document.body.style.backgroundImage = 'url(media/rain.gif)'

function addPanel() {
    let panel = document.createElement('div');
    panel.classList.add('img');
    
    if (vals.slice(-10).includes(1)) { vals.push(0); }
    else { vals.push(Math.round(Math.random()*0.6)); }
    panel.style.backgroundImage = `url(media/saker-${vals[vals.length - 1]}.png)`;
    
    container.appendChild(panel);
}

function scrollUpdate() {
    scrollPos = window.scrollY + window.innerHeight;
    if (scrollPos > document.body.offsetHeight*0.95) {
        addPanel();
    }

    let img_height = images[0].scrollHeight;
    let img_idx = Math.round(window.scrollY/img_height + 0.5);
    if(vals[img_idx] == 1 || vals[img_idx - 1] == 1) {
        document.body.style.backgroundImage = 'url(media/lightning.gif)'
        thunder.play();
    } else {
        document.body.style.backgroundImage = 'url(media/rain.gif)';
    }

    requestAnimationFrame(scrollUpdate);
}

/* (yes, this was copy-pasted) */
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}

function load() {
    let playdiv = document.querySelector('.play');
    let play_img = document.querySelector('.play-img');
    playdiv.style.animation = 'fadeout-play 2s forwards';
    play_img.style.animation = 'fadeout-play-img 2s forwards'

    let rain = document.getElementById('rain');
    rain.volume = 0.5;
    rain.play();    

    enableScroll();
    scrollUpdate();
}

disableScroll();