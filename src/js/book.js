import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import { fetchTopBooks, fetchBooksByCategory } from './api.js';

const categories = document.querySelectorAll('.category-item');
const categoriesSelect = document.querySelector('.category-select');
const booksContainer = document.querySelector('.books');
const loader = document.querySelector('.loader');
const showMore = document.querySelector('.show-more-btn');
const booksCount = document.querySelector('#books-count');

const select = document.getElementById('category-select');
const choices = new Choices(select, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  position: 'bottom',
  placeholder: true,
  placeholderValue: 'Categories',
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showShowMoreBtn() {
  showMore.classList.remove('hidden');
}

function hideShowMoreBtn() {
  showMore.classList.add('hidden');
}

function capitalizeTitle(title) {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

let allBooks = [];
let currentIndex = 0;
let initialAmount = window.innerWidth < 768 ? 10 : 24;
const stepRender = 4;

function renderBatch(amount) {
  const rendered = Math.min(currentIndex + amount, allBooks.length);
  const nextSlice = allBooks.slice(currentIndex, rendered);
  booksContainer.insertAdjacentHTML('beforeend', createMarkup(nextSlice));
  currentIndex = rendered;
  booksCount.textContent = `Showing ${rendered} of ${allBooks.length}`;
  if (currentIndex >= allBooks.length) {
    hideShowMoreBtn();
  }
}

hideShowMoreBtn();
showLoader();
fetchTopBooks()
  .then(books => {
    allBooks = books;
    renderBatch(initialAmount);
    if (allBooks.length > currentIndex) {
      showShowMoreBtn();
    }
  })
  .finally(() => {
    hideLoader();
  });

showMore.addEventListener('click', () => {
  renderBatch(stepRender);
  const firstCard = document.querySelector('.books li');
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
  showMore.blur();
});

booksContainer.addEventListener('click', e => {
  if (e.target.classList.contains('btn')) {
    e.target.blur();
  }
});

function createMarkup(books) {
  return books
    .map(item => {
      return `
<li class="book-item">
  <img class="item-image" src="${item.book_image}" alt="${item.title}" />
  
  <div class="book-content">
    <div class="book-info">
      <div class="text-group">
        <h3 class="item-title">${capitalizeTitle(item.title)}</h3>
        <p class="item-author">${item.author}</p>
      </div>
      <p class="item-price">$${item.price}</p>
    </div>
  </div>

  <button class="btn" data-id="${item._id}">Learn More</button>
</li>`;
    })
    .join('');
}

categoriesSelect.addEventListener('change', () => {
  const categoryName = categoriesSelect.value;
  hideShowMoreBtn();
  showLoader();
  booksContainer.innerHTML = '';
  currentIndex = 0;

  const fetchFn =
    categoryName === 'All categories'
      ? fetchTopBooks
      : () => fetchBooksByCategory(categoryName);

  fetchFn()
    .then(books => {
      allBooks = books;
      renderBatch(initialAmount);
      if (allBooks.length > currentIndex) {
        showShowMoreBtn();
      }
    })
    .finally(() => {
      hideLoader();
    });
});

categories.forEach(category => {
  category.addEventListener('click', () => {
    categories.forEach(i => i.classList.remove('active'));
    category.classList.add('active');
    const categoryName = category.dataset.category;

    hideShowMoreBtn();
    showLoader();
    booksContainer.innerHTML = '';
    currentIndex = 0;

    const fetchFn =
      categoryName === 'All categories'
        ? fetchTopBooks
        : () => fetchBooksByCategory(categoryName);

    fetchFn()
      .then(books => {
        allBooks = books;
        renderBatch(initialAmount);
        if (allBooks.length > currentIndex) {
          showShowMoreBtn();
        }
      })
      .finally(() => {
        hideLoader();
      });
  });
});
