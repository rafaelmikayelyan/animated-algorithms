let graphContainer = document.getElementById("graph-container");
let slider = document.getElementById("range");
let buttonRefresh = document.getElementById("button--refresh");
let buttonsSort = document.getElementsByClassName("button--sort");
let isSorted = false;
let colorDefault = 'lightgray';
let colorUsed = 'darkgray';
let colorChosen = '#8B008B';
let colorIndex = '#6495ED';
let colorCompared = '#DB7093';
let colorDone = '#9ACD32';
let animationSpeed = 1000 / 70;

let arrayTest = [348, 321, 56, 340, 47, 17, 249, 295, 280, 103, 302, 196, 38, 67, 237, 140, 307, 186, 15, 121];


document.addEventListener('DOMContentLoaded', (event) => {
	init();
})

function init () {
	renderGraphChange();

	slider.addEventListener('input', function () { renderGraphChange(); adjustAnimationSpeed(); }, false);
	buttonRefresh.addEventListener('click', function() { refreshGraph(); }, false);

	for (let i = 0; i < buttonsSort.length; i++) {
		buttonsSort[i].addEventListener('click', function() { sort(buttonsSort[i]); }, false);
		buttonsSort[i].onmouseover = function() {mouseOver(i)};
	}
	renderSliderMinMax();
}

function mouseOver(i) {
	console.log(buttonsSort[i].id);
	document.getElementById('discription').innerHTML = getSortingInfo(buttonsSort[i].id);
}

function createRandomArray() {
	let randomArray = new Array(slider.value);
	for (let i = 0; i < slider.value; i++) {
		randomArray[i] = Math.floor(Math.random() * 400);
	}
	return randomArray;
}

function getArray() {
	let bars = document.getElementsByClassName('bar');
	let size = bars.length;
	let array = new Array(size);
	for (let i = 0; i < size; i++) {
		array[i] = parseInt(bars[i].style.height);
	}

	return array;
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

	await sleep();

	for (let i = 0; i < array.length; i++) {
		bars[i].style.height = array[i] + 'px';
		bars[i].style.backgroundColor = colorDefault;
		await sleep(5);
	}
}

function sleep(ms = animationSpeed) {
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


	let array = getArray();

	switch (element.id) {
		case 'button--bubble':
			bubbleSort(array);
			break;
		case 'button--selection':
			selectionSort(array);
			break;
		case 'button--insertion':
			insertionSort(array)
			break;
		case 'button--quicksort':
			// console.log(array);
			quickSort(array, 0, array.length - 1);
			// console.log('=================');
			// console.log(array);
			// console.log('=================');
			// renderGraphChange();
			// quickSort(array, 0, array.length - 1);
			break;
		default:
			console.log(element.id);
			break;
	}
}

async function bubbleSort(array) {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			renderBarChange(j, 1);
			await sleep();

			if (array[j] > array[j + 1]) {

				let temp = array[j];
				array[j] = array[j + 1];

				renderBarChange(j, 1, array[j + 1])

				array[j + 1] = temp;

				renderBarChange(j + 1, 2, temp)
				await sleep();
			}

			if (!isSorted) {
				return;
			}
			renderBarChange(j, 3);
			renderBarChange(j + 1, -1)
		}
	}
	renderGraphAsSorted();
}

async function selectionSort(array) {
	for (let i = 0; i < array.length - 1; i++) {
		let min_idx = i;
		renderBarChange(i, 0);

		for (let j = i + 1; j < array.length; j++) {
			renderBarChange(j, 1);
			await sleep(1000/array.length);
			if (array[j] < array[min_idx]) {
				min_idx = j;
			}
			renderBarChange(j, 3);
			await sleep(5);
		}

		let temp = array[i];

		array[i] = array[min_idx];
		renderBarChange(i, 0, array[min_idx]);

		array[min_idx] = temp;
		renderBarChange(min_idx, 2, temp);
		await sleep();
		
		renderBarChange(i);
		renderBarChange(min_idx);
		renderBarChange(i+1);

		if (!isSorted) {
			return;
		}
	}
	renderGraphAsSorted();
}

async function insertionSort(array) {
	for (let i = 1; i < array.length; i++) {
		let iValue = array[i];
		let j = i - 1;
		await renderBarChange(i, 0);
		await sleep(20);

		while (j >= 0 && iValue < array[j]) {
			await renderBarChange(j, 2);
			await sleep(20);
			array[j + 1] = array[j];
			await renderBarChange(j, 1);
			await sleep(20);
			if (j + 1 == i) {
				await renderBarChange(j + 1, 0, array[j]);
				await sleep(20);
			} else {
				await renderBarChange(j + 1, 1, array[j]);
				await sleep(20);
			}
			j--;
			if (!isSorted) {
				return;
			}
		}
		array[j + 1] = iValue;
		await renderBarChange(j + 1);
		await renderBarChange(j + 1, 1, iValue);
	}
	renderGraphAsSorted();
}


async function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
	renderBarChange(i, 1, arr[j]);

    arr[j] = temp;
	renderBarChange(j, 1, temp);
	renderBarChange(i);
}
 
/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition(arr, low, high) {
 
    // pivot
    let pivot = arr[high];
 
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++) {
 
        // If current element is smaller
        // than the pivot
        if (arr[j] < pivot) {
 
            // Increment index of
            // smaller element
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}
 
/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
function quickSort(arr, low, high) {
    if (low < high) {
 
        // pi is partitioning index, arr[p]
        // is now at right place
        let pi = partition(arr, low, high);
 
        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
	renderGraphAsSorted();
}

async function renderBarChange(index, color = null, value = null) {
	let bars = document.getElementsByClassName('bar');
	
	// index
	if (color == 0) {
		color = colorIndex;
	// search
	} else if (color == 1) {
		color = colorCompared;
	// compare
	} else if (color == 2) {
		color = colorChosen;
	// pass
	} else if (color == 3) {
		color = colorDefault;
	// changed 
	} else if (color == 9) {
		color = colorDone;
	// changed 
	} else {
		color = colorUsed;
	}

	bars[index].style.backgroundColor = color;
	if (value) {
		bars[index].style.height = value + 'px';
	}
}

async function renderGraphAsSorted() {
	let array = getArray();
	for (let i = 0; i < array.length; i++) {
		await renderBarChange(i, 9);
		await sleep(20);
	}
}

function renderSliderMinMax() {
	populateSliderMinMax(document.getElementById('slider-min'), 3);
	populateSliderMinMax(document.getElementById('slider-max'), 5);
}

function populateSliderMinMax(element, number) {
	for (let i = number; i > 0; i--) {
		let bar = document.createElement('div');
		let w = 15 / number;
		let h = 20 - i * (15 / number);
		bar.style.height = h + 'px';
		bar.style.width = w + 'px';
		bar.style.backgroundColor = 'white';
		element.appendChild(bar);
	}
}

function adjustAnimationSpeed () {
	animationSpeed = 10000 / slider.value;
	let bars = document.getElementsByClassName('bar');
	let size = bars.length;

	for (let i = 0; i < size - 1; i++) {
		bars[i].style.transition = 'height ' + animationSpeed * 0.0008 + 's ease-out';
	}
}


// data


function getSortingInfo(id) {
	let string = '';
	if (id == 'button--bubble') {
		string = 'Average and worst case time complexity: n^2. Best case time complexity: n when array is already sorted. Worst case: when the array is reverse sorted.';
	} else if (id == 'button--selection') {
		string = 'Best, average and worst case time complexity: n^2 which is independent of distribution of data. ';
	} else if (id == 'button--merge') {
		string = 'Best, average and worst case time complexity: nlogn which is independent of distribution of data.';
	} else if (id == 'button--insertion') {
		string = 'Average and worst case time complexity: n^2. Best case time complexity: n when array is already sorted. Worst case: when the array is reverse sorted.';
	} else if (id == 'button--quicksort') {
		string = 'Worst case: when the array is sorted or reverse sorted, the partition algorithm divides the array in two subarrays with 0 and n-1 elements.';
		string += ' \nBest case and Average case: On an average, the partition algorithm divides the array in two subarrays with equal size.';
	}

	return string;
}
