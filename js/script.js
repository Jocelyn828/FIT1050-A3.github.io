// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}
     
// menu js
const openDetailButton = document.querySelectorAll('[data-detail]');
const closeDetailButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openDetailButton.forEach(button => {
	button.addEventListener('click', () => {
		const details = document.querySelector(button.dataset.detail)
		openDetail(details)
	})
})

overlay.addEventListener('click', () => {
	const details = document.querySelectorAll('.details.active')
	details.forEach(detail => {
		closeDetail(detail)
	})
})

closeDetailButton.forEach(button => {
	button.addEventListener('click', () => {
		const details = button.closest('.details')
		closeDetail(details)
	})
})

function openDetail(detail) {
	if (detail == null) return
	detail.classList.add('active')
	overlay.classList.add('active')
	document.body.classList.add('no-scroll');
	
	// Scroll to the menu section
	const menuSection = document.getElementById('menu-1001');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
	document.addEventListener('keydown', trapFocus);

}

function closeDetail(detail) {
	if (detail == null) return
	detail.classList.remove('active')
	overlay.classList.remove('active')
	document.body.classList.remove('no-scroll');
	document.removeEventListener('keydown', trapFocus);

}

function trapFocus(e) {
	const modals = document.querySelectorAll('.details.active');
	if (modals.length === 0) return;

	const modal = modals[0];
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	const closeElement = focusableElements[0];

	// Tab key
	if (e.key === 'Tab' || e.keyCode === 9) {
		closeElement.focus();
		e.preventDefault();
	}

	// Escape key
	if (e.key === 'Escape' || e.keyCode === 27) { 
		modals.forEach(details => {
			closeDetail(details)
		})
	}
}