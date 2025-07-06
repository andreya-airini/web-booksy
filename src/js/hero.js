import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const heroSwiper = new Swiper('.hero-main-slider', { 
  modules: [Navigation], 
  loop: false,
  speed: 300,
  slidesPerView: 1,
  keyboard: { enabled: true, onlyInViewport: true },
  watchOverflow: true,
    navigation: {
    nextEl: '.swiper-button-hero-next', 
    prevEl: '.swiper-button-hero-prev', 
  },
  
  breakpoints: {
    768: {
      slidesPerView: 1,
        },
    1440: {
      slidesPerView: 1,       
    },
  },
});