(function () {
  const LOGO_SRC = "./logo.png";
  const PHONE_NUMBER = "+91-7500208500";
  const WHATSAPP_NUMBER = "917500208500";

  const NAV_ITEMS = [
    { label: "Home",       href: "index.html" },
    { label: "Services",   href: "services.html" },
    { label: "RVSF",       href: "rvsf.html" },
    { label: "About",      href: "about.html" },
    { label: "Contact Us", href: "contact.html" },
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path === "" ? "index.html" : path;
  }

  function navLink(item) {
    const active = currentPage() === item.href ? " active" : "";
    return `<a class="nav-link${active}" href="${item.href}">${item.label}</a>`;
  }

  function renderNav() {
    const placeholder = document.getElementById("site-nav");
    if (!placeholder) return;

    const desktopLinks = NAV_ITEMS.map((i) => navLink(i)).join("");
    const mobileLinks  = NAV_ITEMS.map((i) => navLink(i)).join("");

    placeholder.outerHTML = `
<nav class="fixed top-0 w-full z-50 glass-nav" id="main-nav">
  <div class="flex items-center justify-between px-3 sm:px-4 py-2.5 max-w-[1280px] mx-auto">

    <!-- Brand (always visible) -->
    <a href="index.html" class="flex items-center gap-2.5 flex-shrink-0">
      <img alt="M Sameer Logo" class="nav-logo-img" src="${LOGO_SRC}"/>
      <div class="leading-tight">
        <span class="nav-brand-text block text-[1.25rem] sm:text-[1.35rem]">M Sameer &amp; Company</span>
        <span class="nav-brand-sub text-[0.75rem] sm:text-[0.8rem]">Chartered Accountants</span>
      </div>
    </a>

    <!-- Desktop Nav Links -->
    <div class="hidden md:flex items-center gap-7">
      ${desktopLinks}
    </div>

    <!-- CTA Actions (desktop only) -->
    <div class="hidden md:flex items-center gap-3 flex-shrink-0">
      <a href="contact.html" class="btn-gold px-6 py-2.5 text-xs uppercase tracking-wider">
        Book Consultation
      </a>
      <a href="tel:${PHONE_NUMBER}" class="nav-call-btn" aria-label="Call us">
        <span class="call-dot"></span>
        <span class="material-symbols-outlined text-[16px] filled">call</span>
        <span>Call Now</span>
      </a>
    </div>

    <!-- Mobile: Call icon + hamburger -->
    <div class="flex md:hidden items-center gap-3 pr-1">
      <a href="tel:${PHONE_NUMBER}" class="flex items-center justify-center w-11 h-11 rounded-full bg-[#0A1931] text-white flex-shrink-0">
        <span class="material-symbols-outlined text-[24px] filled">call</span>
      </a>
      <button id="menu-toggle" class="flex items-center justify-center w-11 h-11 rounded-full bg-[#F6C90E] flex-shrink-0" aria-label="Open menu">
        <span class="material-symbols-outlined text-[30px] text-[#0A1931]">menu</span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Drawer Overlay -->
<div id="mobile-overlay" class="mobile-drawer-overlay"></div>

<!-- Mobile Drawer -->
<div id="mobile-drawer" class="mobile-drawer md:hidden" aria-hidden="true">
  <button id="menu-close" class="absolute top-5 right-5 text-[#F6C90E] p-2" aria-label="Close menu">
    <span class="material-symbols-outlined text-3xl">close</span>
  </button>
  <div class="flex items-center gap-3 mt-10 mb-6 pb-6 border-b border-[rgba(255,255,255,0.1)]">
    <img src="${LOGO_SRC}" alt="Logo" class="h-12 w-12 object-contain rounded-md border border-white/20"/>
    <div>
      <p class="font-display text-lg text-white font-semibold">M Sameer &amp; Company</p>
      <p class="text-[10px] text-[#F6C90E] uppercase tracking-[0.2em]">Chartered Accountants</p>
    </div>
  </div>
  <nav class="flex flex-col gap-1">
  ${mobileLinks}
  </nav>
  <div class="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
    <a href="tel:${PHONE_NUMBER}" class="nav-call-btn justify-center px-6 py-3 text-sm">
      <span class="call-dot"></span>
      <span class="material-symbols-outlined text-[16px] filled">call</span>
      Call Now
    </a>
    <a href="contact.html" class="btn-gold px-6 py-3 text-center text-xs uppercase tracking-wider">
      Book Consultation
    </a>
  </div>
</div>`;

    initNavBehavior();
  }

  function renderFooter() {
    const placeholder = document.getElementById("site-footer");
    if (!placeholder) return;

    placeholder.outerHTML = `
<footer class="site-footer w-full mt-auto relative z-10">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-16 max-w-[1280px] mx-auto">
    <div class="md:col-span-1">
      <div class="flex items-center gap-3 mb-4">
        <img src="${LOGO_SRC}" alt="Logo" class="h-10 w-10 object-contain logo-glow"/>
        <span class="font-display text-xl font-semibold text-white">M Sameer &amp; Company</span>
      </div>
      <p class="text-slate-300 text-sm leading-relaxed max-w-xs">Premium Chartered Accountancy — precision, integrity, and sustainable financial growth for modern enterprises.</p>
      <div class="flex items-center gap-2 mt-5">
        <a href="tel:+917500208500" class="nav-call-btn text-xs px-4 py-2">
          <span class="call-dot"></span>
          <span class="material-symbols-outlined text-[14px] filled">call</span>
          Call Now
        </a>
      </div>
    </div>
    <div>
      <h4 class="text-[#F6C90E] text-xs font-semibold uppercase tracking-[0.18em] mb-5">Navigation</h4>
      <ul class="space-y-3 text-sm">
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="index.html">Home</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="services.html">Services</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="rvsf.html">RVSF Registration</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="about.html">About Us</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="tools.html">Online Tools</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="who_we_help.html">Who We Help</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="resources.html">Resources</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4 class="text-[#F6C90E] text-xs font-semibold uppercase tracking-[0.18em] mb-5">Legal</h4>
      <ul class="space-y-3 text-sm">
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="#">Privacy Policy</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="#">Terms of Service</a></li>
        <li><a class="text-slate-300 hover:text-[#F6C90E] transition-colors" href="#">Disclaimer</a></li>
      </ul>
    </div>
    <div>
      <h4 class="text-[#F6C90E] text-xs font-semibold uppercase tracking-[0.18em] mb-5">Contact</h4>
      <address class="not-italic space-y-3 text-sm text-slate-300">
        <p class="flex items-start gap-2">
          <span class="material-symbols-outlined text-[#F6C90E] text-[18px] mt-0.5 filled">location_on</span>
          Civil Lines, Muzaffarnagar, UP 251001
        </p>
        <p class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[#F6C90E] text-[18px] filled">mail</span>
          contact@msameerco.com
        </p>
        <p class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[#F6C90E] text-[18px] filled">call</span>
          +91 75002 08500
        </p>
      </address>
    </div>
  </div>
  <div class="border-t border-[rgba(255,255,255,0.1)] px-6 py-6 text-center flex flex-col items-center justify-center gap-1">
    <p class="text-slate-400 text-xs">© 2025 M Sameer &amp; Company. Chartered Accountants. FRN: 036430C · MRN: 476339</p>
    <p class="text-slate-500 text-[11px] mt-1">Copyright by <a href="https://tech-up-club.vercel.app/index.html" target="_blank" class="text-[#F6C90E] hover:text-white transition-colors underline decoration-[#F6C90E]/30 underline-offset-2">TechUp</a></p>
  </div>
</footer>
<a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="whatsapp-float left-float" aria-label="WhatsApp">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="w-8 h-8"/>
</a>
<a href="tel:${PHONE_NUMBER}" class="call-float right-float" aria-label="Call Us">
  <span class="material-symbols-outlined text-white text-3xl filled">call</span>
</a>`;
  }

  function initNavBehavior() {
    const nav     = document.getElementById("main-nav");
    const toggle  = document.getElementById("menu-toggle");
    const close   = document.getElementById("menu-close");
    const drawer  = document.getElementById("mobile-drawer");
    const overlay = document.getElementById("mobile-overlay");

    if (nav) {
      window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 40);
      });
    }

    function openMenu() {
      drawer?.classList.add("open");
      overlay?.classList.add("open");
      drawer?.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      drawer?.classList.remove("open");
      overlay?.classList.remove("open");
      drawer?.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    toggle?.addEventListener("click", openMenu);
    close?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);
    drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  function renderMarquee(id, items) {
    const el = document.getElementById(id);
    if (!el) return;
    const doubled = [...items, ...items];
    el.innerHTML = `<div class="marquee-wrap"><div class="marquee-track">${doubled
      .map((t) => `<span class="marquee-item">${t}<span class="marquee-dot">✦</span></span>`)
      .join("")}</div></div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();

    renderMarquee("marquee-trust", [
      "ICAI Certified CA",
      "FRN: 036430C",
      "MRN: 476339",
      "Freshly Qualified 2024",
      "100% Dedicated Service",
      "Muzaffarnagar · U.P.",
      "Transparent Pricing",
    ]);

    renderMarquee("marquee-services", [
      "RVSF Licensing",
      "Vehicle Scrapping Setup",
      "Income Tax Returns",
      "GST Registration & Filing",
      "Company Registration",
      "Tax Planning",
      "Audit & Assurance",
      "ROC Compliance",
      "TDS Management",
      "Business Advisory",
    ]);

    renderMarquee("marquee-industries", [
      "Small Businesses",
      "Startups & MSMEs",
      "Freelancers",
      "Traders",
      "Real Estate",
      "E-Commerce Sellers",
      "Salaried Individuals",
      "Partnership Firms",
    ]);

    // Typewriter effect - works on both mobile and desktop
    const twEls = [
      document.getElementById("typewriter"),
      document.getElementById("typewriter-desktop")
    ].filter(Boolean);

    if (twEls.length > 0) {
      const words = ["Sharper Results.", "Modern Solutions.", "Premium Advisory.", "RVSF Expertise.", "Trusted Partner."];
      let i = 0;
      let timer;
      function setAll(text) { twEls.forEach(el => el.innerHTML = text); }
      function typeWriter(word, index, cb) {
        if (index < word.length) {
          setAll(word.substring(0, index + 1));
          timer = setTimeout(() => typeWriter(word, index + 1, cb), 100);
        } else {
          timer = setTimeout(cb, 2000);
        }
      }
      function deleteWriter(word, index, cb) {
        if (index >= 0) {
          setAll(word.substring(0, index));
          timer = setTimeout(() => deleteWriter(word, index - 1, cb), 50);
        } else {
          timer = setTimeout(cb, 500);
        }
      }
      function loop() {
        typeWriter(words[i], 0, () => {
          deleteWriter(words[i], words[i].length, () => {
            i = (i + 1) % words.length;
            loop();
          });
        });
      }
      loop();
    }
  });
})();
