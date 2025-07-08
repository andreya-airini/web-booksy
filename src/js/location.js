const marquee = document.getElementById('marquee-content');
const gap = 25;

// Подвоїла текст
const text = marquee.innerHTML;
marquee.innerHTML = `
  <span class="marquee-text">${text}</span>
  <span class="marquee-gap" style="display:inline-block; width:${gap}px;"></span>
  <span class="marquee-text">${text}</span>
`;

let position = 0;
const speed = 0.5;
let contentWidth;

window.addEventListener('load', () => {
  // Ширина одного циклу та проміжок
  contentWidth = marquee.querySelector('.marquee-text').scrollWidth + gap;
  requestAnimationFrame(animate);
});

function animate() {
  position -= speed;

  if (Math.abs(position) >= contentWidth) {
    position = 0;
  }

  marquee.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(animate);
}
