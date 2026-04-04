async function loadPartials() {
  const header = await fetch("/partials/header.html").then(res => res.text());
  const footer = await fetch("/partials/footer.html").then(res => res.text());

  document.getElementById("header").innerHTML = header;
  document.getElementById("footer").innerHTML = footer;
  renderUserMenu();
}
const dropdownToggle = document.getElementById("vehiclesDropdown");
const dropdownMenu = document.getElementById("vehiclesMenu");

if (dropdownToggle && dropdownMenu) {
  dropdownToggle.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdownMenu.classList.remove("show");
    }
  });
}

function renderUserMenu() {
  const userMenu = document.getElementById("user-menu");
  if (!userMenu) return;

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (token) {
    userMenu.innerHTML = `
      <span>Welcome, ${username || "User"}</span>
      <a href="#" id="logout-btn">Logout</a>
    `;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        location.reload();
      });
    }
  } else {
    userMenu.innerHTML = `
      <a href="/login.html">Login</a>
      <a href="/register.html">Register</a>
    `;
  }
}

// Run once when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
});