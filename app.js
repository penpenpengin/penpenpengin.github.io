
let container = document.querySelector('.container');
let images = [...document.querySelectorAll('.img')];
let h0 = container.attributes.getNamedItem('height');

let vals = new Array(images.length).fill(0).map(_ => Math.round(Math.random()));
vals[0] = 0;
images.forEach((image, idx) => {
    if(idx >= 1 && vals[idx - 1] == 1) { vals[idx] = 0; }
    image.style.backgroundImage = `url(saker-${vals[idx]}.png)`;
});

function addPanel() {
    let panel = document.createElement('div');
    panel.classList.add('img');
    
    if (vals[vals.length - 1] == 1) { vals.push(0); }
    else { vals.push(Math.round(Math.random())); }
    panel.style.backgroundImage = `url(saker-${vals[vals.length - 1]}.png)`;
    
    container.appendChild(panel);
}

function scrollUpdate() {
    scrollPos = window.scrollY + window.innerHeight;
    if (scrollPos > document.body.offsetHeight) {
        addPanel();
    }
    
    requestAnimationFrame(scrollUpdate);
}

function onLoad() {
    scrollUpdate();
}

onLoad();