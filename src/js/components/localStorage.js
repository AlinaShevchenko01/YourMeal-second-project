import { cartItemHTML } from './cart.js';

const cartWrapper=document.querySelector('.cart__wrapper');

export function saveCartToStorage() {
  const cartItems = [];
  cartWrapper.querySelectorAll('.cart__item').forEach(itemEl => {
    cartItems.push({
      id: itemEl.dataset.target,
      imgSrc: itemEl.querySelector('img').src,
      name: itemEl.querySelector('.cart__name').innerText,
      weight: itemEl.querySelector('.cart__weight').innerText,
      price: itemEl.querySelector('.cart__price').innerText,
      counter: itemEl.querySelector('[data-action="counter"]').innerText,
    });
  });

  localStorage.setItem('cart', JSON.stringify(cartItems));
}

export function loadCartFromStorage() {
  const cartData = JSON.parse(localStorage.getItem('cart'));
  if (!cartData || !cartData.length) return;

  cartWrapper.innerHTML='';

  cartData.forEach(item => {
    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML(item));
  });
}



