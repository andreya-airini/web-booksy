import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

let modalInstance = null;

export function openBookModal(bookData) {
  if (modalInstance) closeBookModal();

  const template = document.querySelector('#book-modal-template');
  if (!template) {
    console.error('Модальний шаблон не знайдено!');
    return;
  }

  const modalMarkup = template.content.cloneNode(true);

  modalMarkup.querySelector('.book-modal__image').src = bookData.image || '';
  modalMarkup.querySelector('.book-modal__image').alt =
    bookData.title || 'Book Cover';
  modalMarkup.querySelector('.book-modal__title').textContent =
    bookData.title || 'No title';
  modalMarkup.querySelector('.book-modal__author').textContent =
    bookData.author || 'Unknown author';
  modalMarkup.querySelector('.book-modal__price').textContent = bookData.price
    ? `$${bookData.price}`
    : 'No price';
  modalMarkup.querySelector('.book-modal__description').innerHTML = `<p>${
    bookData.description || 'No description'
  }</p>`;
  modalMarkup.querySelector('.book-modal__shipping').innerHTML = `<p>${
    bookData.shipping || 'Shipping info unavailable'
  }</p>`;
  modalMarkup.querySelector('.book-modal__returns').innerHTML = `<p>${
    bookData.returns || 'Return info unavailable'
  }</p>`;

  modalInstance = modalMarkup;
  document.body.appendChild(modalInstance);

  document.body.style.overflow = 'hidden';

  const backdrop = document.querySelector('.book-modal-backdrop');
  if (!backdrop) return;

  backdrop.addEventListener('click', onBackdropClick);
  const closeBtn = backdrop.querySelector('[data-action="close-modal"]');
  if (closeBtn) closeBtn.addEventListener('click', closeBookModal);

  initAccordions(backdrop);

  let quantity = 1;
  const qtyValue = backdrop.querySelector('.qty-value');
  const decrementBtn = backdrop.querySelector('[data-action="decrement"]');
  const incrementBtn = backdrop.querySelector('[data-action="increment"]');

  decrementBtn?.addEventListener('click', () => {
    if (quantity > 1) quantity--;
    if (qtyValue) qtyValue.textContent = quantity;
  });

  incrementBtn?.addEventListener('click', () => {
    quantity++;
    if (qtyValue) qtyValue.textContent = quantity;
  });

  const addToCartBtn = backdrop.querySelector('.book-modal__add-to-cart');
  const buyNowBtn = backdrop.querySelector('.book-modal__buy-now');

  addToCartBtn?.addEventListener('click', () => {
    console.log('🛒 Add to Cart:', {
      title: bookData.title,
      quantity,
    });
  });

  buyNowBtn?.addEventListener('click', () => {
    console.log('💳 Buy Now:', {
      title: bookData.title,
      quantity,
    });
  });
}

export function closeBookModal() {
  const backdrop = document.querySelector('.book-modal-backdrop');
  if (backdrop) backdrop.remove();
  modalInstance = null;
  document.body.style.overflow = '';
}

function onBackdropClick(e) {
  if (e.target.classList.contains('book-modal-backdrop')) {
    closeBookModal();
  }
}

function initAccordions(container) {
  const accordionButtons = container.querySelectorAll('.accordion');

  accordionButtons.forEach(button => {
    const panel = button.nextElementSibling;

    button.addEventListener('click', () => {
      const isOpen = button.classList.contains('active');

      accordionButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling?.classList.remove('open');
      });

      if (!isOpen) {
        button.classList.add('active');
        panel?.classList.add('open');
      }
    });
  });
}
