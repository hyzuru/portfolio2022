export function productsSlider() {
  const imageElement = document.querySelector(".js-product-image");
  const thumbnailsElement = document.querySelectorAll(".js-product-thumbnail");
  let imagePath;
  let prevTarget;

  for (let i = 0; i < thumbnailsElement.length; i++) {
    prevTarget = thumbnailsElement[0];
    imageElement.parentElement.style.border = "2px solid #e6e6e6";

    thumbnailsElement[i].addEventListener("click", (e) => {
      if (e.target === prevTarget) return;

      e.target.parentElement.classList.add("is-current");

      prevTarget.parentElement.classList.remove("is-current");
      prevTarget = e.target;

      imagePath = e.target.getAttribute("src");
      imageElement.setAttribute("src", imagePath);

      if (i === 0) {
        imageElement.parentElement.style.border = "2px solid #e6e6e6";
      } else {
        imageElement.parentElement.style.border = "none";
      }
    });
  }
}