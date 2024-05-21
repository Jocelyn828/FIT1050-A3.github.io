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
          
const openDetailsButton = document.querySelectorAll('[data-detail]');
const closeDetailsButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openDetailsButton.forEach(button => {
	button.addEventListener('click', () => {
		const details = document.querySelector(button.dataset.detail)
		openDetails(details)
	})
})

overlay.addEventListener('click', () => {
	const details = document.querySelectorAll('.details.active')
	details.forEach(details => {
		closeDetails(details)
	})
})

closeDetailsButton.forEach(button => {
	button.addEventListener('click', () => {
		const details = button.closest('.details')
		closeDetails(details)
	})
})

function openDetails(details) {
	if (details == null) return
	details.classList.add('active')
	overlay.classList.add('active')
	document.body.classList.add('no-scroll');

}

function closeDetails(details) {
	if (details == null) return
	details.classList.remove('active')
	overlay.classList.remove('active')
	document.body.classList.remove('no-scroll');

}
