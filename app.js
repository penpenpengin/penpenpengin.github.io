
let container = document.querySelector('.container');
let images = [...document.querySelectorAll('.img')];
let thunder = document.getElementById('thunder');
thunder.volume = 0.4;

let vals = new Array(images.length).fill(0);
vals[8] = 1;
images.forEach((image, _) => {
    image.style.backgroundImage = `url(media/saker-0.png)`;
});
images[8].style.backgroundImage = `url(media/saker-1.png)`;

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
    let img_idx = Math.round(window.scrollY/img_height + 1);
    if(vals[img_idx] == 1) {
        thunder.play();
    }

    requestAnimationFrame(scrollUpdate);
}

scrollUpdate();