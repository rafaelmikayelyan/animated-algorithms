let graphContainer;
let isSorted = false;
let colorDefault = 'lightgray';
let colorUsed = 'darkgray';
let colorCurrent = '#FF4500';
let colorLast = '#6495ED';
let animationSpeed = 300;

function createRandomArray(length) {
	randomArray = new Array(length);
	for (let i = 0; i < length; i++) {
		randomArray[i] = Math.floor(Math.random() * 400);
	}
	return randomArray;
}

async function renderGraph(array) {
	isSorted = false;
	if (graphContainer) {
		let bars = document.getElementsByClassName('bar');
		for (let i = 0; i < bars.length; i++) {
			bars[i].style.height = 0 + 'px';
		}
		await sleep(animationSpeed);
	}

	graphContainer = document.getElementById("graph-container");
	graphContainer.innerHTML = '';
	
	for (let i = 0; i < array.length; i++) {
		let bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.height = '0px';
		graphContainer.appendChild(bar);
	}

	let bars = document.getElementsByClassName('bar');

	await sleep(50);
	for (let i = 0; i < bars.length; i++) {
		bars[i].style.height = array[i] + 'px';
	}

}

async function renderGraphGradually(array) {
	clearButtonSelection();
	isSorted = false;

	let bars = document.getElementsByClassName('bar');
	
	await sleep(animationSpeed);
	for (let i = 0; i < array.length; i++) {
		bars[i].style.height = array[i] + 'px';
		await sleep(10);
		bars[i].style.backgroundColor = colorDefault;
	}
}

async function sort() {
	if (isSorted) {
		return true;
	}
	isSorted = true;

	let bars = document.getElementsByClassName('bar');
	let size = bars.length;

    for (let step = 0; step < size - 1; step++) {
		let min_idx = step;

		for (let i = step + 1; i < size; i++) {

			if (parseInt(bars[i].style.height) < parseInt(bars[min_idx].style.height)) {
				min_idx = i;
			}
		}

		let temp = parseInt(bars[step].style.height);
		bars[step].style.height = parseInt(bars[min_idx].style.height) + 'px';
		bars[min_idx].style.height = temp + 'px';

		bars[step].style.backgroundColor = colorLast;
		bars[min_idx].style.backgroundColor = colorCurrent;
		await sleep(animationSpeed);
		bars[step].style.backgroundColor = colorUsed;
		bars[min_idx].style.backgroundColor = colorUsed;
		if (!isSorted) {
			return;
		}
    }
}



function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearButtonSelection() {
	let buttons = document.getElementsByClassName(buttons);
	for (let i = 0; i < buttons.length; i++) {
		// if (buttons[i].className == 'button-selected') {
			// buttons[i].style.backgroundColor = 'lightgray';
			buttons[i].classList.remove('button-selected');	
		}
	} 
}
