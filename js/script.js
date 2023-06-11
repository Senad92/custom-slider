const slider = document.querySelector(".accessory-component");
const arrowBtns = document.querySelectorAll(".slider-arrows div");
const firstCardWidth = slider.querySelector(".card").offsetWidth;
const rangeInput = document.querySelector('.range-percentage');

const Events = {
	none: 'none',
	drag: 'drag',
	arrowButton: 'arrow-button',
	rangeInput: 'range-input',
};
  
// The lastEvent variable helps in tracking and controlling the flow of events within the slider component.
let lastEvent = Events.none;
// Drag variables
let isDragging = false;
let startX;
let startScrollLeft;

// Function to handle arrow button click
const handleArrowButtonClick = (btn) => {
	lastEvent = Events.arrowButton;
	const scrollAmount = btn.id === 'left' ? -firstCardWidth : firstCardWidth;
	const currentScrollAmount = slider.scrollLeft;
	const scrollLeft = currentScrollAmount + scrollAmount;
	slider.scrollLeft = scrollLeft;
};

const handleDragStart = (pageX) => {
	lastEvent = Events.drag;
	isDragging = true;
	slider.classList.add('dragging');
	startX = pageX;
	startScrollLeft = slider.scrollLeft;
};
  

const handleDragging = (pageX) => {
	if (!isDragging) return;
	const cursorMovement = pageX - startX;
	slider.scrollLeft = startScrollLeft - cursorMovement;
	const { scrollWidth, clientWidth, scrollLeft } = slider;
	rangeInput.value = (scrollLeft / (scrollWidth - clientWidth)) * 100;
};

const handleDragStop = () => {
	isDragging = false;
	slider.classList.remove('dragging');
};

const setScrollbarHandleWidth = () => {
	const { scrollWidth, clientWidth } = slider;
	rangeInput.style.setProperty(
		'--slider-size',
		`${(clientWidth / scrollWidth) * 100}%`
	);
};

rangeInput.oninput = (event) => {
	lastEvent = Events.rangeInput;
	const { scrollWidth, clientWidth } = slider;
	const percentageValue = event.target.value;
	const value = percentageValue / 100;
	const scrollValue = value * (scrollWidth - clientWidth);
	slider.scrollLeft = scrollValue;
};

slider.onscroll = () => {
	if (lastEvent === Events.rangeInput) {
	  	return;
	}
	const { scrollWidth, clientWidth, scrollLeft } = slider;
	rangeInput.value = Math.round(
	  (scrollLeft / (scrollWidth - clientWidth)) * 100
	);
};

// Add event listeners to arrow buttons
arrowBtns.forEach((btn) => {
  	btn.addEventListener("click", () => handleArrowButtonClick(btn));
});
  
// Add touch event listeners for touch support
slider.addEventListener('touchstart', (e) => handleDragStart(e.touches[0].pageX));
slider.addEventListener('touchmove', (e) => handleDragging(e.touches[0].pageX));
slider.addEventListener('touchend', handleDragStop);

// Add mouse event listeners for mouse support
slider.addEventListener('mousedown', (e) => handleDragStart(e.pageX));
slider.addEventListener('mousemove', (e) => handleDragging(e.pageX));
document.addEventListener('mouseup', handleDragStop);

setScrollbarHandleWidth();
