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
  const wrapper = modalMarkup.firstElementChild;

  wrapper.querySelector('.book-modal__image').src = bookData.image || '';
  wrapper.querySelector('.book-modal__image').alt =
    bookData.title || 'Book Cover';
  wrapper.querySelector('.book-modal__title').textContent =
    bookData.title || 'No title';
  wrapper.querySelector('.book-modal__author').textContent =
    bookData.author || 'Unknown author';
  wrapper.querySelector('.book-modal__price').textContent = bookData.price
    ? `$${bookData.price}`
    : 'No price';

  wrapper.querySelector('.book-modal__description').innerHTML = `<p>${
    bookData.description || 'No description'
  }</p>`;
  wrapper.querySelector(
    '.book-modal__shipping'
  ).innerHTML = `<p>We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.  </p>`;
  wrapper.querySelector(
    '.book-modal__returns'
  ).innerHTML = `<p>You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.</p>`;

  // Quantity logic
  const quantityEl = wrapper.querySelector('.qty-value');
  const decrementBtn = wrapper.querySelector('[data-action="decrement"]');
  const incrementBtn = wrapper.querySelector('[data-action="increment"]');
  let quantity = 1;
  quantityEl.textContent = quantity;

  decrementBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityEl.textContent = quantity;
    }
  });

  incrementBtn.addEventListener('click', () => {
    quantity++;
    quantityEl.textContent = quantity;
  });

  // Cart button
  wrapper
    .querySelector('.book-modal__add-to-cart')
    .addEventListener('click', () => {
      console.log(`Added ${quantity} of '${bookData.title}' to cart.`);
    });

  // Buy button
  wrapper
    .querySelector('.book-modal__buy-now')
    .addEventListener('click', () => {
      alert('Thanks for your purchase!');
    });

  // Append modal
  modalInstance = wrapper;
  document.body.appendChild(modalInstance);
  document.body.classList.add('no-scroll');

  const backdrop = modalInstance;
  backdrop.addEventListener('click', onBackdropClick);

  const closeBtn = backdrop.querySelector('[data-action="close-modal"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeBookModal);
  }

  document.addEventListener('keydown', handleEscape);
  initAccordions(backdrop);
}

export function closeBookModal() {
  if (modalInstance) modalInstance.remove();
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handleEscape);
  modalInstance = null;
}

function onBackdropClick(e) {
  if (e.target.classList.contains('book-modal-backdrop')) {
    closeBookModal();
  }
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    closeBookModal();
  }
}

function initAccordions(container) {
  const accordionButtons = container.querySelectorAll('.accordion');

  accordionButtons.forEach(button => {
    const panel = button.nextElementSibling;

    button.addEventListener('click', () => {
      const isOpen = button.classList.contains('active');

      // Close all
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
