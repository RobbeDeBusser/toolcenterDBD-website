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
    const productPaginas = ["/producten", "/handtools", "/powertools", "/diagnose", "/specials"];

    if (
      linkDoel === huidigePagina ||
      (huidigePagina === "/" && linkDoel === "/home") ||
      (linkDoel === "/producten" && productPaginas.includes(huidigePagina))
    ) {
      const lijntje = link.querySelector("span");

      if (lijntje) {
        lijntje.classList.remove("w-0");
        lijntje.classList.remove("group-hover:w-full");

        lijntje.classList.add("w-full");
      }
    }
  });

  // Mobile menu toggle logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // Cookie banner logic
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem("cookiesAccepted")) {
      // Delay showing the banner slightly for a smooth entrance
      setTimeout(() => {
        cookieBanner.classList.remove("translate-y-full");
      }, 800);
    }

    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.add("translate-y-full");
    });
  }
});
