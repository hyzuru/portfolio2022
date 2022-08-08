import gsap from "gsap";

export function textCircleAnimation() {
  gsap.to(".c-text-circle", {
    rotation: 360,
    duration: 70,
    ease: "none",
    repeat: -1
  })
}