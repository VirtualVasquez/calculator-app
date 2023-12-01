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

interface Calculation { 
    firstArgument: string;
    secondArgument: string;
    solution: null | number;
    errorState: boolean;
    currentOperator: Operator;
}

let calculation: Calculation = {
    firstArgument: Digit.Zero,
    secondArgument: Digit.Zero,
    solution: null,
    errorState: false,
    currentOperator: Operator.None
};

const windowDOM = document.getElementById('window') as HTMLElement;

windowDOM.innerHTML = calculation.firstArgument;

function solveIt(operator: string){

    let firstNumber = parseInt(calculation.firstArgument);
    let secondNumber = parseInt(calculation.secondArgument);
    
        if (operator === Operator.Divide){
            calculation.solution = firstNumber / secondNumber
        }
        if (operator === Operator.Multiply){
            calculation.solution = firstNumber * secondNumber
        }
        if (operator === Operator.Subtract){
            calculation.solution = firstNumber - secondNumber
        }
        if (operator === Operator.Add){
            calculation.solution = firstNumber + secondNumber
        }
        if(calculation.solution){
            //display decimals to the thousandth(0.001)
            calculation.solution = Math.round(calculation.solution * 1000) / 1000
            //if number too big or too small to display, show ERROR
            if(calculation.solution.toString().length > 9){
                calculation.errorState=true;
                windowDOM.innerHTML = "ERROR";
            }
            else{
                windowDOM.innerHTML = calculation.solution.toString();
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
    if(!calculation.currentOperator){
        return operator
    }
    if(!calculation.solution && calculation.secondArgument == Digit.Zero){
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
        calculation.firstArgument = Digit.Zero;
        calculation.secondArgument  = Digit.Zero;
        calculation.currentOperator = Operator.None;
        calculation.errorState = false;
        windowDOM.innerHTML = calculation.firstArgument;
    }
    if(calculation.errorState){
        return;
    }
    //IF a number is pressed
    if(targetElement.matches('.number')){
        const digitValue = targetValue as Digit;
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
    if(targetElement.matches('.operator')){
        const operatorValue = targetValue as Operator;

        if(calculation.firstArgument != Digit.Zero && calculation.secondArgument != Digit.Zero){
            solveIt(calculation.currentOperator);
            if(!calculation.errorState && calculation.solution){
                calculation.firstArgument = calculation.solution.toString();
                calculation.secondArgument = Digit.Zero;
                calculation.solution = null;   
            }
        }
        calculation.currentOperator = updateCurrentOperator(operatorValue);    
    }
    //IF solve button pressed 
    if(targetElement.matches('#equals')){
        solveIt(calculation.currentOperator);
    }
})



