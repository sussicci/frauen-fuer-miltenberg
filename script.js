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
            item.style.display = index < maxVisible ? "flex" : "none";
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

    /* =========================
    FRAUEN SLIDER
    ========================= */

    const slider = document.querySelector(".frauen-slider");
    const slides = document.querySelectorAll(".frau");
    const next = document.querySelector(".slider-btn.right");
    const prev = document.querySelector(".slider-btn.left");

    // Clone first + last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".frau");

    let index = 1;

    // Startposition (erste echte Karte)
    slider.scrollLeft = allSlides[index].offsetLeft;

    function goToSlide(i) {
        slider.scrollTo({
            left: allSlides[i].offsetLeft,
            behavior: "smooth"
        });
        index = i;
    }

    // Buttons
    next.addEventListener("click", () => {
        goToSlide(index + 1);
    });

    prev.addEventListener("click", () => {
        goToSlide(index - 1);
    });

    // Auto Slide
    let autoSlide = setInterval(() => {
        goToSlide(index + 1);
    }, 3000);

    // Pause on hover
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            goToSlide(index + 1);
        }, 4000);
    });

    // Loop correction (ohne sichtbaren Sprung)
    slider.addEventListener("scroll", () => {
        const current = allSlides[index];

        setTimeout(() => {
            if (current.id === "first-clone") {
                slider.scrollLeft = allSlides[1].offsetLeft;
                index = 1;
            }

            if (current.id === "last-clone") {
                slider.scrollLeft = allSlides[allSlides.length - 2].offsetLeft;
                index = allSlides.length - 2;
            }
        }, 150);
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
                animateCounter(39);
            }
        });

    }, {
        threshold: 0.5
    });

    observer.observe(highlightSection);

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

    });

    document.addEventListener("DOMContentLoaded", () => {

        const container = document.getElementById("posts");
        const loadMoreBtn = document.getElementById("loadMoreBtn");

        let posts = [];
        let page = 1;
        const perPage = 2;

        fetch("./posts.json")
            .then(res => res.json())
            .then(data => {
                posts = data;
                render();
            });

        function render() {

            const visible = posts.slice(0, page * perPage);

            container.innerHTML = "";

            visible.forEach(post => {

                const article = document.createElement("article");
                article.className = "about-card";

                article.innerHTML = `
                    <div class="card-number">${post.date}</div>
                    <h3>${post.title}</h3>
                    <p>${post.text.replace(/\n/g, "<br>")}</p>
                    <a class="card-btn" href="${post.link}">
                        ${post.linkText}
                    </a>
                `;

                container.appendChild(article);
            });

            if (visible.length >= posts.length) {
                loadMoreBtn.style.display = "none";
            }
        }

        loadMoreBtn.addEventListener("click", () => {
            page++;
            render();
        });

    });

    /* =========================
   AKTUELLES POSTS
========================= */

const postsContainer = document.getElementById("posts");

if (postsContainer) {

    let allPosts = [];
    let visibleCount = 2;
    let activeFilter = "all";

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");

    fetch("./posts.json")

        .then(response => response.json())

        .then(posts => {

            allPosts = posts.sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            renderPosts();

        });

    function getFilteredPosts() {

        if (activeFilter === "all") {
            return allPosts;
        }

        return allPosts.filter(post =>
            post.type === activeFilter
        );
    }

    function renderPosts() {

        postsContainer.innerHTML = "";

        const filtered = getFilteredPosts();

        filtered
            .slice(0, visibleCount)
            .forEach(post => {

                const article = document.createElement("article");

                article.className = "about-card";

                article.innerHTML = `

                    <div class="card-number">
                        ${formatDate(post.date)}
                    </div>

                    <h3>${post.title}</h3>

                    <p>${post.text}</p>

                    <a class="card-btn"
                       href="${post.buttonLink}">
                       ${post.buttonText}
                    </a>

                `;

                postsContainer.appendChild(article);

            });

        /* Buttons */

        loadMoreBtn.style.display =
            visibleCount >= filtered.length
                ? "none"
                : "inline-block";

        showLessBtn.style.display =
            visibleCount > 2
                ? "inline-block"
                : "none";
    }

    function formatDate(dateString) {

        const date = new Date(dateString);

        return date.toLocaleDateString("de-DE");
    }

    /* FILTER */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            activeFilter = button.dataset.filter;

            visibleCount = 2;

            renderPosts();

        });

    });

    /* LOAD MORE */

    loadMoreBtn.addEventListener("click", () => {

        visibleCount += 2;

        renderPosts();

    });

    /* SHOW LESS */

    showLessBtn.addEventListener("click", () => {

        visibleCount = 2;

        renderPosts();

        window.scrollTo({
            top: postsContainer.offsetTop - 120,
            behavior: "smooth"
        });

    });

}
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
            item.style.display = index < maxVisible ? "flex" : "none";
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

    /* =========================
    FRAUEN SLIDER
    ========================= */

    const slider = document.querySelector(".frauen-slider");
    const slides = document.querySelectorAll(".frau");
    const next = document.querySelector(".slider-btn.right");
    const prev = document.querySelector(".slider-btn.left");

    // Clone first + last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".frau");

    let index = 1;

    // Startposition (erste echte Karte)
    slider.scrollLeft = allSlides[index].offsetLeft;

    function goToSlide(i) {
        slider.scrollTo({
            left: allSlides[i].offsetLeft,
            behavior: "smooth"
        });
        index = i;
    }

    // Buttons
    next.addEventListener("click", () => {
        goToSlide(index + 1);
    });

    prev.addEventListener("click", () => {
        goToSlide(index - 1);
    });

    // Auto Slide
    let autoSlide = setInterval(() => {
        goToSlide(index + 1);
    }, 3000);

    // Pause on hover
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            goToSlide(index + 1);
        }, 4000);
    });

    // Loop correction (ohne sichtbaren Sprung)
    slider.addEventListener("scroll", () => {
        const current = allSlides[index];

        setTimeout(() => {
            if (current.id === "first-clone") {
                slider.scrollLeft = allSlides[1].offsetLeft;
                index = 1;
            }

            if (current.id === "last-clone") {
                slider.scrollLeft = allSlides[allSlides.length - 2].offsetLeft;
                index = allSlides.length - 2;
            }
        }, 150);
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
                animateCounter(39);
            }
        });

    }, {
        threshold: 0.5
    });

    observer.observe(highlightSection);

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

    });

     document.addEventListener("DOMContentLoaded", () => {

    const postsContainer = document.getElementById("posts");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!postsContainer) return;

    let allPosts = [];
    let visibleCount = 4;
    let activeFilter = "all";

    // Daten laden
    fetch("./posts.json")
        .then(res => res.json())
        .then(data => {
            allPosts = data.sort((a, b) =>
                new Date(b.date.split(".").reverse().join("-")) -
                new Date(a.date.split(".").reverse().join("-"))
            );

            renderPosts();
        });

    function getFilteredPosts() {
        if (activeFilter === "all") return allPosts;
        return allPosts.filter(p => p.type === activeFilter);
    }

    function renderPosts() {

        const filtered = getFilteredPosts();

        postsContainer.innerHTML = "";

        filtered.slice(0, visibleCount).forEach(post => {

            const article = document.createElement("article");
            article.className = "about-card";

            article.innerHTML = `
                <div class="card-number">${post.date}</div>
                <h3>${post.title}</h3>
                <p>${post.text.replace(/\n/g, "<br>")}</p>
                <a class="card-btn" href="${post.link}" target="_blank">
                    ${post.linkText}
                </a>
            `;

            postsContainer.appendChild(article);
        });

        // Buttons
        if (loadMoreBtn) {
            loadMoreBtn.style.display =
                visibleCount >= filtered.length ? "none" : "inline-block";
        }

        if (showLessBtn) {
            showLessBtn.style.display =
                visibleCount > 4 ? "inline-block" : "none";
        }
    }

    // Filter
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeFilter = btn.dataset.filter;
            visibleCount = 4;

            renderPosts();
        });
    });

    // Mehr anzeigen
    loadMoreBtn?.addEventListener("click", () => {
        visibleCount += 4;
        renderPosts();
    });

    // Weniger anzeigen
    showLessBtn?.addEventListener("click", () => {
        visibleCount = 4;
        renderPosts();

        window.scrollTo({
            top: postsContainer.offsetTop - 100,
            behavior: "smooth"
        });
    });

});
