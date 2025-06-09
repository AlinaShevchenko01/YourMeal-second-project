/*
const minusBtn=document.querySelector('[data-action="minus"]');
const plusBtn=document.querySelector('[data-action="plus"]');
const counter=document.querySelector('[data-action="counter"]');

minusBtn.addEventListener('click',()=>{
  if(counter.innerText>1) {
    counter.innerText=--counter.innerText;
  }
});
plusBtn.addEventListener('click',()=>{
  counter.innerText=++counter.innerText;
})
 */

// картково-орієнтоване
/*
const minusBtn=document.querySelectorAll('[data-action="minus"]')
const plusBtn=document.querySelectorAll('[data-action="plus"]')
let counter=document.querySelectorAll('[data-action="counter"]')

minusBtn.forEach(button=>{
  button.addEventListener('click',()=>{
    const targetCard=button.closest('.modal')
    counter=targetCard.querySelector('[data-action="counter"]')
    if (parseInt(counter.innerText)>1){
      counter.innerText=--counter.innerText;
    }
  })
})

plusBtn.forEach(button=>{
  button.addEventListener('click',()=>{
    const targetCard=button.closest('.modal')
    counter=targetCard.querySelector('[data-action="counter"]')
    counter.innerText=++counter.innerText;
  })
})
 */

//через клік по сторінці.
import {amountItems} from './amount-item.js';
import {cartStatus} from './cart-status.js';
import { saveCartToStorage, loadCartFromStorage  } from './localStorage.js';


window.addEventListener("click", function(event) {
  const targetCard=event.target.closest('.modal') || event.target.closest('.cart__item') ;
  if (!targetCard) return;
  let counter=targetCard.querySelector('[data-action="counter"]');

  if (event.target.dataset.action === 'plus'){
    counter.innerText=++counter.innerText;
    amountItems()
  }

  if (event.target.dataset.action==='minus'){
    if (parseInt(counter.innerText)>1){
      counter.innerText=--counter.innerText;
      return
    }
    if (event.target.closest('.cart__wrapper') &&
    parseInt(counter.innerText)===1){
      event.target.closest('.cart__item').remove();
      cartStatus()
      amountItems()
      saveCartToStorage()
    }
  }
  cartStatus()
  amountItems()
  saveCartToStorage()
})