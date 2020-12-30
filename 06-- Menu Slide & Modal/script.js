const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle Nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// Show Modal
open.addEventListener("click", () => modal.classList.add("show-modal"));

// Close Modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

//hide Modal On OutSide Click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
