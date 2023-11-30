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
let firstArgument = [Digit.Zero];
let secondArgument = [Digit.Zero];
let solution;
let errorState = false;
let currentOperator = Operator.None;
const windowDOM = document.getElementById('window');
windowDOM.innerHTML = firstArgument.join("");
function solveIt(operator) {
    let firstNumber = parseInt(firstArgument.join(""));
    let secondNumber = parseInt(secondArgument.join(""));
    if (operator === Operator.Divide) {
        solution = firstNumber / secondNumber;
    }
    if (operator === Operator.Multiply) {
        solution = firstNumber * secondNumber;
    }
    if (operator === Operator.Subtract) {
        solution = firstNumber - secondNumber;
    }
    if (operator === Operator.Add) {
        solution = firstNumber + secondNumber;
    }
    if (solution) {
        //display decimals to the thousandth(0.001)
        solution = Math.round(solution * 1000) / 1000;
        //if number too big or too small to display, show ERROR
        if (solution.toString().length > 9) {
            errorState = true;
            windowDOM.innerHTML = "ERROR";
        }
        else {
            windowDOM.innerHTML = solution.toString();
        }
    }
}
function updateArgument(argument, targetValue, windowDOM) {
    const digitValues = Object.values(Digit);
    if (targetValue == Digit.Decimal && argument.includes(Digit.Decimal)) {
        return;
    }
    if (argument.length === 1 && argument[0] === '0' && targetValue == Digit.Zero) {
        return;
    }
    if (digitValues.includes(targetValue) && argument.length < 9) {
        if (argument.length === 1
            && argument[0] === Digit.Zero
            && targetValue !== Digit.Zero
            && targetValue !== Digit.Decimal) {
            argument[0] = targetValue;
        }
        else {
            argument.push(targetValue);
        }
    }
    windowDOM.innerHTML = argument.join('');
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
        firstArgument = [Digit.Zero];
        secondArgument = [Digit.Zero];
        currentOperator = Operator.None;
        errorState = false;
        windowDOM.innerHTML = firstArgument.join("");
    }
    if (errorState) {
        return;
    }
    //IF a number is pressed
    if (targetElement.matches('.number')) {
        const digitValue = targetValue;
        if (currentOperator === Operator.None) {
            updateArgument(firstArgument, digitValue, windowDOM);
        }
        if (currentOperator !== Operator.None) {
            updateArgument(secondArgument, digitValue, windowDOM);
        }
    }
    //IF operator selected
    if (targetElement.matches('.operator')) {
        const operatorValue = targetValue;
        currentOperator = operatorValue; //define operation
    }
    //IF solve button pressed 
    if (targetElement.matches('#equals')) {
        solveIt(currentOperator);
    }
});
