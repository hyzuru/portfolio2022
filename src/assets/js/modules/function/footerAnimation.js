import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function fadeInFooter() {

  console.log("read in fade in trigger")

  // document.addEventListener('keydown', (e) => {
  //   if (e.shiftKey && e.key.toLowerCase() === 'd') {
  //     e.preventDefault();
  //     e.stopPropagation();
      
  //     // Do some stuff...
  //     console.log("d has been pressed")
  //     // add darkmode
  //   }
  // }, false);


  // check if element exists
  // const shapeElement02 = document.querySelectorAll(".js-shape--02");
  // if (shapeElement01.length && shapeElement02.length) {

  // }


  // let footerTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".l-footer",
  //     start: "top top",
  //     end: "bottom +=200%", // end after scrolling 500px beyond the start
  //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  //     markers: true,
  //   }
  // });
  // footerTl.to(".l-footer", {
  //   autoAlpha: 1
  // });

  // let aboutHeight = document.querySelector(".about").offsetHeight
  // let blogStartHeight = document.querySelector(".blog ").getBoundingClientRect().top;
  // console.log(aboutHeight)
  // console.log(blogStartHeight)

  // let kvTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".mv-decoration-container",
  //     start: "top 34%",
  //     end: blogStartHeight,
  //     scrub: 1,
  //     pin: true,
  //   }
  // })
  // kvTl.to(".mv-decoration-container", {
  //   autoAlpha: 1,
  //   duration: 20,
  // })
  // .to(".mv-decoration-container", {
  //   autoAlpha: 0,
  //   duration: 5,
  // })
  // let kvTl1 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".mv__inner",
  //     start: "top 65%",
  //     end: "50px",
  //     scrub: 1,
  //     pin: true,
  //   }
  // })
  // kvTl1.to(".mv__inner", {
  //   autoAlpha: 1,
  //   duration: 0.5
  // },"start")
  // .to(".mv__inner", {
  //   autoAlpha: 0,
  //   duration: 1
  // })
  // kvTl1.to(".mv__scroll", {
  //   autoAlpha: 0,
  // },"start")






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



    const colorFooter = document.querySelector('.l-footer');
    if (colorFooter.length) {
      var color2 = colorFooter.getAttribute("data-color");
      ScrollTrigger.create({
        trigger: colorFooter,
        start:'top 50%',
        end: 'bottom top',
        onEnter: () => {
          gsap.to('.l-wrapper', {background: color2, color: 'black' })
          gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'black' })
        },
        onLeave: () => {
          gsap.to('.l-wrapper', {background:'black',  color: 'white'})
          gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'white' })
        }, 
        onLeaveBack: () => {
          gsap.to('.l-wrapper', {background:'black',  color: 'white'})
          gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'white' })
        }, 
        onEnterBack: () => {
          gsap.to('.l-wrapper', {background: color2, color: 'black' })
          gsap.to('.l-header__link:not(.l-header__link--active), .l-header__brand', {color: 'black' })
        },
        
        pinSpacing: true,
        markers: true,
      });
    }

}