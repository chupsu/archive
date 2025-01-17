new Swiper('.swiper-container');

/* ------------------ New code ------------------ */

document.addEventListener('swiped-up', () => {
	const slideParents = document.querySelectorAll('[data-slide-parent]');

	if (slideParents.length) {
		slideParents.forEach(slideParent => {
			if (slideParent.classList.contains('swiper-slide-active') || slideParent.dataset.slideParent == 'static') {
				const slidePanel = slideParent.querySelector('[data-slide-panel]');

				if (slidePanel) {
					slidePanel.classList.add('_active');
				}
			}
		});
	}
});

document.addEventListener('swiped-down', () => {
	const slideParents = document.querySelectorAll('[data-slide-parent]');

	if (slideParents.length) {
		slideParents.forEach(slideParent => {
			if (slideParent.classList.contains('swiper-slide-active') || slideParent.dataset.slideParent == 'static') {
				const slidePanel = slideParent.querySelector('[data-slide-panel]');
				const slideText = slideParent.querySelector('[data-slide-text]');
				const slideClose = slideParent.querySelector('[data-open-close]');
				const slideBtn = slideParent.querySelector('[data-slide-btn]');

				if (slidePanel) {
					slidePanel.classList.remove('_active');
				}

				if (slideText && slideBtn && slideClose) {
					slideText.classList.remove('_active');
					slideClose.classList.remove('_active');
					slideBtn.classList.remove('_hide');
				}
			}
		});
	}
});

document.addEventListener('click', (e) => {
	const slideParents = document.querySelectorAll('[data-slide-parent]');

	if (slideParents.length) {
		slideParents.forEach(slideParent => {
			if (slideParent.classList.contains('swiper-slide-active') || slideParent.dataset.slideParent == 'static') {
				const slidePanel = slideParent.querySelector('[data-slide-panel]');
				const slideText = slideParent.querySelector('[data-slide-text]');
				const slideClose = slideParent.querySelector('[data-open-close]');
				const slideBtn = slideParent.querySelector('[data-slide-btn]');

				if (!e.target.closest('.panel-intro__main') && !e.target.closest('.panel-intro__text')) {
					if (slidePanel) {
						slidePanel.classList.remove('_active');
					}

					if (slideText && slideBtn && slideClose) {
						slideText.classList.remove('_active');
						slideClose.classList.remove('_active');
						slideBtn.classList.remove('_hide');
					}
				}

			}
		});
	}
});

const slideParents = document.querySelectorAll('[data-slide-parent]');

if (slideParents.length) {
	slideParents.forEach(slideParent => {
		const slideBtn = slideParent.querySelector('[data-slide-btn]');
		const slideClose = slideParent.querySelector('[data-open-close]');
		const slideText = slideParent.querySelector('[data-slide-text]');

		if (slideBtn && slideText && slideClose) {
			slideBtn.addEventListener('click', () => {
				slideText.classList.add('_active');
				slideClose.classList.add('_active');
				slideBtn.classList.add('_hide');
			});

			slideClose.addEventListener('click', () => {
				slideText.classList.remove('_active');
				slideClose.classList.remove('_active');
				slideBtn.classList.remove('_hide');
			});
		}
	});
}

/* ------------------ New code ------------------ */