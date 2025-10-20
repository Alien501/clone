gsap.registerPlugin(GSDevTools);

const loaderCircle = document.querySelector('.loader-circle');

const jumpingTimeLine = gsap.timeline({
    repeat: -1,
});

jumpingTimeLine.set(loaderCircle, {
    y: -20,
    scaleX: 1,
    scaleY: 1
})

jumpingTimeLine
// 1. Fall down with vertical stretch
.to(loaderCircle, {
    y: 20,
    scaleX: 0.85,
    scaleY: 1.15,
    ease: 'power2.in',
    duration: .35
})
// 2. Impact squash
.to(loaderCircle, {
    scaleX: 1.5,
    scaleY: 0.5,
    duration: .08,
    ease: 'power3.out'
})
// 3. Bounce back with slight overshoot
.to(loaderCircle, {
    scaleX: .9,
    scaleY: .9,
    duration: .08,
    ease: 'power2.inOut'
})
// 4. Rise up with horizontal stretch
.to(loaderCircle, {
    y: -20,
    scaleX: 0.85,
    scaleY: 1.15,
    ease: 'power2.out',
    duration: .35
})
// 5. Peak stretch
.to(loaderCircle, {
    scaleX: 1,
    scaleY: 1,
    duration: .1,
    ease: 'power1.inOut'
})

GSDevTools.create({})