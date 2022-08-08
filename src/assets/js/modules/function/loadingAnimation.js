import gsap from "gsap";

export function loadingAnimation() {
  const root = document.documentElement;
  const loadingAnimation = gsap.timeline({
    defaults: { ease: "power1.inOut" }
  });

  root.classList.add("is-loading");
  loadingAnimation.to(".loading__logo", {
    scale: 1.0,
    duration: 0.0,
  })
    .to(".loading__logo", {
      autoAlpha: 0,
      scale: 1.1,
      duration: 0.4,
      delay: 0.5
    })
    .to(".loading", {
      autoAlpha: 0,
      duration: 0.6,
      delay: -0.2,
      onComplete: () => {
        root.classList.remove("is-loading");
      }
    });
}