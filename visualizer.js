let graphContainer = document.getElementById("graph-container");
let slider = document.getElementById("range");
let buttonRefresh = document.getElementById("button--refresh");
let buttonsSort = document.getElementsByClassName("button--sort");
let isSorted = false;
let colorDefault = 'lightgray';
let colorUsed = 'darkgray';
let colorCurrent = '#DB7093';
let colorLast = '#6495ED';
let animationSpeed = 300;

document.addEventListener('DOMContentLoaded', (event) => {
	init();
})

function init () {
	renderGraphChange();

	slider.addEventListener('input', function () { renderGraphChange(); }, false);
	buttonRefresh.addEventListener('click', function() { refreshGraph(); }, false);

	for (let i = 0; i < buttonsSort.length; i++) {
		buttonsSort[i].addEventListener('click', function() { sort(buttonsSort[i]); }, false);
	}
}

function createRandomArray() {
	let randomArray = new Array(slider.value);
	for (let i = 0; i < slider.value; i++) {
		randomArray[i] = Math.floor(Math.random() * 400);
	}
	return randomArray;
}

function renderGraphChange() {
	isSorted = false;
	let array = createRandomArray();
	clearButtonSelection();

	if (graphContainer) {
		let bars = document.getElementsByClassName('bar');
		for (let i = 0; i < bars.length; i++) {
			bars[i].style.height = 0 + 'px';
		}
	}

	graphContainer.innerHTML = '';

	for (let i = 0; i < array.length; i++) {
		let bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.height = '0px';
		graphContainer.appendChild(bar);
	}

	let bars = document.getElementsByClassName('bar');
	for (let i = 0; i < bars.length; i++) {
		bars[i].style.height = array[i] + 'px';
	}

}

async function refreshGraph() {
	isSorted = false;
	let array = createRandomArray();
	clearButtonSelection();

	let bars = document.getElementsByClassName('bar');

	await sleep(animationSpeed);

	for (let i = 0; i < array.length; i++) {
		bars[i].style.height = array[i] + 'px';
		bars[i].style.backgroundColor = colorDefault;
		await sleep(5);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearButtonSelection() {
	try {
		document.getElementsByClassName('button-selected')[0].classList.remove('button-selected');	
	} catch {}
}

function sort(element) {
	if (isSorted) {
		return;
	}
	isSorted = true;

	element.classList.add('button-selected');

	switch (element.id) {
		case 'button--selection':
			selectionSort();
			break;
		default:
			console.log(element.id);
			break;
	}

}

async function selectionSort() {
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

function insertionSort(bars) {
	var len = array_length(A);
	var i = 1;
	while (i < len) {
		var x = A[i];
		var j = i - 1;
		while (j >= 0 && A[j] > x) {
			A[j + 1] = A[j];
			j = j - 1;
		}
		A[j+1] = x;
		i = i + 1;
	}
}

