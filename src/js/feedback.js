import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Now you can use Swiper
const swiper = new Swiper('.swiper', {
  
  // Install modules
  modules: [Navigation, Pagination, Scrollbar],
  speed: 350,
  slidesPerView: 'auto',
  spaceBetween: 16,
  keyboard: { enabled: true, onlyInViewport: true },                /* ★ */
  watchOverflow: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',         // тип пагінації — буліти (крапки)
    clickable: true,         // крапки клікабельні
    bulletClass: 'custom-bullet',             // клас для крапки
    bulletActiveClass: 'custom-bullet-active' // клас для активної крапки
  },
  breakpoints: {                                                    /* ★ */
    768: {            // планшет
      slidesPerView: 'auto',
      spaceBetween: 24,
    },
    1440: {           // десктоп
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});