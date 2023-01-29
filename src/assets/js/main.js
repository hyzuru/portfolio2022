// -------------------------------------------------------------------- //
//                               MAIN JS                               //
// -------------------------------------------------------------------- //

import "./../scss/style.scss"

// SYNTAX HIGHLIGHTER
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";



// class
import { SmoothScroll } from "./modules/class/smoothScroll";
// import { swiper } from "./modules/function/swiper"; // css imports working with swiper v6.8.4

// function
import { topSectionsFadein } from "./modules/function/topSectionsAnim";
import { renderPost } from "./modules/function/renderPost";

// util
import { BODY } from "./modules/util/root";

(() => {
//   // drawer
//   const openButton = document.querySelector(".js-openButton");
//   const closeButton = document.querySelector(".js-closeButton");
//   const menuContent = document.querySelector(".js-drawer");
//   const anchorLinks = document.querySelectorAll(".js-anchorLink");
//   const tabbableElements = menuContent.querySelectorAll(".js-closeButton, .js-drawer__logo, .js-link");
//   const firstTabbable = tabbableElements[0];
//   const lastTabbable = tabbableElements[tabbableElements.length - 1];
//   const drawer = new Drawer(openButton, closeButton, menuContent, anchorLinks, firstTabbable, lastTabbable);

//   openButton.addEventListener("click", () => {
//     drawer.onClickOpenButton();
//   });

//   closeButton.addEventListener("click", () => {
//     drawer.onClickCloseButton();
//   });

//   menuContent.addEventListener("transitionend", () => {
//     drawer.onTransitionendDrawer(event);
//   });

//   for (let i = 0; i < anchorLinks.length; i++) {
//     anchorLinks[i].addEventListener("click", () => {
//       drawer.onClickAnchorLink(event);
//     });
//   }

//   firstTabbable.addEventListener("keydown", () => {
//     drawer.onKeydownTabKeyFirstTabbable(event);
//   });

//   lastTabbable.addEventListener("keydown", () => {
//     drawer.onKeydownTabKeyLastTabbable(event);
//   });

//   window.addEventListener("keydown", () => {
//     drawer.onKeydownEsc(event);
//   });

//   // tab
//   const tabs = document.querySelectorAll(".js-tab");
//   const tab = new Tab(tabs);

//   tab.init();

//   for (let i = 0; i < tabs.length; i++) {
//     tabs[i].addEventListener("click", () => {
//       tab.onClickTab(event);
//     }, false);

//     tabs[i].addEventListener("focus", () => {
//       tab.onFocusTab(event);
//     }, false);

//     tabs[i].addEventListener("keydown", () => {
//       tab.onKeydownTab(event);
//     }, false);
//   }

  // smoothscroll
  const smoothScroll = new SmoothScroll({ duration: 1000 });

  document.querySelectorAll("a[href^='#']").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href");
      let targetY;

      if (targetId === "#") {
        targetY = 0;
      } else {
        const targetElement = document.querySelector(targetId);
        const documentHeight = document.body.clientHeight;

        if (targetElement.getBoundingClientRect().top + window.pageYOffset + window.innerHeight > documentHeight) {
          targetY = documentHeight - window.innerHeight;
        } else {
          targetY = targetElement.getBoundingClientRect().top + window.pageYOffset;
        }
      }
      smoothScroll.exeScroll({ target: { y: targetY } });
    });
  });
})();


window.addEventListener("DOMContentLoaded", () => {
  if (BODY.classList.contains("home")) {
    // loadingAnimation();

    topSectionsFadein();
  }
  if (BODY.querySelector("code")) {
    document.querySelectorAll('code').forEach(el => {
      // then highlight each
      hljs.highlightElement(el);
    });
  }
  renderPost();



  // accordion();
  // productsSlider();
  // posts();
  // swiper();
});