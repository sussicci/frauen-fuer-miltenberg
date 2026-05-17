document.addEventListener("DOMContentLoaded", () => {

    const allItems = Array.from(document.querySelectorAll(".arbeit"));
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
        const columnCount = gridStyle.gridTemplateColumns.split(" ").length;

        return columnCount * 2;
    }

    function updateDisplay() {
        const filtered = getFilteredItems();
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        filtered.forEach((item, index) => {
            item.style.display = index < maxVisible ? "" : "none";
        });

        allItems.forEach(item => {
            if (!filtered.includes(item)) {
                item.style.display = "none";
            }
        });

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

        // RESIZE
    window.addEventListener("resize", () => {
        updateDisplay();
    });

    // INIT
    updateDisplay();
        });


