
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

frame.addEventListener('mousemove', (e) => {
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
    console.log(parallaxMiddleX, parallaxMiddleY, finalMiddleX, finalMiddleY, initalMiddleX, initalMiddleY)
    middleLayer.style.transform = `translate(${finalMiddleX}px, ${finalMiddleY}px)`;
})

frame.addEventListener('mouseout', (e) => {
    frontLayer.style.transform = `translate(0px, 0px)`;
    // middleLayer.style.transform = `translate(40%, 37%)`;
    middleLayer.style.transform = `translate(${initalMiddleX}px, ${initalMiddleY}px)`;
    backgroundLayer.style.transform = `translate(0px, 0px)`;
})