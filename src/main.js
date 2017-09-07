// Letter Object constructor
class Letter {
    constructor(letter, id = 0) {
        this.letter = letter;
        this.id = id;
        this.incorrectStatus = false;
    }
}

//DOM elements
const input = document.querySelector(".typing-input");
const dashBoard = document.querySelector('.dashboard');

//Global Options
let globalOptions = {
    currentText: 'There are many variations of passages of Lorem Ipsum available, but the majority ' +
    'have suffered alteration in some form, by injected humour, or randomised words which look even slightly believable.',
    currentPosition: null,
    currentChar: '',
    lettersObjectsArray: [],
    firstRender() {
        for (let letter of this.lettersObjectsArray ) {
            let letterSpan = document.createElement('span');
            letterSpan.innerHTML = letter.letter;
            letterSpan.id = letter.id;
            dashBoard.appendChild(letterSpan);
        }
    },
    createLetterObjects() {
        const arrayCheckLetters = this.currentText.split('');
        arrayCheckLetters.map((letter, index) => {
           this.lettersObjectsArray.push(new Letter(letter, index));
        });
    },
    compareLetters(current, char) {
        return this.currentText.charAt(current) === char;
    },
    stepBack() {
        let currentLetter = document.getElementById(this.currentPosition.toString());
        this.lettersObjectsArray[this.currentPosition].incorrectStatus = false;
        //Removing classes of previous letter
        currentLetter.className = '';
    },
    savingData(current, char) {
        if (this.compareLetters(current, char)) {
            this.lettersObjectsArray[current].incorrectStatus = false;
        }else {
            this.lettersObjectsArray[current].incorrectStatus = true;
        }
    },
    render(current, char) {
        let currentLetter = document.getElementById(current);
        //Saving data for future needs
        this.savingData(current, char);
        //For old browsers
        //let color = this.compareLetters(current, char) ? 'green' : 'red';
        // currentLetter.style.color = color;
        currentLetter.classList.add(this.compareLetters(current, char) ? 'green' : 'red');
    },
    init() {
        this.createLetterObjects();
        this.firstRender();
    }
};

//Events
input.oninput = () => {
    let inputValue = input.value;

    if (inputValue.length <= 0) {
        globalOptions.currentPosition = null;
    }else {
        globalOptions.currentPosition = inputValue.length -1;
    }

    if (inputValue.length > 1) {
        globalOptions.currentChar = inputValue.charAt(inputValue.length - 1);
    }else {
        globalOptions.currentChar = inputValue;
    }
    //Updating current char color
    globalOptions.render(globalOptions.currentPosition, globalOptions.currentChar);
};

input.addEventListener("keydown", e => {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
        return false;
    }
    if (e.keyCode === 8) {
        globalOptions.stepBack();
    }
}, false);

//Initialization
globalOptions.init();

