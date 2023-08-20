let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');

let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, index) => {
    image.style.backgroundImage = `url(pengin.png)`;
});

items.forEach((item) => {
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
});

function getClonesWidth() {
    let width = 0;
    clones.forEach((clone) => {
        width += clone.offsetWidth;
    });
    return width;
}

function getScrollPos() {
    return window.scrollY;
}

function setScrollPos(pos) {
    window.scrollTo({top: pos});
}

function scrollUpdate() {
    scrollPos = getScrollPos();
    if (clonesWidth + scrollPos >= sliderWidth) {
        setScrollPos(1);
    } else if (scrollPos <= 0) {
        setScrollPos(sliderWidth - clonesWidth - 1);
    }

    slider.style.transform = `translateX(${-scrollPos}px)`;
    requestAnimationFrame(scrollUpdate);
}

function onLoad() {
    calculateDimensions();
    document.body.style.height = `${sliderWidth}px`;
    setScrollPos(1);
    scrollUpdate();
}

function calculateDimensions() {
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}

onLoad();