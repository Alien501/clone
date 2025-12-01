
const timeForOneRevolution = 60;
const lineLength = 120;

const mainAxisLine = document.querySelector('.main-line');
const sideChickLine = document.querySelector('.side-chick');
const endPoint = document.querySelector('.end-point');

const mainAxisTimeline = gsap.timeline();
const sidechickTimeline = gsap.timeline();

const pathCanvas = document.getElementById('pathCanvas');
pathCanvas.width = window.innerWidth;
pathCanvas.height = window.innerHeight;

const pathCanvasContext = pathCanvas.getContext('2d');

pathCanvasContext.strokeStyle = '#20e7b7';
pathCanvasContext.lineWidth = 1;
pathCanvasContext.beginPath();

let isTracing = false;
setTimeout(() => {
    isTracing = true;
}, 100);

const tracePathCanvas = () => {
    const rect = endPoint.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (isTracing) {
        pathCanvasContext.lineTo(x, y);
        pathCanvasContext.stroke();
    }
    
    pathCanvasContext.beginPath();
    pathCanvasContext.moveTo(x, y);
}

const rect = endPoint.getBoundingClientRect();
pathCanvasContext.moveTo(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
);

mainAxisTimeline.fromTo(
    mainAxisLine,
    {
        rotation: 0
    },
    {
        rotation: 360,
        repeat: -1,
        duration: timeForOneRevolution,
        ease: 'linear',
        onUpdate: tracePathCanvas
    }
)

sidechickTimeline.fromTo(
    sideChickLine,
    {
        rotation: 0
    },
    {
        rotation: 360,
        repeat: -1,
        duration: timeForOneRevolution/Math.PI,
        ease: 'linear',
    }
)
