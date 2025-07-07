import './js/header';
import './js/mobile-menu';
import './js/hero';
import './js/book';
import './js/book-modal';
import './js/feedback';
import './js/events';
import './js/contact-modal';

import { openBookModal } from './js/book-modal.js';

document.querySelector('.books')?.addEventListener('click', async e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const bookId = btn.dataset.id;
  if (!bookId) return;

  try {
    const response = await fetch(
      `https://books-backend.p.goit.global/books/${bookId}`
    );
    const data = await response.json();

    const bookData = {
      image: data.book_image,
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description,
      shipping: 'Безкоштовна доставка',
      returns: 'Повернення протягом 14 днів',
    };

    openBookModal(bookData);
  } catch (error) {
    console.error('Помилка при завантаженні книги:', error);
  }
});
