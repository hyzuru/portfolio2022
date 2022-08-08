import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function fadeInFooter() {

  console.log("read in fade in trigger")

  // gsap.registerPlugin(ScrollTrigger);

  let footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".l-footer",
      start: "top 50%",
      end: "+=50%", // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      // snap: {
      //   snapTo: "labels", // snap to the closest label in the timeline
      //   duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
      //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
      // }
      // markers: true,
    }
  });
  footerTl.to(".l-footer__bg", {
    autoAlpha: 1
  });
  // let aboutTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".about",
  //     start: "top 50%",
  //     end: "bottom top",
  //     scrub: 1,
  //     markers: true,
  //   }
  // })
  // aboutTl.to(".bg", {
  //   autoAlpha: 1
  // });



// gsap.utils.toArray(".color").forEach(function(elem) {

//   var color = elem.getAttribute('data-color');
  
//   ScrollTrigger.create({
//     trigger: elem,
//     start:'top 50%',
//     end:'bottom 50%',
//     onEnter: () => gsap.to('main', {backgroundColor:color}), 
//     onLeave: () => gsap.to('main', {backgroundColor:'white'}), 
//     onLeaveBack: () => gsap.to('main', {backgroundColor:'white'}), 
//     onEnterBack: () => gsap.to('main', {backgroundColor:color}), 
//     markers:true
//   });

// });

  // let kvTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".mv__img",
  //     start: "top top",
  //     end: "bottom 50%",
  //     pin: true,
  //     markers: true,
  //   }
  // })
  // kvTl.fromTo(".mv__img", {
  //   autoAlpha: 0.8,
  //   scale: 0.8
  // }, {
  //   autoAlpha: 1,
  //   scale: 0.5
  // })
  // .fromTo(".mv__img", {
  //   autoAlpha: 0
  // })

  

  
}