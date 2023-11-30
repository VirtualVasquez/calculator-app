enum Digit {
    Zero = '0',
    One = '1',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
    Decimal = '.',
}
enum Operator{
    Add = 'add',
    Subtract = 'subtract',
    Multiply = 'multiply',
    Divide = 'divide',
    None = 'none'
}

type DigitTuple = [Digit, ...Digit[]] & { length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 };
let firstArgument: DigitTuple = [Digit.Zero]; 
let secondArgument: DigitTuple = [Digit.Zero]; 
let currentOperator =  Operator.None;
const windowDOM = document.getElementById('window') as HTMLElement;

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

function updateArgument(
    argument: Digit[],
    targetValue: Digit,
    windowDOM: HTMLElement
) {
    const digitValues = Object.values(Digit) as Digit[];

    if(targetValue == Digit.Decimal && argument.includes(Digit.Decimal)){
        return;
    }
    if(argument.length === 1 && argument[0] === '0' && targetValue == Digit.Zero){
        return;
    }

    if (digitValues.includes(targetValue) && argument.length < 9) {
        if (argument.length === 1 
            && argument[0] === Digit.Zero 
            && targetValue !== Digit.Zero 
            && targetValue !== Digit.Decimal) 
        {
            console.log(targetValue);
            argument[0] = targetValue;
        } else {
            argument.push(targetValue);
        }
    }

    windowDOM.innerHTML = argument.join('');
}

window.addEventListener('click', function(event){

    event.preventDefault() //prevent window from reloading on button press

    //using type assertion to inform `event.target` as `Element` to then use appropriate methods.
    const targetElement = event.target as Element;
    const targetValue = targetElement.getAttribute('value');
    
    if (targetValue == null){
        return;
    }
    
    //IF reset button pressed
    if(targetValue === "clear"){
        firstArgument = [Digit.Zero];
        secondArgument  = [Digit.Zero];
        currentOperator = Operator.None;
        windowDOM.innerHTML = firstArgument.join("");
    }

    //IF a number is pressed
    if(targetElement.matches('.number')){
        const digitValue = targetValue as Digit;
        if (currentOperator === Operator.None) {
            updateArgument(firstArgument, digitValue, windowDOM);
        }
        if (currentOperator !== Operator.None) {
            updateArgument(secondArgument, digitValue, windowDOM);
        }
    }

    //IF operator selected
    if(targetElement.matches('.operator')){
        console.log("you clicked an operator");

        const operatorValue = targetValue as Operator;

        //IF FIRST TIME USING OPERATOR
        if(currentOperator === Operator.None){
            currentOperator = operatorValue //define operation
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
})



