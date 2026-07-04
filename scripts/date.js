const yearEl = document.getElementById("currentyear");
const lastModifiedEl = document.getElementById("lastModified");

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}