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

  if (mainHeader && headerInner && headerLogo) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        
        mainHeader.classList.add("shadow-xl", "h-16");
        mainHeader.classList.remove("h-20", "md:h-24");
        headerInner.classList.remove("py-4");
        headerInner.classList.add("py-2");
        headerLogo.classList.remove("h-12");
        headerLogo.classList.add("h-8");
      } else {
        
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
  // Initialize Back to Top
  initBackToTop();
});

/**
 * Premium Back to Top Button
 */
function initBackToTop() {
  // Check if it already exists (to avoid duplicates)
  if (document.getElementById("premium-btt")) return;

  // Create the button markup
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

  // Inject into body
  document.body.insertAdjacentHTML("beforeend", bttHTML);

  const container = document.getElementById("premium-btt");
  const progressBar = document.getElementById("btt-progress-bar");
  const btn = container.querySelector(".back-to-top-btn");

  if (!container || !progressBar || !btn) return;

  // SVG Circle properties
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

    // Visibility toggle
    if (scrollPosition > 300) {
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
    }
  };

  // Scroll event
  window.addEventListener("scroll", updateProgress, { passive: true });

  // Click event
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initial call
  updateProgress();
}

