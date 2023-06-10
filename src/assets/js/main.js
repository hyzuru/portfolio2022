// -------------------------------------------------------------------- //
//                               MAIN JS                               //
// -------------------------------------------------------------------- //

import './../scss/style.scss';

// SYNTAX HIGHLIGHTER
import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';

// class
import { SmoothScroll } from './modules/class/smoothScroll';
// import { swiper } from "./modules/function/swiper"; // css imports working with swiper v6.8.4
import Sketch from './modules/class/webgl';
import Scroll from './modules/class/scroll';

// function
import { topSectionsAnim } from './modules/function/topSectionsAnim';
import { renderPost } from './modules/function/renderPost';

// util
import { BODY } from './modules/util/root';

(() => {
  // drawer
  const toggle = document.querySelector('.js-toggle');
  const nav = toggle.parentElement;
  const root = document.documentElement;
  const navOverlay = document.querySelector('.l-header-overlay');

  function openNav() {
    nav.classList.add('active');
    root.classList.add('is-drawer-open');
    navOverlay.classList.remove('hidden');
  }
  function closeNav() {
    nav.classList.remove('active');
    root.classList.remove('is-drawer-open');
    navOverlay.classList.add('hidden');
  }
  toggle.addEventListener('click', (e) => {
    // e.defaultPrevented;
    if (nav.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener('click', function (e) {
    if (nav.classList.contains('active')) {
      closeNav();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeNav();
    }
  });

  // smoothscroll
  const smoothScroll = new SmoothScroll({ duration: 1000 });

  document.querySelectorAll("a[href^='#']").forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      let targetY;

      if (targetId === '#') {
        targetY = 0;
      } else {
        const targetElement = document.querySelector(targetId);
        const documentHeight = document.body.clientHeight;

        if (
          targetElement.getBoundingClientRect().top +
            window.pageYOffset +
            window.innerHeight >
          documentHeight
        ) {
          targetY = documentHeight - window.innerHeight;
        } else {
          targetY =
            targetElement.getBoundingClientRect().top + window.pageYOffset;
        }
      }
      smoothScroll.exeScroll({ target: { y: targetY } });
    });
  });
})();

window.addEventListener('DOMContentLoaded', () => {
  if (BODY.classList.contains('home')) {
    // loadingAnimation();

    topSectionsAnim();

    new Sketch({
      domElement: document.getElementById('container'),
    });
  }
  if (BODY.classList.contains('work')) {
    // modal
    const openModalBtn = document.querySelectorAll('.work__list .btn-open');
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');

    function showModal(id) {
      let m = document.getElementById(id);
      m.classList.remove('hidden');
      root.classList.add('is-drawer-open');
      overlay.classList.remove('hidden');
    }
    function hideModals() {
      modals.forEach((m) => {
        m.classList.add('hidden');
        root.classList.remove('is-drawer-open');
        overlay.classList.add('hidden');
      });
    }
    openModalBtn.forEach((b) => {
      b.addEventListener('click', (event) => {
        hideModals();
        showModal(b.dataset.modal);
      });
    });
    modals.forEach((m) => {
      let x = m.querySelector('button.btn-close');
      x.addEventListener('click', hideModals);
    });

    document.addEventListener('keydown', function (e) {
      modals.forEach((modal) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          hideModals();
        }
      });
    });
    overlay.addEventListener('click', hideModals);
  }
  if (BODY.querySelector('code')) {
    document.querySelectorAll('code').forEach((el) => {
      // then highlight each
      hljs.highlightElement(el);
    });
  }
  renderPost();
  // swiper();
});
