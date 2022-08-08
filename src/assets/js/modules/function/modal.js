import MicroModal from 'micromodal';
import { modalSwiper } from "./swiper";

export const modal = () => {
	const modalContainer = document.querySelectorAll(".js-modal__container");
	const modalTrigger = document.querySelectorAll('.js-modal-trigger');

	MicroModal.init({
		openTrigger: 'data-custom-open',
		disableScroll: true,
		awaitCloseAnimation: true
	});

	modalTrigger.forEach((element, index) => {
		element.addEventListener('click', function () {
			MicroModal.show(`modal-${index + 1}`, {
				debugMode: true,
				disableScroll: true,
				closeTrigger: 'data-micromodal-close',
				awaitCloseAnimation: true,
				onShow: modalSwiper
			});

			modalContainer.forEach((element) => {
				element.scrollTop = 0;
			});
		})
	});
}