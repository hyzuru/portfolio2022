import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function topSectionsFadein() {

  // console.log("read in fade in trigger")

  ScrollTrigger.matchMedia({
	
    // desktop
    "(min-width: 800px)": function() {


      const headings = document.querySelectorAll('.js-section');
      const numOfTransitions = headings.length
      const singleDuration = 1000;
      const totalDuration = singleDuration * numOfTransitions;
      


      gsap.to('.about', {
        scrollTrigger: {
          pin: '.about',
          end: '+=' + `${totalDuration}s`,
          pinSpacing: true,
        },
      });
      
      headings.forEach((heading, i) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            toggleActions: 'play reverse play reverse',
            start: '+=' + `${singleDuration * i}s`,
            end: '+=' + `${singleDuration}s`,
            // markers: true,
            onEnter: () => { gsap.to(heading,{autoAlpha: 1, zIndex: 1})},
            onLeave: () => {  gsap.to(heading,{autoAlpha: 0,  zIndex: 0})},
            onEnterBack: () => {  gsap.to(heading,{autoAlpha: 1, zIndex: 1})},
            onLeaveBack: () => {  
              if(i === 0 ) return;
              gsap.to(heading,{autoAlpha: 0, zIndex: 0})
            }
          }
        });
      });
      const colorAbout = document.querySelector('.about');
      var color1 = colorAbout.getAttribute("data-color");
      
      ScrollTrigger.create({
        trigger: colorAbout,
        start:'top 50%',
        end: '+=' + `${totalDuration}s`,

        onEnter: () => gsap.to('.l-wrapper', {background: color1 }), 
        onLeave: () => gsap.to('.l-wrapper', {background:'black'}), 
        onLeaveBack: () => gsap.to('.l-wrapper', {background:'black'}), 
        onEnterBack: () => gsap.to('.l-wrapper', {background:color1}), 
        pinSpacing: true,
        // markers: true,
      });



      // const colorFooter = document.querySelector('.l-footer');
      // if (colorFooter.length) {
      //   var color2 = colorFooter.getAttribute("data-color");
      //   ScrollTrigger.create({
      //     trigger: colorFooter,
      //     start:'top 50%',
      //     end: 'bottom top',
      //     onEnter: () => {
      //       gsap.to('.l-wrapper', {background: color2, color: 'black' })
      //       gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'black' })
      //     },
      //     onLeave: () => {
      //       gsap.to('.l-wrapper', {background:'black',  color: 'white'})
      //       gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'white' })
      //     }, 
      //     onLeaveBack: () => {
      //       gsap.to('.l-wrapper', {background:'black',  color: 'white'})
      //       gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'white' })
      //     }, 
      //     onEnterBack: () => {
      //       gsap.to('.l-wrapper', {background: color2, color: 'black' })
      //       gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'black' })
      //     },
          
      //     pinSpacing: true,
      //     markers: true,
      //   });
      // }

      },

      "all": function() {

      
    }
  });

  

}