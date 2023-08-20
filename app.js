let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');

let clonesHeight;
let sliderHeight;
let clones = [];
let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, index) => {
    image.style.backgroundImage = `url(saker.png)`;
});

items.forEach((item) => {
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
});

function getClonesHeight() {
    let height = 0;
    clones.forEach((clone) => {
        height += clone.offsetHeight;
    });
    return height;
}

function getScrollPos() {
    return window.scrollY;
}

function setScrollPos(pos) {
    window.scrollTo({top: pos});
}

function scrollUpdate() {
    scrollPos = getScrollPos();
    if (clonesHeight + scrollPos >= sliderHeight) {
        setScrollPos(1);
    } else if (scrollPos <= 0) {
        setScrollPos(sliderHeight - clonesHeight - 1);
    }

    slider.style.transform = `translateY(${-scrollPos}px)`;
    requestAnimationFrame(scrollUpdate);
}

function onLoad() {
    calculateDimensions();
    document.body.style.height = `${sliderHeight}px`;
    setScrollPos(1);
    scrollUpdate();
}

function calculateDimensions() {
    sliderHeight = slider.getBoundingClientRect().width;
    clonesHeight = getClonesHeight();
}

onLoad();