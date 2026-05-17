document.addEventListener("DOMContentLoaded", () => {

    const allItems = Array.from(document.querySelectorAll(".unserearbeit .arbeit"));
    const button = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filters = document.querySelectorAll('input[name="filter"]');

    let activeFilter = "all";
    let page = 1;

    function getFilteredItems() {
        if (activeFilter === "all") return allItems;
        return allItems.filter(item => item.classList.contains(activeFilter));
    }

    function getItemsPerPage() {
        const grid = document.querySelector(".unserearbeit");

        const firstItem = grid.querySelector(".arbeit");
        if (!firstItem) return 6;

        const gridStyle = window.getComputedStyle(grid);
        const columns = gridStyle.gridTemplateColumns.split(" ").length;

        // 👉 immer 2 Reihen
        return columns * 2;
    }

    function updateDisplay() {
        const filtered = getFilteredItems();
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        // 👉 nur gefilterte Items anzeigen
        filtered.forEach((item, index) => {
            item.style.display = index < maxVisible ? "" : "none";
        });

        // 👉 alle anderen (nicht im Filter) sicher verstecken
        allItems.forEach(item => {
            if (!filtered.includes(item)) {
                item.style.display = "none";
            }
        });

        // BUTTON LOGIK
        button.style.display =
            maxVisible >= filtered.length ? "none" : "inline-block";

        showLessBtn.style.display =
            page > 1 ? "inline-block" : "none";
    }

    // LOAD MORE
    button.addEventListener("click", () => {
        page++;
        updateDisplay();
    });

    // SHOW LESS
    showLessBtn.addEventListener("click", () => {
        page = 1;
        updateDisplay();

        document.querySelector("#unserearbeit")
            .scrollIntoView({ behavior: "smooth" });
    });

    // FILTER CHANGE
    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            activeFilter = filter.id;
            page = 1;
            updateDisplay();
        });
    });

    // RESIZE → neu berechnen (wichtig für responsive Grid)
    window.addEventListener("resize", () => {
        updateDisplay();
    });

    // INIT
    updateDisplay();
});
