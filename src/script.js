"use strict";
const windowDOM = document.getElementById('window');
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
    }
    //IF a number is pressed
    if (targetElement.matches('.number')) {
        const digitValues = Object.values(Digit);
        const digitValue = targetValue;
        //IF writing first value            
        if (currentOperator == Operator.None) {
            //Prevent Leading Zeroes
            //TURN LINES 94 TO 104 INTO A REUSABLE FUNCTION
            //prevent more than one decimal
            if (targetValue == Digit.Decimal && firstArgument.includes(Digit.Decimal)) {
                return;
            }
            if (digitValues.includes(digitValue) && firstArgument.length < 9) {
                if (firstArgument.length === 1 && firstArgument[0] === Digit.Zero && digitValue != Digit.Zero) {
                    firstArgument[0] = digitValue;
                }
                else {
                    firstArgument.push(digitValue);
                }
            }
            windowDOM.innerHTML = firstArgument.join("");
        }
        //IF an operator has been selected
        if (currentOperator !== "none") {
            //TURN LINES 112 TO 123 INTO A REUSABLE FUNCTION
            if (targetValue == Digit.Decimal && secondArgument.includes(Digit.Decimal)) {
                return;
            }
            if (digitValues.includes(digitValue) && secondArgument.length < 9) {
                if (secondArgument.length === 1 && secondArgument[0] === Digit.Zero && digitValue != Digit.Zero) {
                    secondArgument[0] = digitValue;
                }
                else {
                    secondArgument.push(digitValue);
                }
            }
            windowDOM.innerHTML = secondArgument.join("");
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
    // event.preventDefault() //prevent window from reloading on button press
    //write to DOM value/calculation
});
