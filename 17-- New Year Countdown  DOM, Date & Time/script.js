const days = document.getElementById("days"),
  hours = document.getElementById("hours"),
  minutes = document.getElementById("minutes"),
  seconds = document.getElementById("seconds"),
  countdown = document.getElementById("countdown"),
  loading = document.getElementById("loading"),
  year = document.getElementById("year");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`january 01 ${currentYear + 1} 00:00:00`);

// Set Background Year
year.innerText = currentYear + 1;

// Update countdown Time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  // Add value to DOM
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
}

// Show Spinner before countdoun

setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// Run Every second
setInterval(updateCountdown, 1000);
