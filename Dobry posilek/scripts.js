document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".why-item");

  items.forEach(item => {
    const toggle = item.querySelector(".why-item__toggle");
    const arrow = item.querySelector(".why-item__arrow");
    const panel = item.querySelector(".why-item__panel");

    // jeśli startuje otwarty
    if (item.classList.contains("why-item--open")) {
      arrow.textContent = "↓";

      // najpierw ustaw padding (CSS zrobi to automatycznie)
      requestAnimationFrame(() => {
        // dopiero teraz mierzymy scrollHeight
        panel.style.maxHeight = panel.scrollHeight + "px";
      });
    }

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("why-item--open");

      if (isOpen) {
        // ZAMYKANIE
        item.classList.remove("why-item--open");
        arrow.textContent = "→";

        // wracamy do 15px, NIE do 0
        panel.style.maxHeight = "15px";
      } else {
        // OTWIERANIE
        item.classList.add("why-item--open");
        arrow.textContent = "↓";

        // czekamy jedną klatkę, aż padding się ustawi
        requestAnimationFrame(() => {
          panel.style.maxHeight = panel.scrollHeight + "px";
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const images = [...document.querySelectorAll(".poll__lightbox-trigger")];
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox__arrow lightbox__arrow--left">‹</span>
    <img class="lightbox__img">
    <span class="lightbox__arrow lightbox__arrow--right">›</span>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox__img");
  const arrowLeft = lightbox.querySelector(".lightbox__arrow--left");
  const arrowRight = lightbox.querySelector(".lightbox__arrow--right");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].href;
    lightbox.classList.add("lightbox--open");
  }

  function closeLightbox() {
    lightbox.classList.remove("lightbox--open");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].href;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].href;
  }

  images.forEach((link, index) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  arrowLeft.addEventListener("click", showPrev);
  arrowRight.addEventListener("click", showNext);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("lightbox--open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-active");

      // ZWIJANIE WSZYSTKICH INNYCH (opcjonalne)
      // faqItems.forEach(i => {
      //   if (i !== item) closeItem(i);
      // });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });

    function openItem(el) {
      const ans = el.querySelector(".faq__answer");

      el.classList.add("is-active");

      ans.style.display = "block";
      const height = ans.scrollHeight + "px";

      ans.style.maxHeight = height;
      ans.style.opacity = "1";
    }

    function closeItem(el) {
      const ans = el.querySelector(".faq__answer");

      el.classList.remove("is-active");

      ans.style.maxHeight = "0px";
      ans.style.opacity = "0";

      setTimeout(() => {
        if (!el.classList.contains("is-active")) {
          ans.style.display = "none";
        }
      }, 400);
    }
  });
});