export function initLogoSlider() {
  const track = document.getElementById("companySlider");
  if (!track) return;

  const gap = 40;
  const visibleSlides = 6;
  let currentIndex = 0;

  const logoSources = Array.from(
    { length: 20 },
    (_, i) => `img/logo${i + 1}.png`
  );

  logoSources.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = index + 1;
    img.className =
      "w-[140px] h-[60px] object-contain flex-shrink-0 opacity-90";

    track.appendChild(img);
  });

  const logos = Array.from(track.children);
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });

  const slideWidth = () => {
    const logo = track.querySelector("img");
    return logo ? logo.getBoundingClientRect().width + gap : 0;
  };

  const updateSlider = (instant = false) => {
    const translateX = -(slideWidth() * currentIndex);
    track.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${translateX}px)`;
  };

  const slideRight = () => {
    const total = track.children.length;
    const half = total / 2;

    currentIndex++;
    updateSlider();

    if (currentIndex >= half) {
      setTimeout(() => {
        currentIndex = 0;
        updateSlider(true);
      }, 500);
    }
  };

  setInterval(slideRight, 3000);
}
