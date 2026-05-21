document.addEventListener("DOMContentLoaded", () => {

    const allItems = Array.from(document.querySelectorAll(".arbeit"));
const loadMoreBtn = document.getElementById("loadMoreBtn");
const showLessBtn = document.getElementById("showLessBtn");

const statusSelect = document.getElementById("statusFilterMobile");
const categorySelect = document.getElementById("categoryFilterMobile");

let page = 1;

function getItemsPerPage() {
    const grid = document.querySelector(".unserearbeit");

    const firstItem = grid.querySelector(".arbeit");
    if (!firstItem) return 6;

    const columns = window.getComputedStyle(grid)
        .gridTemplateColumns.split(" ").length;

    return columns * 2;
}

function matchesFilters(item) {
    const status = statusSelect.value;
    const category = categorySelect.value;

    const matchesStatus =
        status === "status-all" || item.classList.contains(status);

    const matchesCategory =
        category === "category-all" || item.classList.contains(category);

    return matchesStatus && matchesCategory;
}

function updateDisplay() {
    const perPage = getItemsPerPage();
    const filtered = allItems.filter(matchesFilters);

    const maxVisible = page * perPage;

    filtered.forEach((item, index) => {
        item.style.display = index < maxVisible ? "flex" : "none";
    });

    allItems.forEach(item => {
        if (!filtered.includes(item)) {
            item.style.display = "none";
        }
    });

    loadMoreBtn.style.display =
        maxVisible >= filtered.length ? "none" : "inline-block";

    showLessBtn.style.display =
        page > 1 ? "inline-block" : "none";
}

// FILTER EVENTS (Dropdown)
statusSelect?.addEventListener("change", () => {
    page = 1;
    updateDisplay();
});

categorySelect?.addEventListener("change", () => {
    page = 1;
    updateDisplay();
});

// LOAD MORE
loadMoreBtn.addEventListener("click", () => {
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

// RESIZE
window.addEventListener("resize", updateDisplay);

// INIT
updateDisplay();
    
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
                animateCounter(47);
            }
        });

    }, {
        threshold: 0.5
    });

    observer.observe(highlightSection);

    /* =========================
    MODAL
    ========================= */

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
        FRAUEN SLIDER 
========================= */ 
    
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
    
    let interval = setInterval(nextSlide, 3000); 
    
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
