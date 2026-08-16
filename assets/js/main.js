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

  // ---- Contact form (submits to Web3Forms, which emails each enquiry) ----
  function initContactForm() {
    var form = document.getElementById("enquiryForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");
    var error = document.getElementById("formError");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.textContent : "";

    function hideMessages() {
      if (success) success.classList.remove("show");
      if (error) error.classList.remove("show");
    }

    function showError() {
      if (error) {
        error.classList.add("show");
        error.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideMessages();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.success) {
            if (success) {
              success.classList.add("show");
              success.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            form.reset();
          } else {
            showError();
          }
        })
        .catch(function () {
          showError();
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
    });
  }

  // ---- Auto year in any [data-year] element ----
  function initYearRanges() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

})();
