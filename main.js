const progressBars = document.querySelectorAll(".card__progress-bar span");

progressBars.forEach((bar) => {
  const targetWidth = bar.dataset.width || "68%";
  bar.style.width = "0%";
  requestAnimationFrame(() => {
    bar.style.transition = "width 1.6s ease";
    bar.style.width = targetWidth;
  });
});
