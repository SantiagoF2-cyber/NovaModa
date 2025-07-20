document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.querySelector(".splide");

  if (galeria) {
    const splide = new Splide(galeria, {
      type: "loop",
      perPage: 1,
      autoplay: true,
      interval: 2500,
      pauseOnHover: true,
      rewind: true,
    });

    splide.mount();
  }

  const hero = document.querySelector(".hero");
  const texto = hero?.querySelector(".hero-texto");
  const h1 = texto?.querySelector("h1");
  const p = texto?.querySelector("p");
  const btn = texto?.querySelector(".btn");

  if (hero && texto && h1 && p && btn) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const method = entry.isIntersecting ? "add" : "remove";
          [texto, h1, p, btn].forEach((el) => el.classList[method]("animate"));
        });
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(hero);
  }

  const typeTarget = document.querySelector(".typewriter");

  if (typeTarget) {
    const originalText =
      typeTarget.textContent.trim() ||
      typeTarget.dataset.text?.trim() ||
      "Estilo urbano y minimalista";
    let isTyping = false;
    let hasTyped = false;

    const showText = () => {
      if (isTyping || hasTyped) return;
      isTyping = true;
      hasTyped = true;

      typeTarget.textContent = "";
      typeTarget.classList.add("typewriter-active");

      let i = 0;
      const interval = setInterval(() => {
        typeTarget.textContent += originalText.charAt(i);
        i++;
        if (i === originalText.length) {
          clearInterval(interval);
          isTyping = false;
        }
      }, 50);
    };

    const typeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showText();
          }
        });
      },
      { threshold: 0.1 }
    );

    typeObserver.observe(typeTarget);

    const rect = typeTarget.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(showText, 300);
    }
  }

  const fadeIns = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  fadeIns.forEach((el) => fadeObserver.observe(el));
});

const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
