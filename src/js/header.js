const menuBtn = document.querySelectorAll('.mobile-menu-btn');
const menu = document.querySelector('.mobile-menu');

menuBtn.forEach(btn => btn.addEventListener('click', toggleMobileMenu));

export function toggleMobileMenu() {
  document.body.classList.toggle('no-scroll');
  menu.classList.toggle('is-open');
}
