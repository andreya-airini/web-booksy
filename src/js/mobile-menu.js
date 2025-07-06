import { toggleMobileMenu } from './header';

const menuNav = document.querySelector('.mobile-nav');

menuNav.addEventListener('click', handleNavMenu);

function handleNavMenu(e) {
  if (e.target.className === 'nav-link') {
    console.log(e.target);
    toggleMobileMenu();
  }
}
