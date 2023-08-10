'use strict';

// ***************************
// THEMES SECTION
// ***************************

// ***************************
// THEMES DATA
// ***************************
const firstThemeData = {
  '--body-bg': 'hsl(222, 26%, 31%)',
  '--body-font': 'hsl(0, 0%, 100%)',

  '--slider-bg': 'hsl(223, 31%, 20%)',
  '--switcher-bg': 'hsl(6, 63%, 50%)',

  '--display-bg': 'hsl(224, 36%, 15%)',
  '--buttons-container-bg': 'hsl(223, 31%, 20%)',

  '--keys-bg': 'hsl(30, 25%, 89%)',
  '--keys-shadow': 'hsl(28, 16%, 65%)',
  '--keys-font': 'hsl(221, 14%, 31%)',

  '--reset-del-btn-bg': 'hsl(225, 21%, 49%)',
  '--reset-del-btn-shadow': 'hsl(224, 28%, 35%)',
  '--reset-del-font': 'hsl(0, 0%, 100%)',
  '--equal-btn-bg': 'hsl(6, 63%, 50%)',
  '--equal-btn-shadow': 'hsl(6, 70%, 34%)',
  '--equal-font': 'hsl(0, 0%, 100%)',
};

const secondThemeData = {
  '--body-bg': 'hsl(0, 0%, 90%)',
  '--body-font': 'hsl(60, 10%, 19%)',

  '--slider-bg': 'hsl(0, 5%, 81%)',
  '--switcher-bg': 'hsl(6, 63%, 50%)',

  '--display-bg': 'hsl(0, 0%, 93%)',
  '--buttons-container-bg': 'hsl(0, 5%, 81%)',

  '--keys-bg': 'hsl(45, 7%, 89%)',
  '--keys-shadow': 'hsl(35, 11%, 61%)',
  '--keys-font': 'hsl(60, 10%, 19%)',

  '--reset-del-btn-bg': 'hsl(185, 42%, 37%)',
  '--reset-del-btn-shadow': 'hsl(185, 58%, 25%)',
  '--reset-del-font': 'hsl(0, 0%, 100%)',
  '--equal-btn-bg': 'hsl(25, 98%, 40%)',
  '--equal-btn-shadow': 'hsl(25, 99%, 27%)',
  '--equal-font': 'hsl(0, 0%, 100%)',
};

const thirdThemeData = {
  '--body-bg': 'hsl(268, 75%, 9%)',
  '--body-font': 'hsl(52, 100%, 62%)',

  '--slider-bg': 'hsl(268, 71%, 12%)',
  '--switcher-bg': 'hsl(176, 100%, 44%)',

  '--display-bg': 'hsl(268, 71%, 12%)',
  '--buttons-container-bg': 'hsl(268, 71%, 12%)',

  '--keys-bg': 'hsl(268, 47%, 21%)',
  '--keys-shadow': 'hsl(290, 70%, 36%)',
  '--keys-font': 'hsl(52, 100%, 62%)',

  '--reset-del-btn-bg': 'hsl(281, 89%, 26%)',
  '--reset-del-btn-shadow': 'hsl(285, 91%, 52%)',
  '--reset-del-font': 'hsl(0, 0%, 100%)',
  '--equal-btn-bg': 'hsl(176, 100%, 44%)',
  '--equal-btn-shadow': 'hsl(177, 92%, 70%)',
  '--equal-font': 'hsl(198, 20%, 13%)',
};

// ***************************
// SET THEMES VARIABLES
// ***************************
const setThemeVariables = function (vars) {
  const root = document.querySelector(':root');

  Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
};

// ***************************
// SWITCH THEMES
// ***************************
const switchThemes = function () {
  let num = 0;
  let bgColor, fontColor;
  const slider = document.querySelector('.slider');

  slider.addEventListener('click', function (e) {
    if (e.target.classList.contains('switcher')) {
      num++;
      const switcher = e.target;
      switcher.style.transform = `translateX(${num * 100}%)`;

      if (num === 3) {
        switcher.style.transform = 'translateX(0)';
        num = 0;
      }
    }

    if (num === 0) setThemeVariables(firstThemeData);
    if (num === 1) {
      setThemeVariables(secondThemeData);
      resultDisplay.style.color = 'hsl(60, 10%, 49%)';
    }
    if (num === 2) setThemeVariables(thirdThemeData);
  });
};

switchThemes();

// ***************************
// CALCULATOR SECTION
// ***************************
const display = document.querySelector('.display');
const resultDisplay = document.querySelector('.display--1');
const btnContainer = document.querySelector('.btn-container');
const del = document.querySelector('.del');
const reset = document.querySelector('.reset');
const equal = document.querySelector('.equal');

let firstNumber,
  operator,
  secondNumber,
  result,
  message,
  calculated,
  calculation;
let hasDot = false;
let numArr = [];

// GENERAL FUNCTIONS
// *************************************************
const addErrorMessage = function (message) {
  display.style.fontSize = '2.6rem';
  display.textContent = message;
};

const resetCalc = function () {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  result = '';
  hasDot = false;
  numArr = [];
  resultDisplay.textContent = '';
  display.style.fontSize = '3.4rem';
  display.textContent = '';
  calculated = false;
};

const resetData = function () {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  resultDisplay.textContent = '';
};

const displayNumber = function (btn) {
  if (
    display.textContent === '+' ||
    display.textContent === '-' ||
    display.textContent === '/' ||
    display.textContent === 'x'
  )
    display.textContent = '';

  if (
    display.textContent !== '0' &&
    display.textContent !== "Can't divide by Zero!" &&
    !calculated
  ) {
    if (btn.classList.contains('point')) {
      if (!hasDot) {
        display.textContent += btn.textContent;
        hasDot = true;
      }
    } else {
      display.textContent += btn.textContent;
    }
  }

  if (display.textContent === '0') {
    if (btn.classList.contains('point')) {
      if (!hasDot) {
        display.textContent += btn.textContent;
        hasDot = true;
      }
    } else {
      display.textContent = btn.textContent;
    }
  }

  if (display.textContent === "Can't divide by Zero!") {
    display.textContent = btn.textContent;
  }

  if (calculated && display.textContent !== "Can't divide by Zero!") {
    if (btn.classList.contains('point')) return;
    display.textContent = btn.textContent;
    calculated = false;
  }

  numArr.push(display.textContent);

  // **********************************************
  // **********************************************
  // **********************************************
  if (!operator) {
    firstNumber = Number.parseFloat(numArr.at(-1));

    if (!btn.classList.contains('point'))
      resultDisplay.textContent = `= ${firstNumber}`;
  } else {
    secondNumber = Number.parseFloat(numArr.at(-1));
  }

  if (secondNumber === 0 && operator === '/') {
    resetCalc();
    message = "Can't divide by Zero!";
    addErrorMessage(message);
  }
};

const displayOperator = function (btn) {
  if (
    display.textContent === "Can't divide by Zero!" ||
    display.textContent === ''
  )
    return;

  display.style.fontSize = '3.4rem';
  display.textContent = btn.textContent;

  if (
    (firstNumber || firstNumber === 0) &&
    operator &&
    (secondNumber || secondNumber === 0)
  ) {
    calculation = Number(calc(firstNumber, operator, secondNumber));
    resultDisplay.textContent = `= ${calculation}`;
    firstNumber = Number.parseFloat(calculation);
    operator = '';
    secondNumber = '';
    numArr = [];
  }

  operator = btn.textContent;

  hasDot = false;
};

const calc = function (first, oper, second) {
  switch (oper) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case 'x':
      result = first * second;
      break;
    case '/':
      result = first / second;
      break;
  }
  return result;
};

// MAIN PART
// ************************************************
btnContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  // DISPLAY NUMBERS
  if (btn.classList.contains('number')) {
    display.style.fontSize = '3.4rem';
    displayNumber(btn);
  }

  // DISPLAY OPERATORS
  if (btn.classList.contains('operator')) {
    displayOperator(btn);
  }

  // CLICKED EFFECT
  btn.classList.add('translate-effect');
  btn.addEventListener('transitionend', () => {
    btn.classList.remove('translate-effect');
  });

  // const transitionDuration = 300; // in milliseconds, should match the transition time in CSS
  // setTimeout(() => {
  //     animatedButton.classList.toggle('translate-effect');
  // }, transitionDuration);
});

// RESET CALCULATOR
// ************************************************
reset.addEventListener('click', resetCalc);

// DELETE CHARACTER
// ************************************************
del.addEventListener('click', function () {
  if (!display.textContent || calculated) return;
  if (display.textContent === "Can't divide by Zero!") resetCalc();

  if (!operator) {
    display.textContent = display.textContent.slice(0, -1);
    resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
    if (display.textContent === '') {
      resultDisplay.textContent = '';
    }
    numArr.push(display.textContent);
    firstNumber = Number.parseFloat(numArr.at(-1));
  }
  if (secondNumber) {
    display.textContent = display.textContent.slice(0, -1);
    numArr.push(display.textContent);
    secondNumber = Number.parseFloat(numArr.at(-1));
    if (display.textContent === '') display.textContent = operator;
    console.log(secondNumber);
  }

  if (!display.textContent.includes('.')) hasDot = false;
});

// CALCULATE
// ************************************************
equal.addEventListener('click', function () {
  if (
    !display.textContent ||
    calculated ||
    display.textContent === "Can't divide by Zero!"
  )
    return;

  if (firstNumber && operator && secondNumber) {
    calculation = Number(calc(firstNumber, operator, secondNumber));

    resultDisplay.textContent = `= ${calculation}`;
    firstNumber = Number.parseFloat(calculation);
    display.textContent = calculation;
    operator = '';
    secondNumber = '';
    numArr = [];
  } else {
    display.textContent = firstNumber;
  }

  calculated = true;
  if (!display.textContent.includes('.')) hasDot = false;
});
