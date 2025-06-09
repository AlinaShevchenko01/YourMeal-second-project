//modal картки/
/*
const openCards=document.querySelectorAll('.component__card');
const modals=document.querySelectorAll('.modal');
const closeButtons=document.querySelectorAll('.modal__close');

openCards.forEach(card=>{
  card.addEventListener('click',()=>{
    const targetCard=card.getAttribute('data-target');
    const modal=document.querySelector(`#${targetCard}`);
    if(modal){
      modal.classList.add(`show`);
      document.body.style.overflow='hidden';
    }
  })
});

closeButtons.forEach(crossBtn=>{
  crossBtn.addEventListener('click',()=>{
    const modal=crossBtn.closest('.modal');
    modal.classList.remove(`show`);
    document.body.style.overflow='auto';
  })
});

window.addEventListener('click', events=>{
  modals.forEach(modal=>{
    if (events.target===modal){
      modal.classList.remove(`show`);
      document.body.style.overflow='auto';
    }
  })
});
 */

// modal через таргет клік
/*
window.addEventListener('click', event=>{
  const card = event.target.closest('.component__card')

  if (card){
    if (event.target.closest('[data-add]')) return;

    const targetCard = card.getAttribute('data-target');
    const  targetModal=  document.querySelector(`#${targetCard}`);
     if (targetModal){
       targetModal.classList.add('show');
       document.body.style.overflow='hidden';
     }
  }

  const closeBtn=event.target.closest('[data-close]');

  function closeModal(element){
    element.classList.remove('show');
    document.body.style.overflow='auto';
  }

  if (closeBtn){
    const targetModal=closeBtn.closest('.modal');
    if (targetModal){
      closeModal(targetModal);
    }
  }

  if (event.target.classList.contains('modal')){
    closeModal(event.target)
  }

  if (event.target.hasAttribute('data-add')){
    const targetModal=event.target.closest('.modal');
    if (targetModal){
      closeModal(targetModal)
    }
  }
})
 */
import { items } from './array-for-modal.js';

const modal=document.querySelector('.modal');
const name=document.querySelector('.modal__title');
const btnClose=document.querySelector('.modal__close');
const image=document.querySelector('.modal__image');
const description=document.querySelector('.modal__text');
const list=document.querySelector('.modal__ingredients');
const weight=document.querySelector('.modal__weight');
const calorie=document.querySelector('.modal__calorie');
const price=document.querySelector('.modal__price');

window.addEventListener('click',event=>{
  const card = event.target.closest('.component__card')

  if (card){
    if (event.target.closest('[data-add]')) return;

    const targetCard = card.getAttribute('data-target');
    const targetModal=items.find(item=>item.id === targetCard);
    if (!targetModal) return;
    modal.id=targetModal.id;
    name.innerText = targetModal.name;
    btnClose.dataset.close=targetModal.id
    image.src=targetModal.imgSrc;
    image.alt = targetModal.name;
    description.innerText = targetModal.description;
    weight.innerText = targetModal.weight;
    calorie.innerText = targetModal.calorie;
    price.innerText = targetModal.price;

    list.innerHTML="";
    targetModal.list.forEach(product=>{
      const li=document.createElement("li");
      li.textContent=String(product);
      list.appendChild(li);
    })

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (modal){
      modal.classList.add('modal-open');
      document.body.style.overflow='hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }}

    if (event.target.closest('.modal__close')
      || (event.target.classList.contains('modal'))){
    modal.classList.remove('modal-open');
    document.body.style.overflow='auto';
      document.body.style.paddingRight = '';
  }
  if (event.target.hasAttribute('data-add')){
    modal.classList.remove('modal-open');
    document.body.style.overflow='auto';
    document.body.style.paddingRight = '';
  }

});






























