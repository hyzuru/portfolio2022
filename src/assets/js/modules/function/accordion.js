export function accordion() {
  const accordionTrigger = document.querySelectorAll(".js-accordion__trigger");
  const accordionTabPanel = document.querySelectorAll(".js-accordion__tab-panel");

  const nextFrame = (cb) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(cb)
    });
  }

  for (let i = 0; i < accordionTrigger.length; i++) {
    accordionTabPanel[i].style.height = "0";

    accordionTrigger[i].addEventListener("click", () => {
      if (accordionTrigger[i].getAttribute("aria-expanded") === "true") {
        accordionTrigger[i].setAttribute("aria-expanded", "false");
        accordionTabPanel[i].setAttribute("aria-hidden", "true");

        nextFrame(() => {
          accordionTabPanel[i].style.height = "0";
        });
      } else {
        accordionTrigger[i].setAttribute("aria-expanded", "true");
        accordionTabPanel[i].setAttribute("aria-hidden", "false");

        nextFrame(() => {
          accordionTabPanel[i].style.height = accordionTabPanel[i].scrollHeight + "px";
        });
      }
    });
  }
}