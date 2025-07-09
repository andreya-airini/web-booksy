import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.subscribe-form');
  
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const emailInput = form.elements.email;
      const email = emailInput.value.trim();
  
      // 🔍 Порожнє поле
      if (!email) {
        iziToast.error({
          title: 'Error',
          message: 'Please enter your email address.',
          position: 'topRight',
          timeout: 3000,
        });
        return;
      }
  
      // 🔍 Невірний формат
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        iziToast.error({
          title: 'Invalid Email',
          message: 'Please enter a valid email address.',
          position: 'topRight',
          timeout: 3000,
        });
        return;
      }
  
      // ✅ Успішна підписка
      iziToast.success({
        title: 'Success',
        message: 'You have successfully subscribed!',
        position: 'topRight',
        timeout: 3000,
      });
  
      form.reset();
    });
  });