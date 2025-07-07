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
