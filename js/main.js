const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
if (navToggle && nav) {
  // Enable the collapsible menu only when its controls are available.
  document.documentElement.classList.add("nav-enhanced");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    navToggle.textContent = open ? "Close" : "Menu";
  };
  navToggle.addEventListener("click", () =>
    setOpen(!nav.classList.contains("is-open")),
  );
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      navToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setOpen(false);
  });
  matchMedia("(min-width: 821px)").addEventListener("change", () =>
    setOpen(false),
  );
}

// Content remains visible when JavaScript fails or is disabled.
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

const form = document.querySelector("[data-contact-form]");
if (form) {
  const status = document.querySelector("[data-contact-status]");
  const requestText = () => {
    const fields = new FormData(form);
    const labels = {
      name: "Name",
      email: "Work email",
      company_project: "Company / project",
      workflow: "Workflow to improve",
      current: "How it is handled today",
      timeline: "Desired timeline",
      budget: "Budget range",
    };
    return Object.entries(labels)
      .map(
        ([key, label]) =>
          `${label}: ${String(fields.get(key) || "").trim() || "Not specified"}`,
      )
      .join("\n\n");
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      "Operational tool enquiry — Lyan Studio",
    );
    const body = encodeURIComponent(requestText());
    window.location.href = `mailto:hello@lyanstudio.com?subject=${subject}&body=${body}`;
    status.textContent =
      "Your email app has been requested. Review and send the message there. If it does not open, copy your request and email hello@lyanstudio.com.";
  });
  document
    .querySelector("[data-copy-request]")
    .addEventListener("click", async () => {
      if (!form.reportValidity()) return;
      try {
        await navigator.clipboard.writeText(requestText());
        status.textContent =
          "Request copied. Paste it into an email to hello@lyanstudio.com.";
      } catch {
        status.textContent =
          "Copy is unavailable in this browser. You can select your details and email hello@lyanstudio.com directly.";
      }
    });
}
