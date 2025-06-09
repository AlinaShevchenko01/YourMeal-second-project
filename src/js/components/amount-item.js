import { saveCartToStorage, loadCartFromStorage  } from './localStorage.js';

export function amountItems(){
  const cartWrapper=document.querySelector('.cart__wrapper');
  const cartItems=cartWrapper.querySelectorAll('.cart__item');
  const priceOfItem=document.querySelector('.cart__price');
  const freeDelivery=document.querySelector('.cart__free-delivery');
  const amountToPaid=document.querySelector('.cart__total-price');
  const amountItems=document.querySelector('.cart__amount');

  let totalPrice=0;
  let quantityInCart=0

  cartItems.forEach(item=>{
    const amountItems=item.closest('.cart__item').querySelector('[data-action="counter"]');
    totalPrice += parseInt(amountItems.innerText) * parseInt(priceOfItem.innerText);
    quantityInCart += parseInt(amountItems.innerText);
  })
  amountToPaid.innerText = `${totalPrice}₴`;
  amountItems.innerText = quantityInCart;

  saveCartToStorage()

  if (totalPrice>=599){
    freeDelivery.classList.remove('hidden');
  }else freeDelivery.classList.add('hidden');
}