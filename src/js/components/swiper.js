import Swiper from 'swiper';
import * as events from 'node:events';

//swiper
const swiperIcons=new Swiper('.menu__pagination', {
  slidesPerView: 'auto',

  breakpoints: {
    0:{
      spaceBetween: 8
    },
    481:{
      spaceBetween: 12
    },
    769:{
      spaceBetween: 24
    },
    1025:{
      spaceBetween: 24
    },
    1440:{
      spaceBetween: 24
    },
  },
})

const swiperMenu = new Swiper('.menu__swiper', {
  slidesPerView:1,
});

const connectSlides=
  document.querySelectorAll('.menu__pagination .swiper-slide');

connectSlides.forEach((slide,index)=>{
  slide.addEventListener('click',()=>{
    swiperMenu.slideTo(index);
  })
})

connectSlides[0].classList.add('active');

swiperMenu.on('slideChange',()=>{
  const activeIndex=swiperMenu.activeIndex;

  connectSlides.forEach((slide,index)=>{
    slide.classList.toggle('active', index === activeIndex);
  });

  swiperIcons.slideTo(activeIndex);
});