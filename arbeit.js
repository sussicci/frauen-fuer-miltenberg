export function initArbeit() {

    const grid = document.querySelector(".unserearbeit");
    if (!grid) return;

    const allItems = Array.from(grid.querySelectorAll(".arbeit"));
    const button = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filters = document.querySelectorAll('input[name="filter"]');

    let activeFilter = "all";
    let page = 1;

    function getFilteredItems() {
        return activeFilter === "all"
            ? allItems
            : allItems.filter(item => item.classList.contains(activeFilter));
    }

    function getItemsPerPage() {
        const style = window.getComputedStyle(grid);
        const columns = style.gridTemplateColumns.split(" ").length || 2;
        return columns * 2;
    }

    function updateDisplay() {

        const filtered = getFilteredItems();
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        // DEBUG (optional, kannst du später löschen)
        // console.log({ page, perPage, maxVisible, filtered: filtered.length });

        // nur gefilterte steuern
        filtered.forEach((item, index) => {
            item.style.display = index < maxVisible ? "flex" : "none";
        });

        // alles andere IMMER verstecken
        allItems.forEach(item => {
            if (!filtered.includes(item)) {
                item.style.display = "none";
            }
        });

        // Buttons sicher behandeln
        if (button) {
            button.style.display =
                maxVisible >= filtered.length ? "none" : "inline-block";
        }

        if (showLessBtn) {
            showLessBtn.style.display =
                page > 1 ? "inline-block" : "none";
        }
    }

    // LOAD MORE
    button?.addEventListener("click", () => {
        page++;
        updateDisplay();
    });

    // SHOW LESS
    showLessBtn?.addEventListener("click", () => {
        page = 1;
        updateDisplay();
        grid.scrollIntoView({ behavior: "smooth" });
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
    window.addEventListener("resize", updateDisplay);

    // INIT WICHTIG!
    updateDisplay();
}export function initArbeit() {

    const grid = document.querySelector(".unserearbeit");
    if (!grid) return;

    const allItems = Array.from(grid.querySelectorAll(".arbeit"));
    const button = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filters = document.querySelectorAll('input[name="filter"]');

    let activeFilter = "all";
    let page = 1;

    function getFilteredItems() {
        return activeFilter === "all"
            ? allItems
            : allItems.filter(item => item.classList.contains(activeFilter));
    }

    function getItemsPerPage() {
        const style = window.getComputedStyle(grid);
        return style.gridTemplateColumns.split(" ").length * 2;
    }

    function updateDisplay() {
        const filtered = getFilteredItems();
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        filtered.forEach((item, i) => {
            item.style.display = i < maxVisible ? "flex" : "none";
        });

        button && (button.style.display =
            maxVisible >= filtered.length ? "none" : "inline-block");

        showLessBtn && (showLessBtn.style.display =
            page > 1 ? "inline-block" : "none");
    }

    button?.addEventListener("click", () => {
        page++;
        updateDisplay();
    });

    showLessBtn?.addEventListener("click", () => {
        page = 1;
        updateDisplay();
        grid.scrollIntoView({ behavior: "smooth" });
    });

    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            activeFilter = filter.id;
            page = 1;
            updateDisplay();
        });
    });

    window.addEventListener("resize", updateDisplay);

    updateDisplay();
}
