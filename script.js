document.addEventListener("DOMContentLoaded", () => {

    /* =========================
    HAMBURGER MENU
    ========================= */

    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const navLinks = document.querySelectorAll(".nav1");

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        mobileNav.classList.toggle("active");

    });

    /* Menü schließen bei Klick */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            mobileNav.classList.remove("active");

        });

    });
    
    /* =========================
    COUNTER ANIMATION
    ========================= */

    const counter = document.getElementById("counter");
    const highlightSection = document.querySelector(".about-highlight");

    let counterStarted = false;

    function animateCounter(target, duration = 1500) {

        let start = 0;
        const step = target / (duration / 16);

        function update() {

            start += step;

            if (start < target) {
                counter.textContent = Math.floor(start);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        update();
    }

    /* Trigger nur wenn sichtbar */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;
                animateCounter(50);
            }
        });

    }, {
        threshold: 0.5
    });

    observer.observe(highlightSection);

    /*========================= 
        UNSERE ARBEIT
    =========================
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

    function sortItems(items) {

    const priority = {
        fertig: 0,
        aktiv: 1,
        gesucht: 2
    };

    return [...items].sort((a, b) => {

        let aRank = 99;
        let bRank = 99;

        for (const status in priority) {
            if (a.classList.contains(status)) {
                aRank = priority[status];
            }

            if (b.classList.contains(status)) {
                bRank = priority[status];
            }
        }

        return aRank - bRank;
    });
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

    let filtered = getFilteredItems();
    filtered = sortItems(filtered);

    const grid = document.querySelector(".unserearbeit");

    filtered.forEach(item => {
        grid.appendChild(item);
    });

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

    button.style.display =
        maxVisible >= filtered.length
            ? "none"
            : "inline-block";

    showLessBtn.style.display =
        page > 1
            ? "inline-block"
            : "none";
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

    
    /*=========================
    MODAL
    =========================*/

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalImage = document.getElementById("modalImage");

    const openButtons = document.querySelectorAll(".open-modal");
    const closeModal = document.getElementById("closeModal");


    openButtons.forEach(button => {

        button.addEventListener("click", (e) => {

            e.preventDefault();

            const card = button.closest(".arbeit");
            const image = card.querySelector("img");

            modalTitle.textContent = button.dataset.title;
            modalText.textContent = button.dataset.text;

            modalImage.src = image.src;

            modal.classList.add("active");
        });

    });

    /* schließen */

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    /* klick außerhalb */

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.classList.remove("active");
        }

    });

    /* ESC */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {
            modal.classList.remove("active");
        }

    });

/*========================= 
        FRAUEN SLIDER 
=========================*/ 
    
    const slider = document.querySelector(".frauen-slider"); 
    const slides = document.querySelectorAll(".frau"); 
    const next = document.querySelector(".slider-btn.right"); 
    const prev = document.querySelector(".slider-btn.left"); 
    
    let index = 0; 
    const total = slides.length; 
    function updateSlider() {
    if (!slider) return;
    slider.style.transform = `translateX(-${index * 100}%)`;
}
    
    // NEXT 
    
    function nextSlide() { 
        index = (index + 1) % total; 
        updateSlider(); 
    } 
    
    // PREV 
    
    function prevSlide() { 
        index = (index - 1 + total) % total; 
        updateSlider(); 
    } 
    
    next.addEventListener("click", () => { 
        nextSlide(); 
        resetAuto(); 
    }); 
    
    prev.addEventListener("click", () => { 
        prevSlide(); 
        resetAuto(); 
    }); 
    
    // AUTO SLIDE 
    
    let interval = setInterval(nextSlide, 5000); 
    
    // PAUSE ON HOVER 
    
    slider.addEventListener("mouseenter", () => { 
        clearInterval(interval); 
    }); 
    
    slider.addEventListener("mouseleave", () => { 
        interval = setInterval(nextSlide, 3000); 
    }); 
    
    // reset helper 
    
    function resetAuto() { 
        clearInterval(interval); 
        interval = setInterval(nextSlide, 3000);
    }
}); 
