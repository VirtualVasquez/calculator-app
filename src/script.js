"use strict";
var Digit;
(function (Digit) {
    Digit["Zero"] = "0";
    Digit["One"] = "1";
    Digit["Two"] = "2";
    Digit["Three"] = "3";
    Digit["Four"] = "4";
    Digit["Five"] = "5";
    Digit["Six"] = "6";
    Digit["Seven"] = "7";
    Digit["Eight"] = "8";
    Digit["Nine"] = "9";
    Digit["Decimal"] = ".";
})(Digit || (Digit = {}));
var Operator;
(function (Operator) {
    Operator["Add"] = "add";
    Operator["Subtract"] = "subtract";
    Operator["Multiply"] = "multiply";
    Operator["Divide"] = "divide";
    Operator["None"] = "none";
})(Operator || (Operator = {}));
let calculation = {
    firstArgument: Digit.Zero,
    secondArgument: Digit.Zero,
    solution: null,
    errorState: false,
    currentOperator: Operator.None
};
const windowDOM = document.getElementById('window');
windowDOM.innerHTML = calculation.firstArgument;
function performOperation(operator, a, b) {
    switch (operator) {
        case Operator.Add:
            return a + b;
        case Operator.Subtract:
            return a - b;
        case Operator.Multiply:
            return a * b;
        case Operator.Divide:
            return b !== 0 ? a / b : undefined; //handle division by zero
        default:
            return undefined;
    }
}
function solveIt(operator) {
    let firstNumber = parseInt(calculation.firstArgument);
    let secondNumber = parseInt(calculation.secondArgument);
    calculation.solution = performOperation(operator, firstNumber, secondNumber);
    if (calculation.solution) {
        //display decimals to the thousandth(0.001)
        calculation.solution = Math.round(calculation.solution * 1000) / 1000;
        //if number too big or too small to display, show ERROR
        if (calculation.solution.toString().length > 9) {
            calculation.errorState = true;
            windowDOM.innerHTML = "ERROR";
        }
        else {
            windowDOM.innerHTML = calculation.solution.toString();
        }
    }
}
function updateArgument(argument, targetValue, maxLength = 9) {
    const digitValues = Object.values(Digit);
    if (targetValue == Digit.Decimal && argument.includes(Digit.Decimal)) {
        return argument;
    }
    if (argument === '0' && targetValue == Digit.Zero) {
        return argument;
    }
    if (digitValues.includes(targetValue) && argument.length < maxLength) {
        if (argument === Digit.Zero) {
            return targetValue;
        }
        else {
            return argument + targetValue;
        }
    }
    return argument;
}
function updateCurrentOperator(operator) {
    if (!calculation.currentOperator) {
        return operator;
    }
    if (!calculation.solution && calculation.secondArgument == Digit.Zero) {
        return operator;
    }
    return Operator.None;
}
window.addEventListener('click', function (event) {
    event.preventDefault(); //prevent window from reloading on button press
    //using type assertion to inform `event.target` as `Element` to then use appropriate methods.
    const targetElement = event.target;
    const targetValue = targetElement.getAttribute('value');
    if (targetValue == null) {
        return;
    }
    //IF reset button pressed
    if (targetValue === "clear") {
        calculation.firstArgument = Digit.Zero;
        calculation.secondArgument = Digit.Zero;
        calculation.currentOperator = Operator.None;
        calculation.errorState = false;
        windowDOM.innerHTML = calculation.firstArgument;
    }
    if (calculation.errorState) {
        return;
    }
    //IF a number is pressed
    if (targetElement.matches('.number')) {
        const digitValue = targetValue;
        if (calculation.currentOperator === Operator.None) {
            calculation.firstArgument = updateArgument(calculation.firstArgument, digitValue);
            windowDOM.innerHTML = calculation.firstArgument;
        }
        if (calculation.currentOperator !== Operator.None) {
            calculation.secondArgument = updateArgument(calculation.secondArgument, digitValue);
            windowDOM.innerHTML = calculation.secondArgument;
        }
    }
    //IF operator selected
    if (targetElement.matches('.operator')) {
        const operatorValue = targetValue;
        if (calculation.firstArgument != Digit.Zero && calculation.secondArgument != Digit.Zero) {
            solveIt(calculation.currentOperator);
            if (!calculation.errorState && calculation.solution) {
                calculation.firstArgument = calculation.solution.toString();
                calculation.secondArgument = Digit.Zero;
                calculation.solution = null;
            }
        }
        calculation.currentOperator = updateCurrentOperator(operatorValue);
    }
    //IF solve button pressed 
    if (targetElement.matches('#equals')) {
        solveIt(calculation.currentOperator);
    }
});
