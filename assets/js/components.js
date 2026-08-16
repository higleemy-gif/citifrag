/* =============================================================
   CITIFRAG — Reusable Components
   Injects Header, Mobile Nav, Footer and Floating WhatsApp button
   on every page. Single source of truth — edit here, applies site-wide.
   ============================================================= */

(function () {
  "use strict";

  // ---- Shared config ----
  var WA_NUMBER = "919849019047"; // +91 98490 19047
  var WA_MESSAGE =
    "Hello Citifrag, I would like to know more about your products and business opportunities.";
  var WA_LINK =
    "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_MESSAGE);

  // Resolve asset paths relative to site root (all pages are at root level)
  var LOGO = "assets/img/logo.png";

  var NAV_LINKS = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Our Brands", href: "brands.html", key: "brands" },
    { label: "Capabilities", href: "capabilities.html", key: "capabilities" },
    { label: "Growth Journey", href: "growth-journey.html", key: "growth" },
    { label: "Cali Collaboration", href: "cali-collaboration.html", key: "cali" },
    { label: "Contact", href: "contact.html", key: "contact" }
  ];

  function currentKey() {
    return document.body.getAttribute("data-page") || "home";
  }

  // ---- Header ----
  function buildHeader() {
    var active = currentKey();
    var navItems = NAV_LINKS.map(function (l) {
      var cls = l.key === active ? ' class="active"' : "";
      return '<a href="' + l.href + '"' + cls + '>' + l.label + "</a>";
    }).join("");

    return (
      '<header class="site-header" id="siteHeader">' +
        '<div class="container">' +
          '<a class="brand" href="index.html" aria-label="Citifrag India — Home">' +
            '<img src="' + LOGO + '" alt="Citifrag India Private Limited" />' +
          "</a>" +
          '<nav class="nav" aria-label="Primary">' + navItems + "</nav>" +
          '<div class="header-actions">' +
            '<a class="btn btn--primary" href="contact.html">Business Enquiry</a>' +
            '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">' +
              "<span></span><span></span><span></span>" +
            "</button>" +
          "</div>" +
        "</div>" +
      "</header>"
    );
  }

  // ---- Mobile Nav ----
  function buildMobileNav() {
    var active = currentKey();
    var navItems = NAV_LINKS.map(function (l) {
      var cls = l.key === active ? ' class="active"' : "";
      return '<a href="' + l.href + '"' + cls + ">" + l.label + "</a>";
    }).join("");

    return (
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">' +
        navItems +
        '<a class="btn btn--gold" href="contact.html">Get in Touch</a>' +
        '<div class="m-contact">' +
          '<p>Marketing &amp; Business</p>' +
          '<a href="tel:+919849019047">+91 98490 19047</a> &nbsp;·&nbsp; ' +
          '<a href="tel:+917095760007">+91 70957 60007</a><br />' +
          '<a href="mailto:info@citifrag.com">info@citifrag.com</a>' +
        "</div>" +
      "</nav>"
    );
  }

  // ---- Footer ----
  function buildFooter() {
    var year = new Date().getFullYear();
    var quick = NAV_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '">' + l.label + "</a></li>";
    }).join("");

    return (
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="footer-top">' +
            '<div class="footer-brand">' +
              '<img src="' + LOGO + '" alt="Citifrag India Private Limited" />' +
              "<p>Citifrag India Private Limited crafts fragrance, wellness, beauty, cosmetics and herbal products rooted in Indian tradition and made to modern quality standards.</p>" +
              '<p class="footer-statement">Trust &amp; Relax</p>' +
            "</div>" +
            '<div class="footer-col">' +
              "<h5>Explore</h5>" +
              "<ul>" + quick + "</ul>" +
            "</div>" +
            '<div class="footer-col">' +
              "<h5>Reach Us</h5>" +
              "<ul>" +
                '<li><a href="mailto:info@citifrag.com">info@citifrag.com</a></li>' +
                '<li><a href="mailto:Career@citifrag.com">Career@citifrag.com</a></li>' +
                '<li><a href="tel:+919849019047">+91 98490 19047</a></li>' +
                '<li><a href="tel:+917095760007">+91 70957 60007</a></li>' +
                '<li><a href="' + WA_LINK + '" target="_blank" rel="noopener">WhatsApp Enquiry</a></li>' +
              "</ul>" +
            "</div>" +
            '<div class="footer-col">' +
              "<h5>Corporate Office</h5>" +
              "<p>Mauryansh Elanza, Shyamal Cross Road, Near Parekh&rsquo;s Hospital, 132 Feet Ring Road, Satellite, Ahmedabad, Gujarat &ndash; 380015</p>" +
            "</div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<p>&copy; " + year + " Citifrag India Private Limited. All rights reserved.</p>" +
            '<p>Imagery: incense sticks &mdash; <a href="https://www.flickr.com/photos/meanestindian/411558217/" target="_blank" rel="noopener">Meanest Indian</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" rel="noopener">CC BY 2.0</a></p>' +
            "<p>ISO 9001:2015 Certified &nbsp;·&nbsp; Established 2021</p>" +
          "</div>" +
        "</div>" +
      "</footer>"
    );
  }

  // ---- Floating WhatsApp ----
  function buildWhatsApp() {
    return (
      '<a class="wa-float" href="' + WA_LINK + '" target="_blank" rel="noopener" aria-label="Chat with Citifrag on WhatsApp">' +
        '<span class="wa-float__icon">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5a.5.5 0 0 0 0-.5L8.8 6.4c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.8.4A3.2 3.2 0 0 0 5.8 8.6c0 1.4 1 2.8 1.2 3s2 3.1 5 4.3c1.8.8 2.5.9 3.4.7.5-.1 1.7-.7 2-1.4a2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z"/>' +
          "</svg>" +
        "</span>" +
        '<span class="wa-float__label">Chat with us</span>' +
      "</a>"
    );
  }

  // ---- Inject on DOM ready ----
  function inject() {
    var headerMount = document.getElementById("header-root");
    var footerMount = document.getElementById("footer-root");

    if (headerMount) {
      headerMount.innerHTML = buildHeader() + buildMobileNav();
    }
    if (footerMount) {
      footerMount.innerHTML = buildFooter();
    }

    // WhatsApp appended to body once
    if (!document.querySelector(".wa-float")) {
      var wa = document.createElement("div");
      wa.innerHTML = buildWhatsApp();
      document.body.appendChild(wa.firstChild);
    }

    initHeaderBehavior();
  }

  // ---- Header interactions ----
  function initHeaderBehavior() {
    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var mobileNav = document.getElementById("mobileNav");

    // Scroll shrink
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 24) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Mobile menu toggle
    if (toggle && mobileNav) {
      var setState = function (open) {
        toggle.classList.toggle("open", open);
        mobileNav.classList.toggle("open", open);
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
      toggle.addEventListener("click", function () {
        setState(!mobileNav.classList.contains("open"));
      });
      mobileNav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setState(false); });
      });
      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setState(false);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
