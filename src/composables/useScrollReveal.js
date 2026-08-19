export function useScrollReveal() {
  let observer;

  function start() {
    const items = document.querySelectorAll("[data-aos]");
    if (!items.length || typeof IntersectionObserver === "undefined") return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("aos-animate", entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => {
      const delay = el.getAttribute("data-aos-delay");
      if (delay) el.style.transitionDelay = `${delay}ms`;
      observer.observe(el);
    });
  }

  function stop() {
    observer?.disconnect();
  }

  return { start, stop };
}
