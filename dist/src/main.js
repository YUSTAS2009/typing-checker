'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Letter Object constructor
var Letter = function Letter(letter) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Letter);

    this.letter = letter;
    this.id = id;
    this.incorrectStatus = false;
};

//DOM elements


var input = document.querySelector(".typing-input");
var dashBoard = document.querySelector('.dashboard');

//Global Options
var globalOptions = {
    currentText: 'There are many variations of passages of Lorem Ipsum available, but the majority ' + 'have suffered alteration in some form, by injected humour, or randomised words which look even slightly believable.',
    currentPosition: null,
    currentChar: '',
    lettersObjectsArray: [],
    firstRender: function firstRender() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.lettersObjectsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var letter = _step.value;

                var letterSpan = document.createElement('span');
                letterSpan.innerHTML = letter.letter;
                letterSpan.id = letter.id;
                dashBoard.appendChild(letterSpan);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },
    createLetterObjects: function createLetterObjects() {
        var _this = this;

        var arrayCheckLetters = this.currentText.split('');
        arrayCheckLetters.map(function (letter, index) {
            _this.lettersObjectsArray.push(new Letter(letter, index));
        });
    },
    compareLetters: function compareLetters(current, char) {
        return this.currentText.charAt(current) === char;
    },
    stepBack: function stepBack() {
        var currentLetter = document.getElementById(this.currentPosition.toString());
        this.lettersObjectsArray[this.currentPosition].incorrectStatus = false;
        //Removing classes of previous letter
        currentLetter.className = '';
    },
    savingData: function savingData(current, char) {
        if (this.compareLetters(current, char)) {
            this.lettersObjectsArray[current].incorrectStatus = false;
        } else {
            this.lettersObjectsArray[current].incorrectStatus = true;
        }
    },
    render: function render(current, char) {
        var currentLetter = document.getElementById(current);
        //Saving data for future needs
        this.savingData(current, char);
        //For old browsers
        //let color = this.compareLetters(current, char) ? 'green' : 'red';
        // currentLetter.style.color = color;
        currentLetter.classList.add(this.compareLetters(current, char) ? 'green' : 'red');
    },
    init: function init() {
        this.createLetterObjects();
        this.firstRender();
    }
};

//Events
input.oninput = function () {
    var inputValue = input.value;

    if (inputValue.length <= 0) {
        globalOptions.currentPosition = null;
    } else {
        globalOptions.currentPosition = inputValue.length - 1;
    }

    if (inputValue.length > 1) {
        globalOptions.currentChar = inputValue.charAt(inputValue.length - 1);
    } else {
        globalOptions.currentChar = inputValue;
    }
    //Updating current char color
    globalOptions.render(globalOptions.currentPosition, globalOptions.currentChar);
};

input.addEventListener("keydown", function (e) {
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
//# sourceMappingURL=main.js.map