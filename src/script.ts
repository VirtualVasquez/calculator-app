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

let firstArgument: string = Digit.Zero;
let secondArgument: string = Digit.Zero;
let solution: null | number;
let errorState = false; 
let currentOperator =  Operator.None;
const windowDOM = document.getElementById('window') as HTMLElement;

windowDOM.innerHTML = firstArgument;

function solveIt(operator: string){

    let firstNumber = parseInt(firstArgument);
    let secondNumber = parseInt(secondArgument);
    
        if (operator === Operator.Divide){
            solution = firstNumber / secondNumber
        }
        if (operator === Operator.Multiply){
            solution = firstNumber * secondNumber
        }
        if (operator === Operator.Subtract){
            solution = firstNumber - secondNumber
        }
        if (operator === Operator.Add){
            solution = firstNumber + secondNumber
        }
        if(solution){
            //display decimals to the thousandth(0.001)
            solution = Math.round(solution * 1000) / 1000
            //if number too big or too small to display, show ERROR
            if(solution.toString().length > 9){
                errorState=true;
                windowDOM.innerHTML = "ERROR";
            }
            else{
                windowDOM.innerHTML = solution.toString();
            }
        }
}

function updateArgument(
    argument: string,
    targetValue: Digit,
) {
    const digitValues = Object.values(Digit) as string[];

    if(targetValue == Digit.Decimal && argument.includes(Digit.Decimal)){
        return argument;
    }
    if(argument === '0' && targetValue == Digit.Zero){
        return argument;
    }

    if (digitValues.includes(targetValue) && argument.length < 9) {
        if (argument === Digit.Zero) 
        {
            return targetValue;
        } else {
            return argument + targetValue;
        }
    }

    return argument;
}

function updateCurrentOperator(operator: Operator){
    if(!currentOperator){
        return operator
    }
    if(!solution && secondArgument == Digit.Zero){
        return operator;
    }
    return Operator.None;     
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
        firstArgument = Digit.Zero;
        secondArgument  = Digit.Zero;
        currentOperator = Operator.None;
        errorState = false;
        windowDOM.innerHTML = firstArgument;
    }
    if(errorState){
        return;
    }
    //IF a number is pressed
    if(targetElement.matches('.number')){
        const digitValue = targetValue as Digit;
        if (currentOperator === Operator.None) {
            firstArgument = updateArgument(firstArgument, digitValue);
            windowDOM.innerHTML = firstArgument;
        }
        if (currentOperator !== Operator.None) {
            secondArgument = updateArgument(secondArgument, digitValue);
            windowDOM.innerHTML = secondArgument;
        }
    }
    //IF operator selected
    if(targetElement.matches('.operator')){
        const operatorValue = targetValue as Operator;

        if(firstArgument != Digit.Zero && secondArgument != Digit.Zero){
            solveIt(currentOperator);
            if(!errorState && solution){
                firstArgument = solution.toString();
                secondArgument = Digit.Zero;
                solution = null;   
            }
        }
        currentOperator = updateCurrentOperator(operatorValue);    
    }
    //IF solve button pressed 
    if(targetElement.matches('#equals')){
        solveIt(currentOperator);
    }
})



