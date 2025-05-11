function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton(isDarkMode);
}

function updateDarkModeButton(isDarkMode) {
    const button = document.getElementById('darkModeToggle');
    const icon = button.querySelector('i');
    if (isDarkMode) {
        icon.classList.replace('fa-moon', 'fa-sun');
        button.querySelector('span').textContent = ' Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        button.querySelector('span').textContent = ' Dark Mode';
    }
}

function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButton(isDarkMode);
}

document.addEventListener('DOMContentLoaded', initDarkMode);
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);