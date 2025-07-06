import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

let modalInstance = null;

export function openBookModal(bookData) {
  if (modalInstance) closeBookModal();

  const template = document.querySelector('#book-modal-template');
  const modalMarkup = template.content.cloneNode(true);

  modalMarkup.querySelector('.book-modal__image').src = bookData.image || '';
  modalMarkup.querySelector('.book-modal__image').alt =
    bookData.title || 'Book Cover';
  modalMarkup.querySelector('.book-modal__title').textContent =
    bookData.title || '';
  modalMarkup.querySelector('.book-modal__author').textContent =
    bookData.author || '';
  modalMarkup.querySelector('.book-modal__price').textContent =
    bookData.price || '';
  modalMarkup.querySelector('.book-modal__description').textContent =
    bookData.description || '';
  modalMarkup.querySelector('.book-modal__shipping').textContent =
    bookData.shipping || '';
  modalMarkup.querySelector('.book-modal__returns').textContent =
    bookData.returns || '';

  modalInstance = modalMarkup;
  document.body.appendChild(modalInstance);

  const backdrop = document.querySelector('.book-modal-backdrop');
  backdrop.addEventListener('click', onBackdropClick);
  backdrop
    .querySelector('[data-action="close-modal"]')
    .addEventListener('click', closeBookModal);

  initAccordions(backdrop);
}

export function closeBookModal() {
  const backdrop = document.querySelector('.book-modal-backdrop');
  if (backdrop) backdrop.remove();
  modalInstance = null;
}

function onBackdropClick(e) {
  if (e.target.classList.contains('book-modal-backdrop')) {
    closeBookModal();
  }
}

function initAccordions(container) {
  const accordions = container.querySelectorAll('.accordion');

  accordions.forEach(btn => {
    btn.addEventListener('click', () => {
      accordions.forEach(acc => {
        if (acc !== btn) {
          acc.classList.remove('active');
          acc.nextElementSibling.classList.remove('open');
        }
      });

      btn.classList.toggle('active');
      const panel = btn.nextElementSibling;
      panel.classList.toggle('open');
    });
  });
}
