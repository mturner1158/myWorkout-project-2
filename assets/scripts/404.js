/* Button returns user to home page */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("back-button").addEventListener("click", () => {
    if (history.length > 1) history.back();
    else window.location.assign("/myWorkout-project-2/");
  });
});
