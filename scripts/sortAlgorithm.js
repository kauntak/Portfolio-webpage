const container = document.getElementById("sort-container");
const loadIcon = document.getElementById("sort-loading-icon");
const sortButtons = document.getElementsByClassName("sort-button");
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
        for(let i = blocks.length - 1; i >= 0 ;i--) blocks[i].remove();
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
        for (let i = positionFrom; i > positionTo; i--) {
            switchPositions(blocks[i], blocks[i - 1]);
        }
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    });
}

function setColour(element, colour) {
    element.style.backgroundColor = colour;
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
    for (let i = 0; i < blocks.length - 1 || stopSort; i++) {
        for (let j = 0; j < blocks.length - i - 1 || stopSort; j++) {
            setColour(blocks[j], sortColour);
            setColour(blocks[j + 1], sortColour);
            await delay();

            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                container.insertBefore(blocks[j + 1], blocks[j]);
                blocks = document.getElementsByClassName("block");
            }
            setColour(blocks[j], baseColour);
            setColour(blocks[j + 1], baseColour);
        }
        setColour(blocks[blocks.length - i - 1], finishedColour);
    }
    setColour(blocks[0], finishedColour);
    sortRunning = false;
}

async function selectionSort() {
    sortRunning = true;
    for (let i = 0; i < blocks.length - 1 || stopSort; i++) {
        let minimumIndex = i;
        let currentMinimumValue = Number(
            blocks[minimumIndex].childNodes[0].innerHTML
        );
        setColour(blocks[i], sortColourB);
        for (let j = i + 1; j < blocks.length || stopSort; j++) {
            setColour(blocks[j], sortColour);
            await delay();
            const comparisonValue = Number(blocks[j].childNodes[0].innerHTML);
            if (comparisonValue < currentMinimumValue) {
                if (minimumIndex != i)
                    setColour(blocks[minimumIndex], baseColour);
                minimumIndex = j;
                currentMinimumValue = comparisonValue;
                setColour(blocks[minimumIndex], sortColour);
            } else {
                setColour(blocks[j], baseColour);
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
        setColour(blocks[i], finishedColour);
    }
    setColour(blocks[blocks.length - 1], finishedColour);
    sortRunning = false;
}

async function insertionSort() {
    sortRunning = true;
    for (let i = 1; i < blocks.length || stopSort; i++) {
        setColour(blocks[i], sortColourB);
        let insertionElement = blocks[i];
        let insertionValue = Number(insertionElement.childNodes[0].innerHTML);
        for (let j = 0; j < i || stopSort; j++) {
            let comparisonElement = blocks[j];
            setColour(comparisonElement, sortColour);
            let comparisonValue = Number(
                comparisonElement.childNodes[0].innerHTML
            );
            await delay();
            if (insertionValue < comparisonValue) {
                await insert(i, j);
                container.insertBefore(insertionElement, comparisonElement);
                blocks = document.getElementsByClassName("block");
                setColour(comparisonElement, baseColour);
                break;
            }
            setColour(comparisonElement, baseColour);
        }
        setColour(insertionElement, baseColour);
    }
    sortRunning = false;
}
async function quickSort() {
    sortRunning = true;
    
    sortRunning = false;
}

async function mergeSort() {
    sortRunning = true;
    
    sortRunning = false;
}
