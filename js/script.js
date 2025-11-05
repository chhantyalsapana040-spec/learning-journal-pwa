const navHTML = `
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="journal.html">Journal</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
`;

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header nav");
  if (header) header.innerHTML = navHTML;

  
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});