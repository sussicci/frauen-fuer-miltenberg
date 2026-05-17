export function initArbeit() {
    const grid = document.querySelector(".unserearbeit");
    const allItems = Array.from(document.querySelectorAll(".unserearbeit .arbeit"));
    const button = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");

    if (!grid || !button || !showLessBtn) return;

    let page = 1;

    function getItemsPerPage() {
        const gridStyle = window.getComputedStyle(grid);
        const columnCount = gridStyle.gridTemplateColumns.split(" ").length;
        return columnCount * 2; // 2 Reihen
    }

    function updateDisplay() {
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        allItems.forEach((item, index) => {
            item.style.display = index < maxVisible ? "flex" : "none";
        });

        button.style.display = maxVisible >= allItems.length ? "none" : "inline-block";
        showLessBtn.style.display = page > 1 ? "inline-block" : "none";
    }

    button.addEventListener("click", () => {
        page++;
        updateDisplay();
    });

    showLessBtn.addEventListener("click", () => {
        page = 1;
        updateDisplay();

        // wichtig: erst nach Layout-Update scrollen
        requestAnimationFrame(() => {
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    window.addEventListener("resize", updateDisplay);

    updateDisplay();
}
