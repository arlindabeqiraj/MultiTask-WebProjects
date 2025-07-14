import { initSignUp } from "./signup.js";
import { initLogoSlider } from "./logoSlider.js";
import { initLogoPopup } from "./logoPopup.js";
import { initTestimonialSort } from "./testimonials.js";
import { initReviewForm } from "./review.js";
import { initTabs } from "./tabs.js";
import { initWorkSlider } from "./workSlider.js";

document.addEventListener("DOMContentLoaded", () => {
  initSignUp();
  initLogoSlider();
  initLogoPopup();
  initTestimonialSort();
  initReviewForm();
  initTabs();
  initWorkSlider();
});
