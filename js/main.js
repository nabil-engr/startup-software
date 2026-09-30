const SELECTORS = {
  contactForm: "#contact-form",
  contactStatus: "#contact-status",
  fadeElements: ".fade-in",
  header: "header",
  menu: "#mobile-menu",
  menuButton: "#hamburger-btn",
  navLinks: 'nav a[href^="#"]',
  sections: "section[id]",
  year: "#current-year",
};

const toggleMenu = (menu, button, force) => {
  const isOpen = force ?? !menu.classList.contains("open");
  menu.classList.toggle("open", isOpen);
  menu.setAttribute("aria-hidden", String(!isOpen));
  button.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("overflow-hidden", isOpen);
};

const setupMobileMenu = () => {
  const button = document.querySelector(SELECTORS.menuButton);
  const menu = document.querySelector(SELECTORS.menu);
  if (!button || !menu) return;

  button.addEventListener("click", () => toggleMenu(menu, button));
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(menu, button, false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") toggleMenu(menu, button, false);
  });
};

const setupStickyHeader = () => {
  const header = document.querySelector(SELECTORS.header);
  if (!header) return;

  const update = () => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle("bg-surface/95", scrolled);
    header.classList.toggle("shadow-md", scrolled);
    header.classList.toggle("bg-surface/80", !scrolled);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
};

const setupRevealAnimations = () => {
  const elements = document.querySelectorAll(SELECTORS.fadeElements);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((element) => observer.observe(element));
};

const setupActiveNavigation = () => {
  const links = [...document.querySelectorAll(SELECTORS.navLinks)];
  const sections = document.querySelectorAll(SELECTORS.sections);

  const observer = new IntersectionObserver(
    (entries) => {
      const active = entries.find((entry) => entry.isIntersecting);
      if (!active) return;

      links.forEach((link) => {
        const isCurrent = link.hash === `#${active.target.id}`;
        link.classList.toggle("bg-surface-container-high", isCurrent);
        link.classList.toggle("text-on-surface", isCurrent);
        link.classList.toggle("text-on-surface-variant", !isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
};

const setupContactForm = () => {
  const form = document.querySelector(SELECTORS.contactForm);
  const status = document.querySelector(SELECTORS.contactStatus);
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("hidden");
    status.setAttribute("role", "status");
    form.reset();
  });
};

const setCurrentYear = () => {
  const year = document.querySelector(SELECTORS.year);
  if (year) year.textContent = String(new Date().getFullYear());
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupStickyHeader();
  setupRevealAnimations();
  setupActiveNavigation();
  setupContactForm();
  setCurrentYear();
});
