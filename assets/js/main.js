/* =============================================================
   CITIFRAG — Interactions
   Scroll reveal, accordion, contact form (client-side confirm).
   ============================================================= */

(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initReveal();
    initAccordion();
    initContactForm();
    initYearRanges();
  });

  // ---- Scroll reveal ----
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- Accordion ----
  function initAccordion() {
    var items = document.querySelectorAll(".accordion-item");
    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion-trigger");
      var panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        // close siblings within same accordion
        var parent = item.closest(".accordion");
        if (parent) {
          parent.querySelectorAll(".accordion-item.open").forEach(function (o) {
            if (o !== item) {
              o.classList.remove("open");
              var p = o.querySelector(".accordion-panel");
              if (p) p.style.maxHeight = null;
            }
          });
        }
        item.classList.toggle("open", !isOpen);
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
      });
    });
  }

  // ---- Contact form (front-end confirmation only; no backend invented) ----
  function initContactForm() {
    var form = document.getElementById("enquiryForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  // ---- Auto year in any [data-year] element ----
  function initYearRanges() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

})();
