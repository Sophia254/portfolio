/* =========================================================
   Portfolio: script.js
   1. Mobile menu (button click)
   2. Skill bars animated when they appear
   3. Light / dark theme toggle (click, saved in the browser)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initSkills();
  initTheme();
});

/* ---------- 1. Mobile menu ---------- */
function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu when a link is clicked
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

/* ---------- 2. Skill bars ---------- */
function initSkills() {
  const levels = document.querySelectorAll(".skill-level");

  // Display the percentage next to the skill name
  levels.forEach((bar) => {
    const label = bar.closest(".skill").querySelector(".skill-name");
    const percent = document.createElement("span");
    percent.textContent = bar.dataset.level + "%";
    label.appendChild(percent);
  });

  const fill = (bar) => {
    bar.style.width = bar.dataset.level + "%";
  };

  // Animate the bar when it becomes visible on screen
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fill(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    levels.forEach((bar) => observer.observe(bar));
  } else {
    levels.forEach(fill);
  }
}

/* ---------- 3. Theme toggle ---------- */
function initTheme() {
  const button = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const apply = (theme) => {
    const dark = theme === "dark";
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    button.textContent = dark ? "☀" : "☾";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
  apply(saved === "dark" ? "dark" : "light");

  button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });
}