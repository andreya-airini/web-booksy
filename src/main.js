import './js/header';
import './js/mobile-menu';
import './js/hero';
import './js/book';
import './js/book-modal';
import './js/feedback';
import './js/events';
import './js/contact-modal';
import './js/location.js';

import { openBookModal } from './js/book-modal.js';

document.addEventListener('click', event => {
  const bookCard = event.target.closest('.book-card');
  if (!bookCard) return;

  const bookId = bookCard.dataset.bookId;

  const exampleBook = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: '$9.99',
    image: 'https://example.com/gatsby.jpg',
    description: 'A novel set in the roaring twenties...',
    shipping: 'Ships in 2–4 days',
    returns: '14-day return policy',
  };

  openBookModal(exampleBook);
});
