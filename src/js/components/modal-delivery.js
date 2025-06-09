import { cartStatus } from './cart-status.js';
import { amountItems } from './amount-item.js';

window.addEventListener('DOMContentLoaded',()=>{
  const storedName=localStorage.getItem('delivery__name')
  if(storedName) name.value=storedName;

  const storedTel=localStorage.getItem('delivery__number');
  if(storedTel) tel.value=storedTel;
/*
  const storedRadio = localStorage.getItem('type-delivery');
  if (storedRadio) {
    const radioToCheck = document.querySelector(`input[name="type-delivery"][value="${storedRadio}"]`);
    if (radioToCheck) {
      radioToCheck.checked = true;
    }
  }
  visibilityAddress();
 */


  const storedAddress=localStorage.getItem('delivery__address');
  if(storedAddress) street.value=storedAddress;

  const storedFloor=localStorage.getItem('floor');
  if(storedFloor) floor.value=storedFloor;

  const storedIntercom=localStorage.getItem('intercom');
  if(storedIntercom) intercom.value=storedIntercom;
})

const modalDelivery=document.getElementById('order');

window.addEventListener('click', function(e) {
  const btnOrder=e.target.closest('[data-order]');
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (btnOrder) {
    if (modalDelivery) {
      modalDelivery.classList.add('modal-open');
      document.body.style.overflow='hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  const closeBtn=e.target.closest('.delivery__close');
  if (closeBtn){
    if(modalDelivery){
      modalDelivery.classList.remove('modal-open');
      document.body.style.overflow='auto';
      document.body.style.paddingRight = ''
    }
  }
  if (e.target.classList.contains('delivery')){
    modalDelivery.classList.remove('modal-open');
    document.body.style.overflow='auto'
    document.body.style.paddingRight = '';
  }
})
/*
window.addEventListener('click', function(e) {
  const address=document.querySelector('.delivery__inner');
  if (e.target.closest('.delivery__radio_delivery')){
    if (address){
      address.style.visibility='visible';
    }
  }
  if (e.target.closest('.delivery__radio_pickup')){
    if (address){
      address.style.visibility='hidden';
    }
  }
})
 */
const deliveryRadios=document.querySelectorAll('input[name="type-delivery"]')
const address=document.querySelector('.delivery__inner')

function visibilityAddress(){
  const selected=document.querySelector('input[name="type-delivery"]:checked');
  if (selected && selected.value==='delivery'){
    address.style.visibility='visible';
  }else {
    address.style.visibility='hidden';
  }
}
visibilityAddress()

deliveryRadios.forEach(radio=>{
  radio.addEventListener('change', visibilityAddress);
})


//валідація форми
const form=document.querySelector('.delivery__form');
const name=document.querySelector('.delivery__name');
const tel=document.querySelector('.delivery__number');
const street=document.querySelector('.delivery__address');
const floor=document.querySelector('#floor');
const intercom=document.querySelector('#intercom');

form.addEventListener('submit', function(e){
  let messages=[];
  const namePattern = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]+$/;
  if (!namePattern.test(name.value.trim()) || name.value.trim().length<2){
    messages.push('Mistake in name');
  }

  const numberPattern = /^\+?[0-9]{10,15}$/;
  if (!numberPattern.test(tel.value.trim()) || tel.value.trim().length<9){
    messages.push('Mistake in tel');
  }

  const selectedRadio=document.querySelector('input[name="type-delivery"]:checked');
  if (!selectedRadio){
    messages.push('Please select a radio');
  }

  const addressPattern=/^[А-Яа-яЁёІіЇїЄєҐґA-Za-z0-9\s'-]+$/
  const checkAddress=document.querySelector('.delivery__inner')
  if (checkAddress.style.visibility !== 'hidden'){
    if (!addressPattern.test(street.value.trim()) || street.value.trim().length<6){
      messages.push('Mistake in address');
    }
  }
  if (messages.length > 0){
    e.preventDefault();
    alert(messages.join(`
    `))
  }else{
    e.preventDefault();

    function cleanCart (){
      const cartItems=document.querySelectorAll('.cart__item');
      cartItems.forEach(item=>item.remove())
    }

    cleanCart()
    amountItems()
    cartStatus()
    localStorage.removeItem('cart__item')

    localStorage.setItem('delivery__name',name.value);
    localStorage.setItem('delivery__number',tel.value);
    const radioButtons=document.querySelectorAll('input[name="type-delivery"]');
    radioButtons.forEach(radio=>{
      radio.addEventListener('change', function(){
        localStorage.setItem('type-delivery',radio.value);
        visibilityAddress()
      })
    })
    localStorage.setItem('delivery__address',street.value);
    localStorage.setItem('floor',floor.value);
    localStorage.setItem('intercom',intercom.value);

    modalDelivery.classList.remove('modal-open');
    modalAccept.classList.add('modal-open');
  }
})

const modalAccept=document.querySelector('.modal-accepted')
window.addEventListener('click', function(e){
  const btnClose=e.target.closest('#close-modal-accepted');
  if (btnClose){
    if (modalAccept.classList.contains('modal-open')){
      modalAccept.classList.remove('modal-open');
      document.body.style.overflow='auto';
      document.body.style.paddingRight = '';
    }
  }

  if (e.target.classList.contains('modal-accepted')){
    modalAccept.classList.remove('modal-open');
    document.body.style.overflow='auto';
    document.body.style.paddingRight = '';
  }
})
