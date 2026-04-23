import "./styles/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");

  if (overlay) {
    if (!sessionStorage.getItem("introGezien")) {
      overlay.style.display = "flex";
      overlay.remove();
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
  verbergLoader();
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
  // === Sticky Navbar Scroll Effect ===
  const mainHeader = document.getElementById("main-header");
  const headerInner = document.getElementById("header-inner");
  const headerLogo = document.getElementById("header-logo");

  if (mainHeader && headerInner && headerLogo) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        // Verklein de navbar bij scrollen
        mainHeader.classList.add("shadow-xl", "h-16");
        mainHeader.classList.remove("h-20", "md:h-24");
        headerInner.classList.remove("py-4");
        headerInner.classList.add("py-2");
        headerLogo.classList.remove("h-12");
        headerLogo.classList.add("h-8");
      } else {
        // Herstel de originele grootte bovenaan
        mainHeader.classList.remove("shadow-xl", "h-16");
        mainHeader.classList.add("h-20", "md:h-24");
        headerInner.classList.add("py-4");
        headerInner.classList.remove("py-2");
        headerLogo.classList.add("h-12");
        headerLogo.classList.remove("h-8");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // === Back to Top Button ===
  const createBackToTopButton = () => {
    const button = document.createElement("button");
    button.id = "back-to-top";
    button.className = "fixed bottom-8 right-8 bg-tool-red text-white p-3 rounded-full shadow-2xl opacity-0 invisible transition-all duration-500 z-50 hover:bg-tool-black hover:-translate-y-2 transform cursor-pointer flex items-center justify-center border-2 border-white/10";
    button.setAttribute("aria-label", "Terug naar boven");
    button.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path>
      </svg>
    `;
    document.body.appendChild(button);

    const onScrollBTT = () => {
      if (window.scrollY > 400) {
        button.classList.remove("opacity-0", "invisible", "translate-y-10");
        button.classList.add("opacity-100", "visible", "translate-y-0");
      } else {
        button.classList.add("opacity-0", "invisible", "translate-y-10");
        button.classList.remove("opacity-100", "visible", "translate-y-0");
      }
    };

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", onScrollBTT, { passive: true });
    onScrollBTT();
  };

  createBackToTopButton();
});
