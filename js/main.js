import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
gsap.registerPlugin(ScrollTrigger);

// ==================================
// PREMIUM MOBILE NAVIGATION
// ==================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const mobileItems = navLinks.querySelectorAll("li");

function openMenu() {

    navLinks.classList.add("active");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    document.body.style.overflow = "hidden";

    gsap.fromTo(
        mobileItems,
        {
            x: 40,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
            overwrite: true
        }
    );

}

function closeMenu() {

    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.style.overflow = "";

}

menuToggle.addEventListener("click", () => {

    if (navLinks.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }

});

// Close when a navigation link is selected

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

// Close when Escape is pressed

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
    }

});


// ==================================
// 1. LOADING SCREEN
// ==================================


window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    // Hide loading screen
    setTimeout(() => {
        if (loader) {
            loader.classList.add("hide");
        }

        // Restore the section requested in the URL
        const targetId = decodeURIComponent(
            window.location.hash.substring(1)
        );

        if (targetId) {
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "instant",
                    block: "start"
                });
            }
        }

    }, 1500);

    // GSAP entrance animation
    const intro = gsap.timeline({
        delay: 1.6,
        defaults: {
            ease: "power3.out"
        }
    });

    intro.from(".hero-tag", {
        y: 30,
        opacity: 0,
        duration: 0.8
    });

    intro.from(".hero h1", {
        y: 80,
        opacity: 0,
        duration: 1.2
    }, "-=0.4");

    intro.from(".hero-content > p", {
        y: 40,
        opacity: 0,
        duration: 0.9
    }, "-=0.6");

    intro.from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.5");

    intro.from(".hero-footer", {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, "-=0.4");

    intro.from(".scroll-indicator", {
        opacity: 0,
        duration: 1
    }, "-=0.3");

});




// ==================================
// 2. CREATE 3D SCENE
// ==================================

const container = document.getElementById("hero-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 8;


// ==================================
// 3. CREATE RENDERER
// ==================================

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

container.appendChild(renderer.domElement);


// ==================================
// 4. CREATE 3D OBJECT
// ==================================

const geometry = new THREE.TorusKnotGeometry(
    1.15,
    0.32,
    180,
    24,
    2,
    3
);

const material = new THREE.MeshPhysicalMaterial({
    color: 0x8055ff,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1,
    emissive: 0x24104a,
    emissiveIntensity: 0.7
});

const object = new THREE.Mesh(
    geometry,
    material
);

object.position.set(3.3, 0, 0);

scene.add(object);


// ==================================
// 5. ADD GLOWING LIGHTS
// ==================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);


const purpleLight = new THREE.PointLight(
    0x8b5cf6,
    35,
    20
);

purpleLight.position.set(3, 3, 4);

scene.add(purpleLight);


const blueLight = new THREE.PointLight(
    0x00d4ff,
    25,
    20
);

blueLight.position.set(-3, -2, 3);

scene.add(blueLight);


// ==================================
// 6. ADD WIREFRAME SHELL
// ==================================

const shellGeometry = new THREE.TorusKnotGeometry(
    1.3,
    0.32,
    120,
    16,
    2,
    3
);

const shellMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});

const shell = new THREE.Mesh(
    shellGeometry,
    shellMaterial
);

object.add(shell);


// ==================================
// 7. ADD FLOATING PARTICLES
// ==================================

const particleCount = 500;

const particleGeometry = new THREE.BufferGeometry();

const positions = [];

for (let i = 0; i < particleCount; i++) {

    const x = (Math.random() - 0.5) * 16;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 8;

    positions.push(x, y, z);

}

particleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
    color: 0x9b7bff,
    size: 0.025,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
);

scene.add(particles);


// ==================================
// 8. MOUSE INTERACTION
// ==================================

let mouseX = 0;
let mouseY = 0;

window.addEventListener("pointermove", (event) => {

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;

    mouseY = (event.clientY / window.innerHeight) * 2 - 1;

});


// ==================================
// 9. ANIMATION LOOP
// ==================================

function animate() {

    requestAnimationFrame(animate);

    // Continuous rotation
    object.rotation.x += 0.003;
    object.rotation.y += 0.006;

    // Floating movement
    object.position.y = Math.sin(Date.now() * 0.001) * 0.2;

    // Mouse-responsive movement
    object.rotation.x += (mouseY * 0.3 - object.rotation.x) * 0.002;

    object.rotation.y += (mouseX * 0.3 - object.rotation.y) * 0.002;

    // Particle movement
    particles.rotation.y += 0.0005;

    particles.rotation.x += 0.0002;

    // Render scene
    renderer.render(scene, camera);

}

animate();


// ==================================
// 10. RESPONSIVE RESIZING
// ==================================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    if (window.innerWidth < 600) {

        object.position.x = 1.5;
        object.scale.setScalar(0.65);

    } else {

        object.position.x = 3.3;
        object.scale.setScalar(1);

    }

});

// =====================================
// ABOUT SECTION SCROLL ANIMATION
// =====================================

gsap.registerPlugin(ScrollTrigger);

const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

aboutTimeline
    .from(".about-label", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    })

    .from(".about-intro", {
        y: 25,
        opacity: 0,
        duration: 0.6
    }, "-=0.3")

    .from(".about-heading", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    }, "-=0.2")

    .from(".about-description", {
        y: 35,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")

    .from(".about-tech", {
        y: 25,
        opacity: 0,
        duration: 0.7
    }, "-=0.3")

    .from(".about-button", {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, "-=0.2")

    .from(".about-visual-card", {
        scale: 0.8,
        rotateY: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1")

    .from(".about-floating-card", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.5)"
    }, "-=0.4")

    .from(".about-stat", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15
    }, "-=0.2");



// =====================================
// PROJECTS SCROLL ANIMATION
// =====================================

const projectsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".projects-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

projectsTimeline
    .from(".projects-label", {
        x: -40,
        opacity: 0,
        duration: 0.7
    })

    .from(".projects-header h2", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    }, "-=0.3")

    .from(".projects-intro", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    .from(".project-card", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.2")

    .from(".projects-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.3");



// =====================================
// SERVICES SCROLL ANIMATION
// =====================================

const servicesTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

servicesTimeline
    .from(".services-label", {
        x: -35,
        opacity: 0,
        duration: 0.7
    })

    .from(".services-header h2", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    }, "-=0.3")

    .from(".services-header > p", {
        y: 25,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    .from(".service-card", {
        y: 70,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    }, "-=0.2")

    .from(".services-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8
    }, "-=0.2");



// =====================================
// CONTACT FORM - WHATSAPP INTEGRATION
// =====================================

const contactForm = document.getElementById("contact-form");

// Replace this with your WhatsApp number.
// Include country code, without +, spaces or dashes.
const whatsappNumber = "2349161711509";

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const service = document.getElementById("contact-service").value;
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !service || !message) {
            alert("Please complete all fields before submitting.");
            return;
        }

        if (whatsappNumber.includes("X")) {
            alert("Please add your WhatsApp number in js/main.js first.");
            return;
        }

        const whatsappMessage = `
Hello YoungPhil!

I would like to discuss a project with you.

Name: ${name}

Email: ${email}

Service Required: ${service}

Project Details:
${message}

I look forward to hearing from you.
        `.trim();

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });

}


// =====================================
// CONTACT SCROLL ANIMATION
// =====================================

const contactTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

contactTimeline
    .from(".contact-label", {
        x: -35,
        opacity: 0,
        duration: 0.7
    })

    .from(".contact-header h2", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    }, "-=0.3")

    .from(".contact-header > p", {
        y: 25,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    .from(".contact-info", {
        x: -50,
        opacity: 0,
        duration: 0.9
    }, "-=0.2")

    .from(".contact-form-wrapper", {
        x: 50,
        opacity: 0,
        duration: 0.9
    }, "-=0.7")

    .from(".contact-closing", {
        y: 35,
        opacity: 0,
        duration: 0.8
    });
