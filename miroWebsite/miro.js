// --- Exercise 1: Toast popup ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 4000);
}

// --- Exercise 2: Loading Spinner ---
function showLoading(button, duration = 3000, callback = null) {
  const originalText = button.innerHTML;
  button.innerHTML = `<span class="spinner"></span>`;
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;

    if (typeof callback === "function") {
      callback();
    }
  }, duration);
}

// --- Exercise 3: Sign up flow ---
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector(".email-form input");
  const signUpBtn = document.querySelector(".email-form button");

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

// Exercise 4: Company logos slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companySlider");
  const logos = track.querySelectorAll("img");
  const logoCount = logos.length;
  const gap = 40;

  let currentIndex = 0;
  const visibleCount = 5;
  const slideInterval = 3000;

  const slideWidth = logos[0].offsetWidth + gap;

  function updateSlider() {
    const translateX = -(slideWidth * currentIndex);
    track.style.transform = `translateX(${translateX}px)`;
  }

  function slideRight() {
    currentIndex++;
    if (currentIndex > logoCount - visibleCount) {
      currentIndex = 0;
    }
    updateSlider();
  }

  function slideLeft() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = logoCount - visibleCount;
    }
    updateSlider();
  }

  // Auto slide
  setInterval(() => {
    slideRight();
  }, slideInterval);

  // Eksporto funksionet për butonat
  window.slideLeft = slideLeft;
  window.slideRight = slideRight;
});
