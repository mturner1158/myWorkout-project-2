const HOME_URL = "/myWorkout-project-2/";
const SECONDS = 10;


// starts a countdown of 10 seconds on apge load
function startRedirectCountdown(seconds, url) {
  const display = document.getElementById("countdown");
  let remaining = seconds;
  display.textContent = remaining;

  const timer = setInterval(() => {
    remaining -= 1;
    display.textContent = remaining;

    if (remaining <= 0) {
      clearInterval(timer);
      window.location.replace(url);
    }
  }, 1000);

  return timer;
}

// event listener for when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const timer = startRedirectCountdown(SECONDS, HOME_URL);

  document.getElementById("back-button").addEventListener("click", () => {
    history.back();
  });

  document.getElementById("cancel-redirect").addEventListener("click", () => {
    clearInterval(timer);
    document.getElementById("redirect-message").textContent =
      "Automatic redirect cancelled.";
    document.getElementById("cancel-redirect").remove();
  });
});
