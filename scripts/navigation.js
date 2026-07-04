const menuButton = document.getElementById('menu');
const navList = document.getElementById('nav-list');

if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
        navList.classList.toggle('hidden');
        menuButton.textContent = navList.classList.contains('hidden') ? '☰' : '✖';
    });
}