const navHTML = `
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="journal.html">Journal</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="about.html">About</a></li>
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

//form validation API
function checkReflection() {
  let reflection = document.getElementById("reflection");

  if (!reflection.checkValidity()) {
    alert("Reflection must be at least 10 characters.");
    return false;
  } else {
    alert("Reflection saved successfully!");
    saveReflection();
    return false; 
  }
}

