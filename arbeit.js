export function initArbeit() {
    const container = document.querySelector(".unserearbeit");
    const cards = Array.from(container.querySelectorAll(".arbeit"));
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");

    let visibleCount = 0;

    function calculateVisibleCount() {
        const containerWidth = container.clientWidth;

        const card = cards[0];
        if (!card) return 0;

        const cardWidth = card.getBoundingClientRect().width;

        const gap = 16; // entspricht deinem grid gap (ca. 1rem)

        const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));

        return Math.max(cardsPerRow * 2, cardsPerRow);
    }

    function updateView() {
        cards.forEach((card, index) => {
            card.style.display = index < visibleCount ? "" : "none";
        });

        loadMoreBtn.style.display = visibleCount >= cards.length ? "none" : "inline-block";
        showLessBtn.style.display = visibleCount > calculateVisibleCount() ? "inline-block" : "none";
    }

    loadMoreBtn.addEventListener("click", () => {
        const step = calculateVisibleCount(); // immer 2 Reihen
        visibleCount = Math.min(visibleCount + step, cards.length);
        updateView();
    });

    showLessBtn.addEventListener("click", () => {
        visibleCount = calculateVisibleCount();
        updateView();
    });

    window.addEventListener("resize", () => {
        visibleCount = calculateVisibleCount();
        updateView();
    });

    // init
    visibleCount = calculateVisibleCount();
    updateView();
}
