const calculator = {
  displayValue: '0',
  firstOperand: null,
  prevOperator: null,
  isSecondOperand: false,
};

const keys = document.querySelector('.keys');
keys.addEventListener('click', (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
    case '=':
      handleOperator(value);
      break;
    case '±':
      handleNegativePositive(value);
      break;
    case '.':
      handleDecimal(value);
      break;
    case 'clear':
      clearCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        handleDigit(value);
      }
  }

  updateDisplay();
});

function updateDisplay() {
  const screen = document.querySelector('.screen');
  screen.textContent = calculator.displayValue;
}

function handleDigit(digit) {
  const { displayValue, isSecondOperand } = calculator;

  if (isSecondOperand) {
    calculator.displayValue = digit;
    calculator.isSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

function handleNegativePositive(digit) {
  const { displayValue } = calculator;

  let input = parseFloat(displayValue);

  if (!Number.isNaN(input)) {
    calculator.displayValue = String(-displayValue);
    calculator.firstOperand = -displayValue;
  }
}

function handleDecimal(dot) {
  const { displayValue, isSecondOperand } = calculator;

  if (isSecondOperand) {
    calculator.displayValue = '0.';
    calculator.isSecondOperand = false;
    return;
  }

  if (!displayValue.includes(dot)) {
    calculator.displayValue = displayValue + dot;
  }
}

function handleOperator(operator) {
  const { displayValue, firstOperand, prevOperator } = calculator;

  let input = parseFloat(displayValue);

  if (prevOperator && calculator.isSecondOperand) {
    calculator.prevOperator = operator;
    return;
  }

  if (firstOperand === null && !Number.isNaN(input)) {
    calculator.firstOperand = input;
  } else if (prevOperator) {
    const result = operate(prevOperator, firstOperand, input);

    calculator.displayValue = `${parseFloat(result.toFixed(1))}`;
    calculator.firstOperand = result;
  }
  calculator.prevOperator = operator;
  calculator.isSecondOperand = true;
}

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    case '%':
      return firstOperand % secondOperand;
  }

  return secondOperand;
}

function clearCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.isSecondOperand = false;
  calculator.prevOperator = null;
}

updateDisplay();
