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
let currentOperator = Operator.None;
const windowDOM = document.getElementById('window');
windowDOM.innerHTML = firstArgument.join("");
// //Helper Function
// function solveIt(operator: string){
//     if(typeof firstArgument === "number"){
//         if (operator === "divide"){
//             firstArgument = secondArgument / firstArgument;
//         }
//         if (operator === "multiply"){
//             firstArgument = secondArgument * firstArgument
//         }
//         if (operator === "subtract"){
//             firstArgument = secondArgument - firstArgument
//         }
//         if (operator === "add"){
//             firstArgument = secondArgument + firstArgument
//         }
//         //display decimals to the thousandth(0.001)
//         firstArgument = Math.round(firstArgument * 1000) / 1000
//         //if number too big or too small to display, show ERROR
//         if(firstArgument > 9999999999 || firstArgument < 0.00000001){
//             firstArgument="ERROR";
//         }
//         //reset values to proceed with more calculations
//         currentOperator="none";
//         secondArgument=0;
//     }
// }
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
            console.log(targetValue);
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
        windowDOM.innerHTML = firstArgument.join("");
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
        console.log("you clicked an operator");
        const operatorValue = targetValue;
        //IF FIRST TIME USING OPERATOR
        if (currentOperator === Operator.None) {
            currentOperator = operatorValue; //define operation
        }
        //IF NOT FIRST TIME USING OPERATOR
        // if(currentOperator !== "none"){
        //     solveIt(currentOperator) //execute previous operator
        //     currentOperator = operatorValue //queue operator for next calculation
        // }
    }
    // //IF solve button pressed 
    // if(targetElement.matches('#equals')){
    //     solveIt(currentOperator);
    // }
});
