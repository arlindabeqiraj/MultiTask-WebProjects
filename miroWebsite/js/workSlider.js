const workImages = ["img/sl1.png", "img/sl2.png", "img/sl3.png"];
let index = 0;

function renderImages(slider) {
  slider.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const imgIndex = (index + i) % workImages.length;
    const img = document.createElement("img");
    img.src = workImages[imgIndex];
    img.className =
      "rounded-[20px] object-cover transition-all duration-500 " +
      (i === 1 ? "w-52 h-80 shadow-lg" : "w-48 h-72");
    slider.appendChild(img);
  }
}

export function initWorkSlider() {
  const slider = document.getElementById("workSlider");
  if (!slider) return;

  renderImages(slider);

  setInterval(() => {
    index = (index + 1) % workImages.length;
    renderImages(slider);
  }, 3000);
}
