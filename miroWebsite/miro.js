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

// --- Exercise 2: Loading Spinner on Button Click ---
function showLoading(button, duration = 3000) {
  const originalText = button.innerHTML;

  // Zëvendëson tekstin me spinner
  button.innerHTML = `<span class="spinner"></span>`;
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, duration);
}

// Testim manual për butonin "Sign up free →"
document.addEventListener("DOMContentLoaded", () => {
  const testBtn = document.querySelector(".email-form button");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      showLoading(testBtn);
    });
  }
});
