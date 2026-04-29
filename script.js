/* ===== OPEN RESUME (PDF) ===== */

function openResume(event) {
  if (event) {
    event.preventDefault();
  }
  const url = new URL("assets/resume.pdf", window.location.href).href;
  const newWin = window.open(url, "_blank", "noopener,noreferrer");
  if (!newWin || newWin.closed) {
    window.location.href = url;
  }
}

/* ===== HAMBURGER MENU ===== */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ===== NAVBAR SCROLL EFFECT ===== */

const desktopNav = document.getElementById("desktop-nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    desktopNav.classList.add("scrolled");
  } else {
    desktopNav.classList.remove("scrolled");
  }
});

/* ===== ACTIVE NAV LINK TRACKING ===== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

/* ===== SCROLL REVEAL ANIMATIONS ===== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ===== TYPING ANIMATION ===== */

const typedTextEl = document.querySelector(".typed-text");
const phrases = [
  "Fullstack Developer",
  "ML Enthusiast",
  "Cloud Engineer",
  "Problem Solver",
  "Computer Scientist",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 30 : 60;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1000);

/* ===== PROJECT FILTER TABS ===== */

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category.includes(filter)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ===== SMOOTH SCROLL FOR ALL INTERNAL LINKS ===== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
