export function cartStatus(){
  const emptyCart=document.querySelector(".cart__empty");
  const orderCart=document.querySelector(".cart__order");
  const fullCart=document.querySelector(".cart__wrapper");
  const closeCartMobile=document.querySelector(".cart__close-mobile");


  if (fullCart.children.length>0){
    emptyCart.classList.add('hidden');
    orderCart.classList.remove('hidden');
    closeCartMobile.classList.remove('hidden');
  }else {
    emptyCart.classList.remove('hidden');
    orderCart.classList.add('hidden');
    closeCartMobile.classList.add('hidden');
  }
}

