import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export function topSectionsAnim() {
  ScrollTrigger.matchMedia({
    // desktop
    '(min-width: 800px)': function () {
      const headings = document.querySelectorAll('.js-section');
      const numOfTransitions = headings.length;
      const singleDuration = 1000;
      const totalDuration = singleDuration * (numOfTransitions - 1);

      // gsap.to('.about', {
      //   scrollTrigger: {
      //     pin: '.about',
      //     end: '+=' + `${totalDuration}s`,
      //     pinSpacing: true,
      //     markers: true,
      //     start: 'top top',
      //   },
      // });
      // headings.forEach((heading, i) => {
      //   let tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: heading,
      //       toggleActions: 'play reverse play reverse',
      //       start: '+=' + `${singleDuration * i}s`,
      //       end: '+=' + `${singleDuration}s`,
      //       markers: true,
      //       onEnter: () => {
      //         gsap.to(heading, { autoAlpha: 1, zIndex: 1 });
      //       },
      //       onLeave: () => {
      //         gsap.to(heading, { autoAlpha: 0, zIndex: 0 });
      //       },
      //       onEnterBack: () => {
      //         gsap.to(heading, { autoAlpha: 1, zIndex: 1 });
      //       },
      //       onLeaveBack: () => {
      //         if (i === 0) return;
      //         gsap.to(heading, { autoAlpha: 0, zIndex: 0 });
      //       },
      //     },
      //   });
      // });
      const colorAbout = document.querySelector('.about');
      var color1 = colorAbout.getAttribute('data-color');
      ScrollTrigger.create({
        trigger: '.about',
        start: 'top 50%',
        end: '+=' + `${totalDuration}s`,
        onEnter: () => gsap.to('.l-wrapper', { background: color1 }),
        onLeave: () => gsap.to('.l-wrapper', { background: 'black' }),
        onLeaveBack: () => gsap.to('.l-wrapper', { background: 'black' }),
        onEnterBack: () => gsap.to('.l-wrapper', { background: color1 }),
        pinSpacing: true,
        markers: false,
      });

      gsap.to('.mv__imgbox', {
        scrollTrigger: {
          // pin: '.mv__imgbox',
          end: '+=30%',
          duration: 1000,
          // pinSpacing: true,
          // markers: true,
          start: 'top top',
          onLeave: () => gsap.to('.mv__imgbox', { opacity: 0 }),
          onEnterBack: () => gsap.to('.mv__imgbox', { opacity: 1 }),
        },
      });
    },

    all: function () {
      console.log('load gsap');
    },
  });
}
