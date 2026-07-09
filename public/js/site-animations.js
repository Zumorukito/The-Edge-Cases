// Adds scroll reveal animation to main website sections and cards

document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(`
    .section-heading,
    .feature-card,
    .step-card,
    .service-card,
    .split-left,
    .split-right,
    .demo-preview-card,
    .cta-card,
    .form-card,
    .summary-card,
    .success-card,
    .receipt-card
  `);

  animatedItems.forEach((item) => {
    item.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    animatedItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    animatedItems.forEach((item) => {
      item.classList.add("show");
    });
  }

  const livePreview = document.querySelector(".live-chat-preview");
  if (livePreview) {
    window.setTimeout(() => {
      livePreview.classList.add("is-active");
    }, 200);
  }
});