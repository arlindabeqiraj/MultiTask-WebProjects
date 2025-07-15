export function showLoading(button, duration = 2000, callback) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<span class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>Loading...`;

  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalText;
    callback();
  }, duration);
}
