/* =========================================
   YOUNGPHIL PRODUCT DETAILS JAVASCRIPT
========================================= */
// 1. PRODUCT DATABASE
const marketplaceProducts = [
    {
        id: 1,
        name: "YoungCut Barbershop Website",
        categoryLabel: "BARBERSHOP",
        description: "A modern barbershop website designed to showcase haircut styles, attract customers and make booking easier.",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "Images/youn.webp",
        demo: "https://courageous-boba-24912a.netlify.app/",
        price: "₦150,000",
        purchaseLink: "https://wa.me/2349167579605"
    },
    {
        id: 2,
        name: "Savanna Bites Restaurant Website",
        categoryLabel: "RESTAURANT",
        description: "A modern restaurant platform featuring a digital menu, food ordering, customer reviews, reservations and an admin dashboard.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
        image: "Images/sava.webp",
        demo: "https://tubular-mooncake-c836d6.netlify.app/",
        price: "Contact for price",
        purchaseLink: "https://wa.me/2349167579605"
    },
    
    {
        id: 3,
        name: "LUMEN Photography Platform",
        categoryLabel: "FULL-STACK PHOTOGRAPHY",
        description: "A premium photography platform featuring an elegant portfolio website and an admin dashboard that allows photographers to manage, upload and organize their portfolio work.",
        technologies: ["HTML", "CSS", "JavaScript", "Backend", "Admin Dashboard"],
        image: "Images/lumen.webp",
        demo: "https://jocular-toffee-af201b.netlify.app/",
        price: "Contact for price",
        purchaseLink: "https://wa.me/2349167579605"
    }
];


// 2. GET PRODUCT ID FROM URL
const urlParameters = new URLSearchParams(window.location.search);
const productId = Number(urlParameters.get("id"));

const product = marketplaceProducts.find(item => item.id === productId);


// 3. PAGE ELEMENTS
const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
const productPrice = document.getElementById("product-price");
const productTech = document.getElementById("product-tech");
const productBuy = document.getElementById("product-buy");
const productDemo = document.getElementById("product-demo");
const productBreadcrumb = document.getElementById("product-breadcrumb-name");


// 4. DISPLAY PRODUCT
if (product) {

    productName.textContent = product.name;

    productCategory.textContent = product.categoryLabel;

    productDescription.textContent = product.description;

    productImage.src = product.image;
    productImage.alt = product.name + " preview";

    productPrice.textContent = product.price;

    productBreadcrumb.textContent = product.name;

    // TECHNOLOGIES
    productTech.innerHTML = "";

    product.technologies.forEach(technology => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        productTech.appendChild(tag);
    });

    // PURCHASE LINK
    const purchaseMessage = encodeURIComponent(
        `Hello YoungPhil, I'm interested in purchasing the ${product.name}. Please share more details.`
    );

    productBuy.href = product.purchaseLink.includes("9167579605")
        ? `https://wa.me/2349167579605?text=${purchaseMessage}`
        : `${product.purchaseLink}?text=${purchaseMessage}`;

    // LIVE PREVIEW
    productDemo.href = product.demo;

    if (product.demo === "#") {
        productDemo.textContent = "Live Preview Coming Soon";
        productDemo.removeAttribute("target");
        productDemo.style.opacity = "0.5";
        productDemo.style.pointerEvents = "none";
    }

    document.title = `${product.name} | YoungPhil Marketplace`;

} else {

    // PRODUCT NOT FOUND
    productName.textContent = "Website Not Found";

    productCategory.textContent = "UNAVAILABLE";

    productDescription.textContent =
        "Sorry, this website could not be found. Please return to the marketplace and select another product.";

    productImage.style.display = "none";

    productPrice.textContent = "Unavailable";

    productTech.innerHTML = "";

    productBuy.style.display = "none";
    productDemo.style.display = "none";

}


// 5. PAGE LOADER
window.addEventListener("load", () => {

    const loader = document.getElementById("product-loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 600);
    }

});


// ==============================
// RELATED PRODUCTS
// ==============================

const relatedProductsGrid = document.getElementById(
    "related-products-grid"
);

if (relatedProductsGrid) {

    const relatedProducts = marketplaceProducts.filter(
        item => item.id !== productId
    );

    relatedProductsGrid.innerHTML = relatedProducts.map(item => `
        <article class="related-product-card">

            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >

            <div class="related-product-info">

                <span>${item.categoryLabel}</span>

                <h3>${item.name}</h3>

                <a href="product.html?id=${item.id}">
                    Explore Website ↗
                </a>

            </div>

        </article>
    `).join("");

}


// ==============================
// RETURN TO PREVIOUS PAGE
// ==============================

const returnPreviousBtn = document.getElementById(
    "return-previous-btn"
);

if (returnPreviousBtn) {

    returnPreviousBtn.addEventListener("click", () => {

        const previousPage = document.referrer;

        // Check whether the visitor came from this website
        if (previousPage) {
            try {
                const previousURL = new URL(previousPage);

                if (previousURL.origin === window.location.origin) {
                    window.history.back();
                    return;
                }

            } catch (error) {
                console.log("Unable to return to previous page.");
            }
        }

        // Fallback if the visitor opened the product page directly
        window.location.href = "marketplace.html";

    });

}
