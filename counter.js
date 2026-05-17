export function initCounter({
    selector = "#counter",
    sectionSelector = ".about-highlight",
    target = 39,
    threshold = 0.5,
    duration = 1500
} = {}) {

    const counter = document.querySelector(selector);
    const section = document.querySelector(sectionSelector);

    if (!counter || !section) return;

    let started = false;

    function animateCounter() {
        let current = 0;
        const step = target / (duration / 16);

        function update() {
            current += step;

            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        update();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting && !started) {
                started = true;
                animateCounter();
            }

        });
    }, { threshold });

    observer.observe(section);
}