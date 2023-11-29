"use strict";
const windowDOM = document.getElementById('window');
//using a union type to make currentValue a number or string
let currentValue = 0;
let previousValue = 0;
let currentOperator = "none";
windowDOM.innerHTML = currentValue.toString();
//Helper Function
function solveIt(operator) {
    if (typeof currentValue === "number") {
        if (operator === "divide") {
            currentValue = previousValue / currentValue;
        }
        if (operator === "multiply") {
            currentValue = previousValue * currentValue;
        }
        if (operator === "subtract") {
            currentValue = previousValue - currentValue;
        }
        if (operator === "add") {
            currentValue = previousValue + currentValue;
        }
        //display decimals to the thousandth(0.001)
        currentValue = Math.round(currentValue * 1000) / 1000;
        //if number too big or too small to display, show ERROR
        if (currentValue > 9999999999 || currentValue < 0.00000001) {
            currentValue = "ERROR";
        }
        //reset values to proceed with more calculations
        currentOperator = "none";
        previousValue = 0;
    }
}
window.addEventListener('click', function (event) {
    console.log("test");
    //using type asserction to inform `event.target` as `Element` to then use appropriate methods.
    const targetElement = event.target;
    const targetValue = targetElement.getAttribute('value');
    if (targetValue !== null) {
        //IF reset button pressed
        if (targetElement.matches('#clear')) {
            currentValue = 0;
            previousValue = 0;
            currentOperator = "none";
        }
        //IF a number is pressed
        if (targetElement.matches('.number')) {
            //IF writing first value
            if (currentOperator == "none" && previousValue == 0 && typeof currentValue == "number") {
                //Display no more than 10 digits on the screen
                if (currentValue < 1000000000) {
                    //IF value is zero, Prevent Leading Zeroes
                    if (currentValue === 0) {
                        currentValue = targetValue.toString();
                    }
                    //ELSE concat the number
                    if (typeof currentValue === "string" && currentValue != "Error") {
                        currentValue = currentValue.concat(targetValue.toString());
                    }
                }
            }
            //IF an operator has been selected
            if (currentOperator !== "none") {
                //IF first digit of new value, save initial value, then display new value
                if (previousValue == 0 && typeof currentValue == "string" && currentValue != "Error") {
                    previousValue = parseInt(currentValue);
                    currentValue = targetValue.toString();
                }
                //ELSE concat digit to new value
                if (typeof currentValue === "string" && currentValue != "Error") {
                    currentValue = currentValue.concat(targetValue.toString());
                }
            }
        }
        //IF the decimal is pressed
        if (targetElement.matches('#decimal')) {
            //prevent additional decimals
            if (typeof currentValue == "string" && !currentValue.includes(".")) {
                currentValue = currentValue.concat(targetValue.toString());
            }
        }
        //IF operator selected
        if (targetElement.matches('.operator')) {
            //IF FIRST TIME USING OPERATOR
            if (currentOperator === "none") {
                currentOperator = targetValue; //define operation
                return event.preventDefault(); //prevent next step due to defined operation
            }
            //IF NOT FIRST TIME USING OPERATOR
            if (currentOperator !== "none") {
                solveIt(currentOperator); //execute previous operator
                currentOperator = targetValue; //queue operator for next calculation
            }
        }
        //IF solve button pressed 
        if (targetElement.matches('#equals')) {
            solveIt(currentOperator);
        }
    }
    event.preventDefault(); //prevent window from reloading on button press
    windowDOM.innerHTML = currentValue.toString(); //write to DOM value/calculation
});
