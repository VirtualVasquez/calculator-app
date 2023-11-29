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
let currentInputs = [Digit.Zero];
let previousInputs = [Digit.Zero];
let currentOperator = Operator.None;
windowDOM.innerHTML = currentInputs.join("");
// //Helper Function
// function solveIt(operator: string){
//     if(typeof currentInputs === "number"){
//         if (operator === "divide"){
//             currentInputs = previousInputs / currentInputs;
//         }
//         if (operator === "multiply"){
//             currentInputs = previousInputs * currentInputs
//         }
//         if (operator === "subtract"){
//             currentInputs = previousInputs - currentInputs
//         }
//         if (operator === "add"){
//             currentInputs = previousInputs + currentInputs
//         }
//         //display decimals to the thousandth(0.001)
//         currentInputs = Math.round(currentInputs * 1000) / 1000
//         //if number too big or too small to display, show ERROR
//         if(currentInputs > 9999999999 || currentInputs < 0.00000001){
//             currentInputs="ERROR";
//         }
//         //reset values to proceed with more calculations
//         currentOperator="none";
//         previousInputs=0;
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
        currentInputs = [Digit.Zero];
        previousInputs = [Digit.Zero];
        currentOperator = Operator.None;
    }
    //IF a number is pressed
    if (targetElement.matches('.number')) {
        const digitValues = Object.values(Digit);
        const digitValue = targetValue;
        //IF writing first value            
        if (currentOperator == Operator.None) {
            //Prevent Leading Zeroes
            //prevent more than one decimal
            if (targetValue == Digit.Decimal && currentInputs.includes(Digit.Decimal)) {
                return;
            }
            if (digitValues.includes(digitValue) && currentInputs.length < 9) {
                if (currentInputs.length === 1 && currentInputs[0] === Digit.Zero && digitValue != Digit.Zero) {
                    currentInputs[0] = digitValue;
                }
                else {
                    currentInputs.push(digitValue);
                }
            }
        }
        //IF an operator has been selected
        // if(currentOperator !== "none"){
        //     //IF first digit of new value, save initial value, then display new value
        //     if(previousInputs == 0 && typeof currentInputs == "string" && currentInputs != "Error"){
        //         previousInputs = parseInt(currentInputs);
        //         currentInputs = targetValue.toString();
        //     }
        //     //ELSE concat digit to new value
        //     if(typeof currentInputs === "string" && currentInputs != "Error"){
        //         currentInputs = currentInputs.concat(targetValue.toString());
        //     }
        // }
    }
    // //IF the decimal is pressed
    // if(targetElement.matches('#decimal')){
    //     //prevent additional decimals
    //     if(typeof currentInputs == "string" && !currentInputs.includes(".")){
    //         currentInputs = currentInputs.concat(targetValue.toString());
    //     }
    // }
    // //IF operator selected
    // if(targetElement.matches('.operator')){
    //     //IF FIRST TIME USING OPERATOR
    //     if(currentOperator === "none"){
    //         currentOperator = targetValue //define operation
    //         return event.preventDefault() //prevent next step due to defined operation
    //     }
    //     //IF NOT FIRST TIME USING OPERATOR
    //     if(currentOperator !== "none"){
    //         solveIt(currentOperator) //execute previous operator
    //         currentOperator = targetValue //queue operator for next calculation
    //     }
    // }
    // //IF solve button pressed 
    // if(targetElement.matches('#equals')){
    //     solveIt(currentOperator);
    // }
    // event.preventDefault() //prevent window from reloading on button press
    windowDOM.innerHTML = currentInputs.join(""); //write to DOM value/calculation
});
