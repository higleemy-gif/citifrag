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

  // ---- Contact form ----
  // Submits natively (full-page POST) to FormSubmit, which emails each enquiry
  // to the admin and then redirects the visitor to thank-you.html. Using a real
  // form POST (not fetch/AJAX) means FormSubmit's one-time activation page is
  // shown in the browser on the first submit, so setup can be completed easily.
  function initContactForm() {
    var form = document.getElementById("enquiryForm");
    if (!form) return;
    var submitBtn = form.querySelector('button[type="submit"]');

    // Redirect back to a thank-you page on whatever origin the site runs on
    // (localhost during testing, the real domain once deployed).
    var nextField = form.querySelector('input[name="_next"]');
    if (nextField && window.location.origin && window.location.origin.indexOf("http") === 0) {
      nextField.value = window.location.origin + "/thank-you.html";
    }

    form.addEventListener("submit", function (e) {
      // Native HTML5 validation (required fields, email format)
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      // Let the browser perform the real submission; just show progress.
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
    });
  }

  // ---- Auto year in any [data-year] element ----
  function initYearRanges() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

})();
