const siteConfig = {
  celebrantName: "Meilani",
  senderName: "Orang Spesial",
  heroMessage:
    "Semoga tahun ini datang dengan lebih banyak tawa, hati yang tenang, rezeki yang baik, dan orang-orang yang tulus di sekeliling kamu. Web ini sengaja dibuat beralur, biar rasanya kayak buka hadiah pelan-pelan.",
  spotlightNote: "yang nyiapin halaman kecil ini buat bikin hari kamu terasa lebih spesial.",
  videoTitle: "Video singkat buat nemenin hari ulang tahunmu",
  videoMessage:
    "Kalau videonya belum muncul, cukup taruh file MP4 kamu di folder assets/videos. Setelah itu Vercel bakal langsung serve file-nya seperti halaman biasa.",
  closingMessage:
    "Semoga semua doa baik yang diam-diam kamu simpan bisa ketemu jalannya satu per satu. Tetap sehat, tetap lucu, dan tetap jadi versi diri kamu yang paling hangat. Selamat ulang tahun.",
  whatsappNumber: "6281234567890",
  eventChips: [
    "Mode ultah: aktif",
    "Boleh senyum seharian",
    "Wajib lihat sampai akhir"
  ],
  tickerText: "Happy Birthday",
  photoItems: [
    { src: "./assets/photos/photo-1.jpg", caption: "Foto Utama" },
    { src: "./assets/photos/photo-2.jpg", caption: "Senyum Manis" },
    { src: "./assets/photos/photo-3.jpg", caption: "Momen Favorit" },
    { src: "./assets/photos/photo-4.jpg", caption: "Aura Spesial" },
    { src: "./assets/photos/photo-5.jpg", caption: "Hari Bahagia" },
    { src: "./assets/photos/photo-6.jpg", caption: "Penutup Galeri" }
  ],
  messageCards: [
    "Semoga hari-hari kamu tahun ini lebih ringan, lebih penuh kabar baik, dan lebih banyak alasan buat tersenyum.",
    "Semoga semua target yang lagi kamu kejar pelan-pelan datang ke tangan yang tepat, di waktu yang tepat.",
    "Semoga kamu selalu dikelilingi orang yang jujur, tulus, dan benar-benar pengin lihat kamu bahagia."
  ]
};

const steps = [
  { id: 1, label: "Buka Kado" },
  { id: 2, label: "Ucapan" },
  { id: 3, label: "Video" },
  { id: 4, label: "Foto" },
  { id: 5, label: "Penutup" }
];

const confettiColors = ["#ff6b57", "#ffb347", "#4ecdc4", "#ffd166", "#f78fb3", "#ffffff"];
const sparkleSymbols = ["*", "+", ".", "o", "*"];

const progressNav = document.getElementById("progress-nav");
const tickerTrack = document.getElementById("ticker-track");
const sparkleLayer = document.getElementById("sparkle-layer");
const confettiLayer = document.getElementById("confetti-layer");
const giftBox = document.getElementById("gift-box");
const videoElement = document.getElementById("birthday-video");
const videoShell = videoElement.closest(".video-shell");
const videoFallback = document.getElementById("video-fallback");
const galleryGrid = document.getElementById("gallery-grid");
const messageStack = document.getElementById("message-stack");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const soundToggle = document.getElementById("sound-toggle");
const soundLabel = document.getElementById("sound-label");
const soundIcon = document.getElementById("sound-icon");
const birthdayAudio = document.getElementById("birthday-audio");
const spotlightPhoto = document.getElementById("spotlight-photo");
const candleButton = document.getElementById("candle-button");
const candleFlame = document.getElementById("candle-flame");
const cakeNote = document.getElementById("cake-note");
const closingActions = document.getElementById("closing-actions");
const burstButton = document.getElementById("burst-button");

let currentStep = 1;
let isMusicPlaying = false;

function applyContent() {
  document.title = `Selamat Ulang Tahun ${siteConfig.celebrantName}`;
  document.getElementById("hero-name-step1").textContent = siteConfig.celebrantName;
  document.getElementById("hero-name-step2").textContent = siteConfig.celebrantName;
  document.getElementById("step1-copy").textContent =
    `Hari ini ada web kecil yang isinya doa, foto, video, dan sedikit keributan lucu buat ${siteConfig.celebrantName}.`;
  document.getElementById("hero-message").textContent = siteConfig.heroMessage;
  document.getElementById("from-name").textContent = siteConfig.senderName;
  document.getElementById("spotlight-note").textContent = siteConfig.spotlightNote;
  document.getElementById("video-title").textContent = siteConfig.videoTitle;
  document.getElementById("video-message").textContent = siteConfig.videoMessage;
  document.getElementById("closing-message").textContent = siteConfig.closingMessage;
  document.getElementById("wa-link").href = `https://wa.me/${siteConfig.whatsappNumber}`;
}

function renderTicker() {
  const items = Array.from({ length: 8 }, () => {
    return `<span>HAPPY BIRTHDAY ${siteConfig.celebrantName} ${siteConfig.tickerText}</span>`;
  });
  tickerTrack.innerHTML = items.join("");
}

function renderProgress() {
  progressNav.innerHTML = steps
    .map((step) => {
      return `
        <button
          class="progress-pill ${step.id === currentStep ? "active" : ""}"
          type="button"
          data-step="${step.id}"
        >
          ${step.id}. ${step.label}
        </button>
      `;
    })
    .join("");
}

function renderChips() {
  const chipRow = document.getElementById("event-chips");
  chipRow.innerHTML = siteConfig.eventChips
    .map((chip) => `<span class="chip">${chip}</span>`)
    .join("");
}

function renderGallery() {
  galleryGrid.innerHTML = siteConfig.photoItems
    .map((item, index) => {
      return `
        <button
          class="gallery-item"
          type="button"
          data-caption="${item.caption}"
          data-src="${item.src}"
          aria-label="Buka foto ${index + 1}"
        >
          <img src="${item.src}" alt="${item.caption}">
          <span class="gallery-placeholder">
            Tambahkan file:
            <br>
            <code>${item.src.replace("./", "")}</code>
          </span>
        </button>
      `;
    })
    .join("");

  galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
    const image = item.querySelector("img");
    image.addEventListener("load", () => {
      item.classList.add("ready");
    });
    image.addEventListener("error", () => {
      item.classList.remove("ready");
    });
    if (image.complete && image.naturalWidth > 0) {
      item.classList.add("ready");
    }
    item.addEventListener("click", () => {
      if (item.classList.contains("ready")) {
        openLightbox(item.dataset.src, item.dataset.caption);
      }
    });
  });
}

function renderMessages() {
  messageStack.innerHTML = siteConfig.messageCards
    .map((message) => `<article class="message-card">${message}</article>`)
    .join("");
}

function fillSparkles() {
  for (let i = 0; i < 26; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = sparkleSymbols[i % sparkleSymbols.length];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${0.8 + Math.random() * 1.1}rem`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    sparkleLayer.appendChild(sparkle);
  }
}

function addConfettiBurst(amount = 36) {
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = confettiColors[i % confettiColors.length];
    piece.style.animationDuration = `${4 + Math.random() * 3.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 8000);
  }
}

function goToStep(stepId) {
  currentStep = stepId;
  document.querySelectorAll(".step").forEach((step) => step.classList.remove("active"));
  document.getElementById(`step-${stepId}`).classList.add("active");
  renderProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (stepId === 3) {
    videoElement.play().catch(() => {});
  } else {
    videoElement.pause();
  }
}

function handleSpotlightFallback() {
  spotlightPhoto.addEventListener("error", () => {
    spotlightPhoto.parentElement.classList.add("missing");
  });
  spotlightPhoto.addEventListener("load", () => {
    spotlightPhoto.parentElement.classList.remove("missing");
  });
  if (spotlightPhoto.complete && spotlightPhoto.naturalWidth > 0) {
    spotlightPhoto.parentElement.classList.remove("missing");
  }
}

function handleVideoFallback() {
  const markMissing = () => {
    videoShell.classList.add("missing");
    videoFallback.hidden = false;
  };

  videoElement.addEventListener("error", markMissing);
  const source = videoElement.querySelector("source");
  if (source) {
    source.addEventListener("error", markMissing);
  }
}

async function toggleMusic() {
  if (!birthdayAudio) {
    soundLabel.textContent = "Audio Tidak Ada";
    return;
  }

  if (isMusicPlaying) {
    birthdayAudio.pause();
    isMusicPlaying = false;
    soundIcon.textContent = "M";
    soundLabel.textContent = "Nyalakan Musik";
    return;
  }

  try {
    await birthdayAudio.play();
    isMusicPlaying = true;
    soundIcon.textContent = "II";
    soundLabel.textContent = "Pause Musik";
  } catch (error) {
    soundLabel.textContent = "Klik Lagi";
  }
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function closeLightbox() {
  if (lightbox.open) {
    lightbox.close();
  }
}

function blowCandle() {
  candleFlame.classList.add("off");
  cakeNote.textContent = "Doanya diaminkan. Tombol penutupnya sudah muncul di bawah.";
  closingActions.classList.remove("hidden");
  addConfettiBurst(90);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const nextButton = event.target.closest("[data-next]");
    const pillButton = event.target.closest("[data-step]");

    if (nextButton) {
      goToStep(Number(nextButton.dataset.next));
    }

    if (pillButton) {
      goToStep(Number(pillButton.dataset.step));
    }
  });

  giftBox.addEventListener("click", () => {
    giftBox.classList.add("open");
    addConfettiBurst(70);
    window.setTimeout(() => {
      goToStep(2);
    }, 850);
  });

  soundToggle.addEventListener("click", toggleMusic);
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  candleButton.addEventListener("click", blowCandle);
  burstButton.addEventListener("click", () => addConfettiBurst(120));

  birthdayAudio.addEventListener("error", () => {
    soundLabel.textContent = "Audio Belum Ada";
  });
}

applyContent();
renderTicker();
renderProgress();
renderChips();
renderGallery();
renderMessages();
fillSparkles();
handleSpotlightFallback();
handleVideoFallback();
bindEvents();
addConfettiBurst(42);
