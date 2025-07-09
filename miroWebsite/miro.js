// ---  Toast popup ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `
    px-5 py-3 rounded-md text-white font-medium shadow-lg transition-all duration-300
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
  `;
  toast.textContent = message;

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 4000);
}

// --- Loading Spinner ---
function showLoading(button, duration = 2000, callback) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<span class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>Loading...`;

  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalText;
    callback();
  }, duration);
}

// --- Sign up flow ---
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("input[type='email']");
  const signUpBtn =
    document.querySelector("button[type='submit']") ||
    document.querySelector("button");

  if (emailInput && signUpBtn) {
    signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      showLoading(signUpBtn, 2500, () => {
        if (isValidEmail(email)) {
          showToast("Registration successful!", "success");
        } else {
          showToast("Invalid email address.", "error");
        }
      });
    });
  }
});

// --- Company logos slider ---
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companySlider");
  const gap = 40;
  const visibleSlides = 6;
  let currentIndex = 0;

  const logos = Array.from(track.children);
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });

  const getSlideWidth = () => {
    const logo = track.querySelector("img");
    const logoWidth = logo.getBoundingClientRect().width;
    return logoWidth + gap;
  };

  const updateSlider = (instant = false) => {
    const slideWidth = getSlideWidth();
    const translateX = -(slideWidth * currentIndex);
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
});
