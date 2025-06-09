/*
const cartWrapper=document.querySelector('.cart__wrapper');

window.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-add')){
    const card=e.target.closest('.component__card');

    const cartItem={
      id:card.dataset.target,
      imgSrc:card.querySelector('img').getAttribute('src'),
      name:card.querySelector('.component__text').innerText,
      weight:card.querySelector('.component__weight').innerText,
      price:card.querySelector('.component__price').innerText,
      counter:1,
    };

    const cartItemHtml=`<div class="cart__item"
                                     data-target="${cartItem.id}">
                <div class="cart__column">
                 <div class="cart__image">
                  <img src="${cartItem.imgSrc}" alt="${cartItem.title}">
                 </div>
                 </div>

                <div class="cart__column">
                  <p class="cart__name">${cartItem.name}</p>

                  <p class="cart__weight">${cartItem.weight}</p>

                  <p class="cart__price">${cartItem.price}</p>
                </div>

                <div class="cart__column">
                  <div class="cart__counter">
                    <button class="cart__minus"
                            data-action="minus">
                      -
                    </button>

                    <p class="cart__quantity"
                       data-action="counter">
                      ${cartItem.counter}
                    </p>

                    <button class="cart__plus"
                            data-action="plus">
                      +
                    </button>
                  </div>
                </div>
              </div>`;

        cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml);
  }
})

window.addEventListener('click', (e) => {
  if (e.target.closest('[data-add]')){
    const card=e.target.closest('.modal');

    const cartItem={
      id:card.id,
      imgSrc:card.querySelector('img').getAttribute('src'),
      name:card.querySelector('.modal__title').innerText,
      weight:card.querySelector('.modal__weight').innerText,
      price:card.querySelector('.modal__price').innerText,
      counter:card.querySelector("[data-action='counter']").innerText,
    };

    const cartItemHtml=`<div class="cart__item"
                                     data-target="${cartItem.id}">
                <div class="cart__column">
                 <div class="cart__image">
                  <img src="${cartItem.imgSrc}" alt="${cartItem.title}">
                 </div>
                 </div>

                <div class="cart__column">
                  <p class="cart__name">${cartItem.name}</p>

                  <p class="cart__weight">${cartItem.weight}</p>

                  <p class="cart__price">${cartItem.price}</p>
                </div>

                <div class="cart__column">
                  <div class="cart__counter">
                    <button class="cart__minus"
                            data-action="minus">
                      -
                    </button>

                    <p class="cart__quantity"
                       data-action="counter">
                      ${cartItem.counter}
                    </p>

                    <button class="cart__plus"
                            data-action="plus">
                      +
                    </button>
                  </div>
                </div>
              </div>`;
    cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml);
  }
})
 */
import {amountItems} from './amount-item.js';
import {cartStatus} from './cart-status.js';
import { saveCartToStorage, loadCartFromStorage  } from './localStorage.js';

window.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  cartStatus();
  amountItems();
});

const cartWrapper=document.querySelector('.cart__wrapper');

function getItem(receivedElement){
  const modal=receivedElement.classList.contains('modal');

  return{
    id:modal ? receivedElement.id:receivedElement.dataset.target,
    imgSrc: receivedElement.querySelector('img').getAttribute('src'),
    name: receivedElement.querySelector(modal?
      '.modal__title' : '.component__text').innerText,
    weight: receivedElement.querySelector(modal?
    '.modal__weight' :'.component__weight').innerText,
    price: receivedElement.querySelector(modal?
    '.modal__price' :'.component__price').innerText,
    counter: modal? receivedElement.querySelector("[data-action='counter']").innerText : 1,
  }
}

export function cartItemHTML(cartItem){
  return `<div class="cart__item"
                                     data-target="${cartItem.id}">
                <div class="cart__column">
                 <div class="cart__image">
                  <img src="${cartItem.imgSrc}" alt="${cartItem.title}">
                 </div>
                 </div>

                <div class="cart__column">
                  <p class="cart__name">${cartItem.name}</p>

                  <p class="cart__weight">${cartItem.weight}</p>

                  <p class="cart__price">${cartItem.price}</p>
                </div>

                <div class="cart__column">
                  <div class="cart__counter">
                    <button class="cart__minus"
                            data-action="minus">
                      -
                    </button>

                    <p class="cart__quantity"
                       data-action="counter">
                      ${cartItem.counter}
                    </p>

                    <button class="cart__plus"
                            data-action="plus">
                      +
                    </button>
                  </div>
                </div>
              </div>`;
}

window.addEventListener('click', function(event){
  const addBtn=event.target.closest('[data-add]');
  if (!addBtn) return;

  const receivedElement=event.target.closest('.modal') || event.target.closest('.component__card') ;
  const cartItem=getItem(receivedElement);

  const existingItem = cartWrapper.querySelector(`[data-target="${cartItem.id}"]`);
  if (existingItem) {
    const quantityEl = existingItem.querySelector('[data-action="counter"]');
    quantityEl.innerText = +quantityEl.innerText + +cartItem.counter;
  } else {
    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML(cartItem));
  }

  function cleanCounter() {
    const modal = document.querySelector(`[id="${cartItem.id}"]`);
    if (modal){
      const counter = modal.querySelector('[data-action="counter"]');
      if (counter) {
        counter.innerText = '1';
      }
    }
  }

  cleanCounter()
  cartStatus()
  amountItems()
  saveCartToStorage()

})

//tablet
  /*
window.addEventListener('click', function(event){
  const cartTablet=document.querySelector('.cart__tablet')
  const style = getComputedStyle(cartTablet);
  const cartSize=document.querySelector('.cart__container');
  if (event.target.closest('.cart__container') && style.opacity==='0'){
    console.log('click')
    cartTablet.classList.add('active');
    if(style.opacity==='1')
    cartSize.classList.add('change-size');
  }
  if (!event.target.closest('.cart__tablet') && style.opacity==='1'
  || event.target.closest('.cart__close-mobile')){
    cartTablet.classList.remove('active')
    cartSize.classList.remove('change-size');
  }

  })
    */

window.addEventListener('click', function(event){
  const cartTablet=document.querySelector('.cart__tablet')
  const cartContainer = document.querySelector('.cart__container');

  if (!cartTablet.classList.contains('active')){
    if (event.target.closest('.cart__container')) {
      cartTablet.classList.add('active');
      cartContainer.classList.add('cart__change-size');
      cartContainer.classList.add('cart__container_active');
      return
    }
  }


  if (cartTablet.classList.contains('active')) {
    if (event.target.closest('.cart__close-mobile') ||
      !event.target.closest('.cart__tablet')) {
      cartTablet.classList.remove('active');
      cartContainer.classList.remove('cart__change-size');
      cartContainer.classList.remove('cart__container_active');
    }
  }

  if (cartTablet.classList.contains('active')) {
    if (event.target.closest('.cart__btn-order')) {
      cartTablet.classList.remove('active');
      cartContainer.classList.remove('cart__change-size');
      cartContainer.classList.remove('cart__container_active');
    }
  }
})


