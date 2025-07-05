import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';



document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.slider-controls .next',
      prevEl: '.slider-controls .prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  }
  ); console.log(document.querySelector('.swiper-container'));
});

