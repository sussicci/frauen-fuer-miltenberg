document.addEventListener("DOMContentLoaded", () => {

    /* =========================
   UNSERE ARBEIT FILTER
========================= */

const items = document.querySelectorAll(".arbeit");

/* STATUS */

function getStatus() {
    return document.querySelector('input[name="status"]:checked').value;
}

/* KATEGORIE */

function getCategory() {
    return document.querySelector('input[name="category"]:checked').value;
}

/* FILTER LOGIK */

function matchesFilters(item) {

    const status = getStatus();
    const category = getCategory();

    const matchesStatus =
        status === "status-all" ||
        item.classList.contains(status);

    const matchesCategory =
        category === "category-all" ||
        item.classList.contains(category);

    return matchesStatus && matchesCategory;
}

/* FILTER ANWENDEN */

function applyFilters() {

    items.forEach(item => {

        if (matchesFilters(item)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });

}

/* DESKTOP FILTER */

document
    .querySelectorAll('input[name="status"], input[name="category"]')
    .forEach(input => {

        input.addEventListener("change", applyFilters);

    });

/* MOBILE FILTER */

const statusSelect = document.getElementById("statusFilterMobile");
const categorySelect = document.getElementById("categoryFilterMobile");

/* STATUS MOBILE */

statusSelect?.addEventListener("change", () => {

    const radio = document.querySelector(
        `input[name="status"][value="${statusSelect.value}"]`
    );

    if (radio) {
        radio.checked = true;
    }

    applyFilters();

});

/* CATEGORY MOBILE */

categorySelect?.addEventListener("change", () => {

    const radio = document.querySelector(
        `input[name="category"][value="${categorySelect.value}"]`
    );

    if (radio) {
        radio.checked = true;
    }

    applyFilters();

});

/* INIT */

applyFilters();
    
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
