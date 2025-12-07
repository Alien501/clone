
const frame = document.querySelector('.frame');
const backgroundLayer = document.querySelector('.bg-image');
const middleLayer = document.querySelector('.main-img');
const frontLayer = document.querySelector('.particles');


// front layer = opposite of mouse direction
// Middle layer opposite of front layer
// bg layer = same as of front layer, in slow speed to that of front layer
let initalMiddleX = middleLayer.offsetWidth * .4;
let initalMiddleY = middleLayer.offsetHeight * .37;

const frontLayerSpeed = 80;
const middleLayerSpeed = frontLayerSpeed / 2;
const backgroundLayerSpeed = frontLayerSpeed / 3;

let centerX = window.innerWidth / 2, centerY = window.innerHeight / 2;

const updateCenter = () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
}

window.addEventListener('resize', updateCenter);

updateCenter();

// Prevent default touch behaviors to avoid scrolling/zooming issues
frame.addEventListener('touchstart', (e) => {
    e.preventDefault();
}, { passive: false });

frame.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

const activateCard = () => {
    const card = document.querySelector('.card');
    if(!card.classList.contains('active')) {
        card.classList.add('active');
    }
}

const deactivateCard = () => {
    const card = document.querySelector('.card');
    card.classList.remove('active');
}

const parralaxEffect = (e) => {
    const offsetX = centerX - e.clientX;
    const offsetY = centerY - e.clientY;

    const frontX = offsetX / frontLayerSpeed;
    const frontY = offsetY / frontLayerSpeed;
    frontLayer.style.transform = `translate(${frontX}px, ${frontY}px)`;

    const bgX = offsetX / backgroundLayerSpeed;
    const bgY = offsetY / backgroundLayerSpeed;
    backgroundLayer.style.transform = `translate(${bgX}px, ${bgY}px)`;

    const parallaxMiddleX = -(offsetX / middleLayerSpeed);
    const parallaxMiddleY = -(offsetY / middleLayerSpeed);

    const finalMiddleX = initalMiddleX + parallaxMiddleX;
    const finalMiddleY = initalMiddleY + parallaxMiddleY;
    
    middleLayer.style.transform = `translate(${finalMiddleX}px, ${finalMiddleY}px)`;
}

const resetToOgPosition = () => {
    frontLayer.style.transform = `translate(0px, 0px)`;
    middleLayer.style.transform = `translate(${initalMiddleX}px, ${initalMiddleY}px)`;
    backgroundLayer.style.transform = `translate(0px, 0px)`;
    deactivateCard();
}

frame.addEventListener('mousemove', parralaxEffect);
frame.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        activateCard();
        parralaxEffect(e.touches[0]);
    }
});

frame.addEventListener('mouseout', resetToOgPosition);
frame.addEventListener('touchend', resetToOgPosition);
frame.addEventListener('touchcancel', resetToOgPosition);