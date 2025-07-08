const scrollButton = document.querySelector('.scroll-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});

scrollButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});