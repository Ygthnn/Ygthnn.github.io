// Header toggle logic
const headerToggleBtn = document.querySelector('.header-toggle');

function headerToggle() {
  document.querySelector('#header').classList.toggle('header-show');
  headerToggleBtn.classList.toggle('bi-list');
  headerToggleBtn.classList.toggle('bi-x');
}

if (headerToggleBtn) {
  headerToggleBtn.addEventListener('click', headerToggle);
}