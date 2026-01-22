const navHTML = `
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/journal">Journal</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/about">About</a></li>
    <li class="toggle-item">
      <button id="theme-toggle">Toggle Theme</button>
    </li>
  </ul>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Dynamic navigation
  const headerNav = document.querySelector("header nav");
  if (headerNav) headerNav.innerHTML = navHTML;

  // Active page highlight
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Theme toggle logic
  const themeToggle = document.getElementById("theme-toggle");

  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Light Mode";
  } else {
    themeToggle.textContent = "Dark Mode";
  }

  themeToggle.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark-mode");
    themeToggle.textContent = darkModeEnabled ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", darkModeEnabled ? "dark" : "light");
  });
});

const dateEl = document.getElementById("date");
if (dateEl) dateEl.textContent = new Date().toLocaleString();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/static/js/sw.js")
    .then(() => console.log("Service Worker Registered"));
}

// ----- EXTRA FEATURE: Offline/Online banner -----
function createConnectionBanner() {
  const banner = document.createElement("div");
  banner.id = "connection-banner";
  banner.style.position = "fixed";
  banner.style.bottom = "0";
  banner.style.left = "0";
  banner.style.right = "0";
  banner.style.padding = "10px";
  banner.style.textAlign = "center";
  banner.style.fontWeight = "bold";
  banner.style.display = "none";
  banner.style.zIndex = "9999";
  document.body.appendChild(banner);
  return banner;
}

const banner = createConnectionBanner();

function showBanner(message, isOffline) {
  banner.textContent = message;
  banner.style.background = isOffline ? "#ffdddd" : "#ddffdd";
  banner.style.color = "#000";
  banner.style.display = "block";

  // auto-hide when back online
  if (!isOffline) {
    setTimeout(() => (banner.style.display = "none"), 2500);
  }
}

// initial state
if (!navigator.onLine) showBanner("You are offline. Cached content is available.", true);

// listen for changes
window.addEventListener("offline", () => showBanner("You are offline. Some features may be limited.", true));
window.addEventListener("online", () => showBanner("Back online! Content is up to date.", false));

//canvas script
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sketchCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "#2f3d58";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
    ctx.closePath();
  });

  document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
