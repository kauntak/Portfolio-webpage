const sortDiv = document.getElementById("large-screen");
const container = document.getElementById("sort-container");
const loadIcon = document.getElementById("sort-loading-icon");
const sortButtons = document.getElementsByClassName("sort-button");
const hiddenButton = document.getElementById("hidden-info");
const delayTime = 50;
const num = 100;
const maxNumber = 200;
const baseColour = "#8e99ac";
const sortColour = "#896572";
const sortColourB = "#a18eac";
const finishedColour = "#99ac8e";

var sortRunning = false;
var stopSort = false;
var stopped = true;
var blocks;

const sortAlgorithms = {
    quickSort: quickSort,
    mergeSort: mergeSort,
    insertionSort: insertionSort,
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
};

window.onresize = () => {
    if (window.innerWidth <= 1920) {
        sortDiv.style.display = "";
        hiddenButton.style.display = "";
    }
    if(window.innerWidth < 1100){
        TagCanvas.nomouse = true;
    } else {
        TagCanvas.nomouse = false;
    }
};
function showSort() {
    sortDiv.style.display = "flex";
    hiddenButton.style.display = "none";
}

async function runSort(sortType) {
    if (sortRunning) await generateBlocks();
    sortRunning = true;
    await sortAlgorithms[sortType]();
}

generateBlocks();
async function generateBlocks() {
    container.innerHTML = "";
    container.style.display = "none";
    loadIcon.style.display = "";
    if (sortRunning) {
        blocks = document.getElementsByClassName("block");
        for (let i = blocks.length - 1; i >= 0; i--) blocks[i].remove();
        await delay(1500);
    }
    sortRunning = false;
    for (let i = 0; i < num; i += 1) {
        const value = Math.floor(Math.random() * maxNumber) + 5;

        const block = document.createElement("div");
        block.classList.add("block");
        block.id = "block-" + i;
        block.style.height = `${value * 1.5}px`;
        block.style.transform = `translateX(${i * 7}px)`;

        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block-id");
        blockLabel.innerHTML = value;

        block.appendChild(blockLabel);
        container.appendChild(block);
    }
    blocks = document.getElementsByClassName("block");
    container.style.display = "";
    loadIcon.style.display = "none";
}
function switchPositions(elementA, elementB) {
    const transformA = window
        .getComputedStyle(elementA)
        .getPropertyValue("transform");
    const transformB = window
        .getComputedStyle(elementB)
        .getPropertyValue("transform");

    elementA.style.transform = transformB;
    elementB.style.transform = transformA;
}

function swap(elementA, elementB) {
    return new Promise((resolve) => {
        switchPositions(elementA, elementB);
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    });
}
function insert(positionFrom, positionTo) {
    return new Promise((resolve) => {
        blocks[positionFrom].style.transition = "none";
        for (let i = positionFrom; i > positionTo; i--) {
            blocks[i - 1].style.transition = "none";
            switchPositions(blocks[positionFrom], blocks[i - 1]);
            blocks[i - 1].style.transition = "";
        }
        blocks[positionFrom].style.transition = "";
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    });
}

function setColour(element, colour) {
    if (typeof element == "number") element = blocks[element];
    element.style.backgroundColor = colour;
}

function getValue(element) {
    if (typeof element == "number") element = blocks[element];
    return Number(element.childNodes[0].innerHTML);
}
function delay(time) {
    return new Promise((resolve) =>
        setTimeout(
            () => {
                resolve();
            },
            time == undefined ? delayTime : time
        )
    );
}
async function bubbleSort() {
    sortRunning = true;
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            setColour(j, sortColour);
            setColour(j + 1, sortColour);
            await delay();

            const value1 = getValue(j);
            const value2 = getValue(j + 1);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                container.insertBefore(blocks[j + 1], blocks[j]);
                blocks = document.getElementsByClassName("block");
            }
            setColour(j, baseColour);
            setColour(j + 1, baseColour);
        }
        setColour(blocks.length - i - 1, finishedColour);
    }
    setColour(0, finishedColour);
}

async function selectionSort() {
    sortRunning = true;
    for (let i = 0; i < blocks.length - 1; i++) {
        let minimumIndex = i;
        let currentMinimumValue = getValue(minimumIndex);
        setColour(i, sortColourB);
        for (let j = i + 1; j < blocks.length; j++) {
            setColour(j, sortColour);
            await delay();
            const comparisonValue = getValue(j);
            if (comparisonValue < currentMinimumValue) {
                if (minimumIndex != i) setColour(minimumIndex, baseColour);
                minimumIndex = j;
                currentMinimumValue = comparisonValue;
                setColour(minimumIndex, sortColour);
            } else {
                setColour(j, baseColour);
            }
        }
        if (minimumIndex != i) {
            let elementA = blocks[i];
            let elementB = blocks[minimumIndex];
            let elementC = blocks[minimumIndex + 1];
            await swap(elementA, elementB);
            setColour(elementA, baseColour);
            container.insertBefore(elementB, elementA);
            container.insertBefore(elementA, elementC);
            blocks = document.getElementsByClassName("block");
        }
        setColour(i, finishedColour);
    }
    setColour(blocks.length - 1, finishedColour);
}

async function insertionSort() {
    sortRunning = true;
    let finishingIndex;
    for (let i = 1; i < blocks.length; i++) {
        setColour(blocks[i], sortColourB);
        let insertionElement = blocks[i];
        let insertionValue = getValue(insertionElement);
        for (let j = 0; j < i; j++) {
            let comparisonElement = blocks[j];
            setColour(comparisonElement, sortColour);
            let comparisonValue = getValue(comparisonElement);
            await delay();
            if (insertionValue < comparisonValue) {
                await insert(i, j);
                container.insertBefore(insertionElement, comparisonElement);
                blocks = document.getElementsByClassName("block");
                if (i == blocks.length - 1) {
                    finishingIndex = j;
                    setColour(comparisonElement, finishedColour);
                } else setColour(comparisonElement, baseColour);
                break;
            }
            if (i == blocks.length - 1) {
                finishingIndex = j;
                setColour(comparisonElement, finishedColour);
            } else setColour(comparisonElement, baseColour);
        }
        if (i == blocks.length - 1) {
            setColour(insertionElement, finishedColour);
        } else setColour(insertionElement, baseColour);
    }
    for (let i = finishingIndex; i < blocks.length; i++) {
        setColour(i, finishedColour);
    }
}
async function quickSort(startIndex, finishIndex) {
    sortRunning = true;
    if (startIndex === undefined) startIndex = 0;
    if (finishIndex === undefined) finishIndex = blocks.length - 1;
    if (startIndex >= finishIndex) {
        setColour(startIndex, finishedColour);
        return;
    }
    let partitionIndex = await partition(startIndex, finishIndex);
    quickSort(startIndex, partitionIndex - 1);
    quickSort(partitionIndex + 1, finishIndex);
}

async function partition(startIndex, finishIndex) {
    const pivotValue = getValue(finishIndex);
    setColour(finishIndex, sortColourB);
    let currentIndex = startIndex;
    let lessThanIndex = startIndex - 1;
    for (; currentIndex <= finishIndex; currentIndex++) {
        let comparisonValue = getValue(currentIndex);
        console.log(comparisonValue, pivotValue, currentIndex, lessThanIndex);
        if (comparisonValue <= pivotValue) {
            lessThanIndex++;
            if (currentIndex == lessThanIndex) continue;
            await insert(currentIndex, lessThanIndex);
            container.insertBefore(blocks[currentIndex], blocks[lessThanIndex]);
            continue;
        }
    }
    setColour(lessThanIndex, finishedColour);
    return lessThanIndex;
}

async function mergeSort(startIndex, finishIndex) {
    sortRunning = true;
    if (startIndex === undefined) startIndex = 0;
    if (finishIndex === undefined) finishIndex = blocks.length - 1;
    let difference = finishIndex - startIndex;
    if (difference <= 1)
        return await merge(startIndex, startIndex + 1, finishIndex);
    let midPoint = Math.round(difference / 2) + startIndex;
    await mergeSort(startIndex, midPoint);
    await mergeSort(midPoint + 1, finishIndex);
    let isFirst = finishIndex == blocks.length - 1 && startIndex == 0;
    return await merge(startIndex, midPoint + 1, finishIndex, isFirst);
}

async function merge(startIndexA, startIndexB, finishIndex, isFirst) {
    while (startIndexA < startIndexB && startIndexB <= finishIndex) {
        let valueA = getValue(startIndexA);
        let valueB = getValue(startIndexB);
        let elementA = blocks[startIndexA];
        let elementB = blocks[startIndexB];
        setColour(startIndexA, sortColourB);
        setColour(startIndexB, sortColourB);
        if (valueA > valueB) {
            await insert(startIndexB, startIndexA);
            setColour(startIndexA, baseColour);
            setColour(startIndexB, baseColour);
            container.insertBefore(blocks[startIndexB], blocks[startIndexA]);
            startIndexB++;
            blocks = document.getElementsByClassName("block");
        }
        if (isFirst) setColour(startIndexA, finishedColour);
        else setColour(startIndexA, baseColour);
        startIndexA++;
    }
    if (isFirst) {
        while (startIndexA <= finishIndex) {
            setColour(startIndexA, finishedColour);
            startIndexA++;
        }
    } else {
        setColour(startIndexA, baseColour);
        setColour(finishIndex, baseColour);
    }
}
