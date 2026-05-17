export function initArbeit() {
    const cards = Array.from(document.querySelectorAll(".unserearbeit .arbeit"));
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");

    const LIMIT = 6;
    let expanded = false;

    function applyLimit() {
        cards.forEach((card, index) => {
            card.style.display = (!expanded && index >= LIMIT) ? "none" : "flex";
        });

        loadMoreBtn.style.display = expanded ? "none" : "inline-block";
        showLessBtn.style.display = expanded ? "inline-block" : "none";
    }

    loadMoreBtn.addEventListener("click", () => {
        expanded = true;
        applyLimit();
    });

    showLessBtn.addEventListener("click", () => {
        expanded = false;
        applyLimit();
    });

    applyLimit();
}
