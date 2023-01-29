// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export function shapeAnimation() {
//   const shapeElement01 = document.querySelectorAll(".js-shape--01");
//   const shapeElement02 = document.querySelectorAll(".js-shape--02");
//   const featureShapeElement = document.querySelectorAll(".feature__shape");

//   if (shapeElement01.length && shapeElement02.length) {
//     const shapeAnimation01 = gsap.timeline({
//       repeat: -1,
//       repeatDelay: 0.0,
//       defaults: { duration: 10, ease: "none" }
//     });

//     shapeAnimation01.from(".js-shape--01", {
//       scale: 0.9,
//       skewY: -4.5,
//       rotation: 180
//     })
//       .to(".js-shape--01", {
//         scale: 1.1,
//         skewY: 4.5,
//         rotation: 360
//       })
//       .to(".js-shape--01", {
//         scale: 0.9,
//         skewY: -4.5,
//         rotation: 180
//       });

//     const shapeAnimation02 = gsap.timeline({
//       repeat: -1,
//       repeatDelay: 0.0,
//       defaults: { duration: 5, ease: "none" }
//     });

//     shapeAnimation02.from(".js-shape--02", {
//       scale: 1.1,
//       skewY: -9
//     })
//       .to(".js-shape--02", {
//         scale: 0.9,
//         skewY: 9
//       })
//       .to(".js-shape--02", {
//         scale: 1.1,
//         skewY: -9
//       });
//   }


//   if (featureShapeElement.length) {
//     ScrollTrigger.defaults({
//       start: "top bottom",
//       end: "bottom top",
//       scrub: true
//     });

//     const pointScroll01 = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".feature__shape--01"
//       },
//     });

//     const pointScroll02 = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".feature__shape--02"
//       },
//     });

//     const pointScroll03 = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".feature__shape--03"
//       },
//     });

//     const pointScroll04 = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".feature__shape--04"
//       },
//     });

//     pointScroll01.fromTo(
//       ".feature__shape--01",
//       {
//         y: 0,
//       },
//       {
//         y: 100
//       }
//     );

//     pointScroll02.fromTo(
//       ".feature__shape--02",
//       {
//         y: 0,
//       },
//       {
//         y: -60
//       }
//     );

//     pointScroll03.fromTo(
//       ".feature__shape--03",
//       {
//         y: 0,
//       },
//       {
//         y: 80
//       }
//     );

//     pointScroll04.fromTo(
//       ".feature__shape--04",
//       {
//         y: 0,
//       },
//       {
//         y: -70
//       }
//     );
//   }
// }