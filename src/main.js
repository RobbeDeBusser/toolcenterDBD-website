import "./styles/style.css";

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
      (huidigePagina === "/" && linkDoel === "/") ||
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

  
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem("cookiesAccepted")) {
      
      setTimeout(() => {
        cookieBanner.classList.remove("translate-y-full");
      }, 800);
    }

    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.add("translate-y-full");
    });
  }
  
  const mainHeader = document.getElementById("main-header");
  const headerInner = document.getElementById("header-inner");
  const headerLogo = document.getElementById("header-logo");
  const mainContent = document.querySelector("main");

  if (mainHeader && headerInner && headerLogo && mainContent) {
    mainContent.classList.add("transition-all", "duration-300", "ease-in-out");

    const onScroll = () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add("shadow-xl");
        mainHeader.style.height = "60px";
        headerInner.style.paddingTop = "0";
        headerInner.style.paddingBottom = "0";
        headerInner.style.height = "60px";
        headerLogo.style.height = "28px";
        mainContent.style.paddingTop = "60px";
      } else {
        mainHeader.classList.remove("shadow-xl");
        mainHeader.style.height = "80px";
        headerInner.style.paddingTop = "1rem";
        headerInner.style.paddingBottom = "1rem";
        headerInner.style.height = "80px";
        headerLogo.style.height = "40px";
        mainContent.style.paddingTop = "80px";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  initBackToTop();
});

function initBackToTop() {
  if (document.getElementById("premium-btt")) return;

  const bttHTML = `
    <div id="premium-btt" class="back-to-top-container">
      <svg class="back-to-top-progress" viewBox="0 0 100 100">
        <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
        <circle id="btt-progress-bar" cx="50" cy="50" r="45"></circle>
      </svg>
      <button class="back-to-top-btn" aria-label="Terug naar boven">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", bttHTML);

  const container = document.getElementById("premium-btt");
  const progressBar = document.getElementById("btt-progress-bar");
  const btn = container.querySelector(".back-to-top-btn");

  if (!container || !progressBar || !btn) return;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
  progressBar.style.strokeDashoffset = circumference;

  const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = scrollPosition / scrollHeight;
    const offset = circumference - progress * circumference;

    progressBar.style.strokeDashoffset = offset;

    if (scrollPosition > 300) {
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  updateProgress();
}

