import { showToast } from "./toast.js";
import { showLoading } from "./loading.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function initSignUp() {
  const buttons = Array.from(document.querySelectorAll("button, a")).filter(
    (el) => el.textContent.trim().toLowerCase().includes("sign up free")
  );

  buttons.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const container = el.closest("div");
      const emailInput = container?.querySelector("input[type='email']");
      const email = emailInput?.value.trim();

      showLoading(el, 2000, () => {
        if (!emailInput) {
          showToast("Redirecting...", "success");
          return;
        }

        if (isValidEmail(email)) {
          showToast("Registration successful!", "success");
        } else {
          showToast("Invalid email address.", "error");
        }
      });
    });
  });
}
