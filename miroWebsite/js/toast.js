export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `
    px-5 py-3 rounded-md text-white font-medium shadow-lg transition-all duration-300
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
  `;
  toast.textContent = message;

  const container = document.getElementById("toast-container");
  if (container) {
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 4000);
  }
}
