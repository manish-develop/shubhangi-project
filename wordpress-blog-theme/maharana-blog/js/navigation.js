(function () {
	'use strict';

	var toggle = document.querySelector('.menu-toggle');
	var mobileNav = document.querySelector('.mobile-navigation');

	if (!toggle || !mobileNav) {
		return;
	}

	toggle.addEventListener('click', function () {
		var isOpen = mobileNav.classList.toggle('is-open');
		toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	});
})();
