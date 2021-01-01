const main = document.querySelector("main"),
  voicesSelect = document.getElementById("voices"),
  textarea = document.getElementById("text"),
  readBtn = document.getElementById("read"),
  toggleBtn = document.getElementById("toggle"),
  closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add Active To box Active
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Init Speech Synth
const message = new SpeechSynthesisUtterance();

// Store Voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak Text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices Chnaged
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle Text Box
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

// Close Text btn
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text Button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
