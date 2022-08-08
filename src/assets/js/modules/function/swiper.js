import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import SwiperCore, { Autoplay, Navigation, Pagination, EffectFade } from "swiper/core";

SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

export function swiper() {
  const menuSwiper = new Swiper(".js-menu-swiper-container", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 36
      }
    }
  });

  const recipeSwiper = new Swiper(".js-recipe-swiper-container", {
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
}

export const modalSwiper = () => {
  const modalSwiper = new Swiper(".js-modal-swiper-container", {
    loop: true,
    speed: 800,
    effect: "fade",
    autoplay: {
        delay: 3000
    },
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  });
}