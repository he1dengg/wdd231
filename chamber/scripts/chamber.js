const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.querySelector("span").textContent = isOpen ? "✕" : "☰";
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.matches("a") && navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.querySelector("span").textContent = "☰";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 700 && navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.querySelector("span").textContent = "☰";
    }
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last modified: ${document.lastModified}`;
}
