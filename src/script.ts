const windowDOM = document.getElementById('window');

//using a union type to make currentValue a number or string
let currentValue: number | string = 0;
let previousValue = 0;
let currentOperator = "none";
windowDOM.innerHTML = currentValue.toString();

//Helper Function
function solveIt(operator){

    if(typeof currentValue === "number"){
        if (operator === "divide"){
            currentValue = previousValue / currentValue;
        }
        if (operator === "multiply"){
            currentValue = previousValue * currentValue
        }
        if (operator === "subtract"){
            currentValue = previousValue - currentValue
        }
        if (operator === "add"){
            currentValue = previousValue + currentValue
        }
        //display decimals to the thousandth(0.001)
        currentValue = Math.round(currentValue * 1000) / 1000
        //if number too big or too small to display, show ERROR
        if(currentValue > 9999999999 || currentValue < 0.00000001){
            currentValue="ERROR";
        }
        //reset values to proceed with more calculations
        currentOperator="none";
        previousValue=0;
    }

}


window.addEventListener('click', function(event){

    //IF reset button pressed
    if(event.target.matches('#clear')){
        currentValue = "0";
        previousValue  = "0";
        currentOperator = "none";
    }
    //IF a number is pressed
    if(event.target.matches('.number')){
        //IF writing first value
        if(currentOperator == "none" && previousValue== "0"){
            //Display no more than 10 digits on the screen
            if(currentValue.length < 10){
                //IF value is zero, Prevent Leading Zeroes
                if(currentValue === "0"){
                    currentValue = event.target.value;
                } 
                //ELSE concat the number
                else{
                    currentValue = currentValue.concat(event.target.value);
                }
            }
        }
        //IF an operator has been selected
        if(currentOperator !== "none"){
            //IF first digit of new value, save initial value, then display new value
            if(previousValue == "0"){
                previousValue = currentValue
                currentValue = event.target.value;
            }
            //ELSE concat digit to new value
            else{
                currentValue = currentValue.concat(event.target.value);
            }
        }

    }
    //IF the decimal is pressed
    if(event.target.matches('#decimal')){
        //prevent additional decimals
        if(!currentValue.includes(".")){
            currentValue = currentValue.concat(event.target.value)
        }
    }
    //IF operator selected
    if(event.target.matches('.operator')){
        //IF FIRST TIME USING OPERATOR
        if(currentOperator === "none"){
            currentOperator = event.target.value //define operation
            return event.preventDefault() //prevent next step due to defined operation
        }
        //IF NOT FIRST TIME USING OPERATOR
        if(currentOperator !== "none"){
            solveIt(currentOperator) //execute previous operator
            currentOperator = event.target.value; //queue operator for next calculation
        }

    }
    //IF solve button pressed 
    if(event.target.matches('#equals')){
        solveIt(currentOperator);
    }

    event.preventDefault() //prevent window from reloading on button press
    windowDOM.innerHTML = currentValue; //write to DOM value/calculation

})



