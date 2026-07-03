/* ==========================================
   KWEKWE CITY JUNIOR COUNCIL
   SCRIPT.JS
========================================== */

/* LOADER */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.transition = "0.8s ease";
    }, 1500);
});

/* MOBILE NAVIGATION */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* SMOOTH SCROLL FOR INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* STICKY NAV EFFECT */

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

/* COUNTER ANIMATION (STATISTICS) */

const counters = document.querySelectorAll(".stat h2");

const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.innerText.replace("+", "");
            const count = +counter.getAttribute("data-count") || 0;

            const increment = target / speed;

            if (count < target) {
                counter.setAttribute("data-count", Math.ceil(count + increment));
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };

        updateCount();
    });
};

/* TRIGGER COUNTERS WHEN IN VIEW */

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, {
    threshold: 0.5
});

observer.observe(statsSection);

/* SCROLL REVEAL ANIMATION */

const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.classList.add("hidden");
    revealObserver.observe(section);
});

/* BACK TO TOP BUTTON */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

backToTop.style.position = "fixed";
backToTop.style.bottom = "30px";
backToTop.style.right = "30px";
backToTop.style.padding = "12px 18px";
backToTop.style.fontSize = "20px";
backToTop.style.border = "none";
backToTop.style.borderRadius = "50%";
backToTop.style.background = "#0b3d91";
backToTop.style.color = "white";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.zIndex = "999";

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* MOBILE NAV CLOSE ON LINK CLICK */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

/* ACTIVE NAV LINK ON SCROLL */

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(a => {
        a.classList.remove("active");

        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
});

/* SIMPLE HAMBURGER STYLE FIX (MOBILE MENU) */

const style = document.createElement("style");

style.innerHTML = `
.nav-links.active{
    display:flex !important;
    flex-direction:column;
    position:absolute;
    top:80px;
    right:20px;
    background:white;
    padding:20px;
    box-shadow:0 10px 30px rgba(0,0,0,.2);
    border-radius:10px;
}
`;

document.head.appendChild(style);