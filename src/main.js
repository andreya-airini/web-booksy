import './js/header';
import './js/mobile-menu';
import './js/hero';
import './js/book';
import './js/book-modal';
import './js/feedback';
import './js/events';
import './js/contact-modal';
import './js/location.js';
import './js/scroll.js';
import './js/footer.js'

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

const quotes = [
  "A room without books is like a body without a soul. — Cicero",
  "So many books, so little time. — Frank Zappa",
  "Until I feared I would lose it, I never loved to read. — Harper Lee",
  "A reader lives a thousand lives before he dies. — George R.R. Martin",
  "There is no friend as loyal as a book. — Ernest Hemingway",
  "Books are a uniquely portable magic. — Stephen King",
  "I have always imagined that Paradise will be a kind of library. — Jorge Luis Borges",
  "Reading is essential for those who seek to rise above the ordinary. — Jim Rohn",
  "Books are the mirrors of the soul. — Virginia Woolf",
  "The more that you read, the more things you will know. — Dr. Seuss",
  "Reading gives us someplace to go when we have to stay where we are. — Mason Cooley",
  "A good book is an event in my life. — Stendhal",
  "Once you learn to read, you will be forever free. — Frederick Douglass",
];

const quoteText = document.getElementById('quote-text');
const randomIndex = Math.floor(Math.random() * quotes.length);
quoteText.textContent = quotes[randomIndex];


