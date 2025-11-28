document.addEventListener("DOMContentLoaded", () => {

  const today = new Date();
  const dateElement = document.getElementById("todayDate");
  if (dateElement) dateElement.textContent = today.toDateString();


  const saved = localStorage.getItem("viewAllKey") || "";
  const viewAll = document.getElementById("viewAll");
  if (viewAll) viewAll.innerHTML = saved;
});

function checkReflection() {
  const name = document.getElementById("fname").value.trim();
  const reflection = document.getElementById("reflection").value.trim();
  const date = new Date().toDateString();

  if (reflection.length < 10) {
    alert("Reflection must be at least 10 characters long.");
    return false;
  }


  const entry = `
    <article class="journal-entry reflection-card">
      <h3>${name}</h3>
      <i>${date}</i>
      <p>${reflection}</p>
    </article>
  `;

  
  const existing = localStorage.getItem("viewAllKey") || "";
  localStorage.setItem("viewAllKey", entry + existing);

 
  const viewAll = document.getElementById("viewAll");
  if (viewAll) viewAll.innerHTML = localStorage.getItem("viewAllKey");

 
  document.getElementById("fname").value = "";
  document.getElementById("reflection").value = "";

  return false; 
}


function clearAll() {
  if (confirm("Are you sure you want to clear all reflections?")) {
    localStorage.removeItem("viewAllKey");
    const viewAll = document.getElementById("viewAll");
    if (viewAll) viewAll.innerHTML = "<p>All reflections cleared.</p>";
  }
}
