import "./styles/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");

  if (overlay) {
    if (!sessionStorage.getItem("introGezien")) {
      overlay.style.display = "flex";
      setTimeout(() => {
        overlay.remove();
        sessionStorage.setItem("introGezien", "true");
      }, 1400);
    } else {
      overlay.remove();
    }
  }
});

// 1. Functie om de loader te verbergen (Gordijn open)
function verbergLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.add("opacity-0");
    setTimeout(() => {
      loader.classList.add("pointer-events-none");
    }, 100);
  }
}

function toonLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.remove("pointer-events-none");
    loader.classList.remove("opacity-0");
  }
}

window.addEventListener("load", () => {
  setTimeout(verbergLoader, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const doel = link.getAttribute("href");

      if (doel && doel.startsWith("/") && doel !== window.location.pathname) {
        e.preventDefault();
        toonLoader();

        setTimeout(() => {
          window.location.href = doel;
        }, 150);
      }
    });
  });
});
window.addEventListener("load", () => {
  const huidigePagina = window.location.pathname;

  const menuLinks = document.querySelectorAll(".nav-link");

  menuLinks.forEach((link) => {
    const linkDoel = link.getAttribute("href");

    if (
      linkDoel === huidigePagina ||
      (huidigePagina === "/" && linkDoel === "/index.html")
    ) {
      const lijntje = link.querySelector("span");

      if (lijntje) {
        lijntje.classList.remove("w-0");
        lijntje.classList.remove("group-hover:w-full");

        lijntje.classList.add("w-full");
      }
    }
  });
});
