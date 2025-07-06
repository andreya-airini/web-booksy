import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  
  modules: [Navigation, Pagination, Scrollbar],
  speed: 350,
  slidesPerView: 'auto',
  spaceBetween: 16,
  keyboard: { enabled: true, onlyInViewport: true },             
  watchOverflow: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.feedback .swiper-pagination',
    type: 'bullets',        
    clickable: true,         
    bulletClass: 'custom-bullet',          
    bulletActiveClass: 'custom-bullet-active'
  },
  breakpoints: {                                                
    768: {            
      slidesPerView: 'auto',
      spaceBetween: 24,
    },
    1440: {           
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});