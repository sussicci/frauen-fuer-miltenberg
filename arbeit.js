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
}document.addEventListener("DOMContentLoaded", () => {

    const allItems = Array.from(document.querySelectorAll(".arbeit"));
    const grid = document.querySelector(".unserearbeit");

    const button = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filters = document.querySelectorAll('input[name="filter"]');

    let activeFilter = "all";
    let page = 1;

    function getFilteredItems() {
        if (activeFilter === "all") return allItems;
        return allItems.filter(item =>
            item.classList.contains(activeFilter)
        );
    }

    function getItemsPerPage() {
        if (!grid) return 6;

        const style = window.getComputedStyle(grid);
        const cols = style.gridTemplateColumns;

        if (!cols || cols === "none") return 2;

        const columnCount = cols.split(" ").length;

        return columnCount * 2; // 2 Reihen
    }

    function updateDisplay() {

        const filtered = getFilteredItems();
        const perPage = getItemsPerPage();
        const maxVisible = page * perPage;

        filtered.forEach((item, index) => {
            item.style.display = index < maxVisible ? "flex" : "none";
        });

        allItems.forEach(item => {
            if (!filtered.includes(item)) {
                item.style.display = "none";
            }
        });

        if (button) {
            button.style.display =
                maxVisible >= filtered.length ? "none" : "inline-block";
        }

        if (showLessBtn) {
            showLessBtn.style.display =
                page > 1 ? "inline-block" : "none";
        }
    }

    /* LOAD MORE */
    if (button) {
        button.addEventListener("click", () => {
            page++;
            updateDisplay();
        });
    }

    /* SHOW LESS */
    if (showLessBtn) {
        showLessBtn.addEventListener("click", () => {
            page = 1;
            updateDisplay();

            document.querySelector("#unserearbeit")?.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    /* FILTER */
    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            activeFilter = filter.id;
            page = 1;
            updateDisplay();
        });
    });

    /* RESIZE */
    window.addEventListener("resize", updateDisplay);

    /* INIT */
    updateDisplay();
});export function initArbeit() {

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
