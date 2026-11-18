
/* =========================================
   YOUNGPHIL MARKETPLACE JAVASCRIPT
========================================= */


/* =========================================
   1. PAGE LOADER
========================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("market-loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);
    }
});


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const marketMenuToggle = document.getElementById("market-menu-toggle");
const marketNavLinks = document.getElementById("market-nav-links");

function closeMarketMenu() {
    if (!marketMenuToggle || !marketNavLinks) return;

    marketMenuToggle.classList.remove("active");
    marketNavLinks.classList.remove("active");

    marketMenuToggle.setAttribute("aria-expanded", "false");
    marketMenuToggle.setAttribute("aria-label", "Open navigation");

    document.body.style.overflow = "";
}

if (marketMenuToggle && marketNavLinks) {

    marketMenuToggle.addEventListener("click", () => {

        const isOpen = marketNavLinks.classList.toggle("active");

        marketMenuToggle.classList.toggle("active", isOpen);

        marketMenuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        marketMenuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

    });

    marketNavLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMarketMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMarketMenu();
        }
    });

}


/* =========================================
   3. MARKETPLACE WEBSITE DATA
========================================= */

// Add your available website products here.
// We will populate this collection with your actual
// website designs, prices and demo links later.


const marketplaceProducts = [
    {
        id: 1,
        name: "YoungCut Barbershop Website",
        category: "beauty",
        categoryLabel: "BARBERSHOP",
        description: "A modern barbershop website designed to showcase haircut styles, attract customers and make booking easier.",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "Images/youn.webp",
        demo: "https://courageous-boba-24912a.netlify.app/",
        price: "₦150,000",
        purchaseLink: "https://wa.me/2349167579605?text=Hello%20YoungPhil,%20I'm%20interested%20in%20buying%20the%20YoungCut%20website."
    },

    {
        id: 2,
        name: "Savanna Bites Restaurant Website",
        category: "restaurant",
        categoryLabel: "RESTAURANT",
        description: "A modern restaurant platform featuring a digital menu, food ordering, customer reviews, reservations and an admin dashboard.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Admin Dashboard"],
        image: "images/sava.webp",
        demo: "https://tubular-mooncake-c836d6.netlify.app/",
        price: "Contact for price",
        purchaseLink: "https://wa.me/2349167579605?text=Hello%20YoungPhil,%20I'm%20interested%20in%20the%20Savanna%20Bites%20website."
    },


    {
        id: 3,
        name: "LUMEN Photography Platform",
        category: "portfolio",
        categoryLabel: "FULL-STACK PHOTOGRAPHY",
        description: "A premium photography platform featuring an elegant portfolio website and an admin dashboard that allows photographers to manage, upload and organize their portfolio work.",
        technologies: ["HTML", "CSS", "JavaScript", "Backend", "Admin Dashboard"],
        image: "images/lumen.webp",
        demo: "https://jocular-toffee-af201b.netlify.app",
        price: "Contact for price",
        purchaseLink: "https://wa.me/2349167579605?text=Hello%20YoungPhil,%20I'm%20interested%20in%20the%20LUMEN%20Photography%20Platform."
    }

];



/* =========================================
   4. MARKETPLACE ELEMENTS
========================================= */

const marketGrid = document.getElementById("market-grid");
const marketEmpty = document.getElementById("market-empty");
const marketSearch = document.getElementById("market-search");
const marketFilters = document.getElementById("market-filters");
const marketResultCount = document.getElementById("market-result-count");

let activeCategory = "all";
let searchQuery = "";


/* =========================================
   5. RENDER WEBSITE PRODUCTS
========================================= */

function renderMarketplace() {

    if (!marketGrid) return;

    const filteredProducts = marketplaceProducts.filter(product => {

        const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;

        const searchContent = `
            ${product.name}
            ${product.category}
            ${product.description}
            ${product.technologies?.join(" ")}
        `.toLowerCase();

        const matchesSearch = searchContent.includes(searchQuery);

        return matchesCategory && matchesSearch;

    });

    marketResultCount.textContent = filteredProducts.length;

    marketGrid.innerHTML = "";

    if (filteredProducts.length === 0) {

        marketEmpty.style.display = "flex";

        return;

    }

    marketEmpty.style.display = "none";

    filteredProducts.forEach(product => {

        const productCard = document.createElement("article");

        productCard.className = "market-product-card";

        productCard.innerHTML = `
            <div class="market-product-image">
                <img
                    src="${product.image}"
                    alt="${product.name} website preview"
                    loading="lazy"
                >

                <span class="market-product-category">
                    ${product.categoryLabel}
                </span>

                <a href="product.html?id=${product.id}" class="market-product-preview">
                    View Details ↗
                </a>
            </div>

            <div class="market-product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="market-product-tech">
                    ${product.technologies.map(tech => `
                        <span>${tech}</span>
                    `).join("")}
                </div>

                <div class="market-product-bottom">

                    <div class="market-product-price">
                        <span>STARTING FROM</span>
                        <strong>${product.price}</strong>
                    </div>

                    <a href="product.html?id=${product.id}" class="market-product-buy">
                        View Website Details ↗
                    </a>

                </div>

            </div>
        `;

        marketGrid.appendChild(productCard);

    });

}


/* =========================================
   6. SEARCH FUNCTIONALITY
========================================= */

if (marketSearch) {

    marketSearch.addEventListener("input", event => {

        searchQuery = event.target.value.trim().toLowerCase();

        renderMarketplace();

    });

}


/* =========================================
   7. CATEGORY FILTERS
========================================= */

if (marketFilters) {

    marketFilters.querySelectorAll(".market-filter").forEach(button => {

        button.addEventListener("click", () => {

            marketFilters.querySelectorAll(".market-filter").forEach(filter => {
                filter.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory = button.dataset.category;

            renderMarketplace();

        });

    });

}


/* =========================================
   8. INITIALIZE MARKETPLACE
========================================= */

renderMarketplace();


/* =========================================
   9. GSAP ANIMATIONS
========================================= */

if (typeof gsap !== "undefined") {

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const marketIntro = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    marketIntro
        .from(".market-eyebrow", {
            y: 25,
            opacity: 0,
            duration: 0.7
        })
        .from(".market-hero h1", {
            y: 65,
            opacity: 0,
            duration: 1
        }, "-=0.4")
        .from(".market-hero-content > p", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".market-hero-actions", {
            y: 25,
            opacity: 0,
            duration: 0.7
        }, "-=0.4")
        .from(".market-hero-visual", {
            scale: 0.8,
            opacity: 0,
            duration: 1.2
        }, "-=0.8");


    // COLLECTION ANIMATION

    if (typeof ScrollTrigger !== "undefined") {

        gsap.from(".market-section-heading", {
            scrollTrigger: {
                trigger: ".market-collection",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        });


        gsap.from(".market-controls", {
            scrollTrigger: {
                trigger: ".market-controls",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 35,
            opacity: 0,
            duration: 0.8
        });


        gsap.from(".market-custom-content", {
            scrollTrigger: {
                trigger: ".market-custom",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 45,
            opacity: 0,
            duration: 1
        });

    }

}
