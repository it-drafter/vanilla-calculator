const calcButtons = document.querySelectorAll('.grid-container div, .memory div');
const displayMain = document.querySelector('#displaymain');
const displayAux1 = document.querySelector('#displayaux1');
const displayAuxOp = document.querySelector('#displayauxop');
const displayAux2 = document.querySelector('#displayaux2');
const memoryDiv = document.querySelector('#showmemory');
let memory;

for (const element of calcButtons){
        element.addEventListener('click', clickHandler, false);
}

document.addEventListener('keydown', (e) => {
    switch (e.key){
        case '0':
            numericHandler(0, 'zero');
            break
        case '1':
            numericHandler(1, 'one');
            break
        case '2':
            numericHandler(2, 'two');
            break
        case '3':
            numericHandler(3, 'three');
            break
        case '4':
            numericHandler(4, 'four');
            break
        case '5':
            numericHandler(5, 'five');
            break
        case '6':
            numericHandler(6, 'six');
            break
        case '7':
            numericHandler(7, 'seven');
            break
        case '8':
            numericHandler(8, 'eight');
            break
        case '9':
            numericHandler(9, 'nine');
            break
        case 'Backspace':
            backspaceHandler();
            break
        case '/':
            divideHandler();
            break
        case '*':
            multiplyHandler();
            break
        case '-':
            subtractHandler();
            break
        case '+':
            addHandler();
            break
        case '.':
            decimalHandler();
            break
        case 'Enter':
            equalsHandler();
            break
}
})

//------------------------------------------------------


function resLength(res){

    if (`${res}`.length > 15){
        if (res > Number.MAX_SAFE_INTEGER){
            res = Infinity;
        } else {
            res = parseFloat(res.toPrecision(15));
        }
    }

    return res;
}

//------------------------------------------------------

function numericHandler(numeric, alphabetic){
    console.log(`print ${numeric}`);

    switch (true){
        case ((displayAuxOp.innerHTML === '') && (displayMain.innerHTML === 'ready' || displayMain.innerHTML === '')) && (((displayAux1.innerHTML[0] !== '0') || (displayAux1.innerHTML.substring(0, 2) === '0.'))):

            if(displayAux1.innerHTML.length >= 20 || parseFloat(displayAux1.innerHTML) >= Number.MAX_SAFE_INTEGER / 100){
                return false;
            }

            displayAux1.innerHTML += numeric;
            displayMain.innerHTML = '';
            
            break;

        case (displayAuxOp.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))) && (((displayAux2.innerHTML[0] !== '0') || (displayAux2.innerHTML.substring(0, 2) === '0.'))):

            if(displayAux2.innerHTML.length >= 20 || parseFloat(displayAux2.innerHTML) >= Number.MAX_SAFE_INTEGER / 100){
                return false;
            }

            displayAux2.innerHTML += numeric;

            break;

        case !isNaN(parseFloat(displayMain.innerHTML)):
            displayMain.innerHTML = '';
            displayAux2.innerHTML = '';
            displayAuxOp.innerHTML = '';
            displayAux1.innerHTML = numeric;
            break;

        default:
            console.log(`default case "${alphabetic}" - nothing to see here`);
            break;
    }
}

function backspaceHandler(){
    console.log('print backspace');

    (displayAux1.innerHTML.length > 0) &&
    (displayAuxOp.innerHTML.length === 0) &&
    (displayAux2.innerHTML.length === 0) &&
    (displayAux1.innerHTML = displayAux1.innerHTML.slice(0, -1));

    (displayAux1.innerHTML.length > 0) &&
    (displayAuxOp.innerHTML.length > 0) &&
    (displayAux2.innerHTML.length === 0) &&
    (displayAuxOp.innerHTML = displayAuxOp.innerHTML.slice(0, -1));

    (displayAux1.innerHTML.length > 0) &&
    (displayAuxOp.innerHTML.length > 0) &&
    (displayAux2.innerHTML.length > 0) &&
    (displayAux2.innerHTML.length > 0) &&
    (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') &&
    (displayAux2.innerHTML = displayAux2.innerHTML.slice(0, -1));

    (displayAux1.innerHTML.length > 0) &&
    (displayAuxOp.innerHTML.length > 0) &&
    (displayAux2.innerHTML.length > 0) &&
    (displayAux2.innerHTML.length > 0) &&
    (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') &&
    (displayAux2.innerHTML = displayAux2.innerHTML.slice(0, -1)) &&
    (displayMain.innerHTML = '');

    (displayAux1.innerHTML.length === 0) &&
    (displayAuxOp.innerHTML.length === 0) &&
    (displayAux2.innerHTML.length === 0) &&
    (displayMain.innerHTML = 'ready');
}

function divideHandler(){
    console.log('print divide');

    switch(true){
        case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAux2.innerHTML.length === 0):
            displayAuxOp.innerHTML = '&#247;';
            break;

        case (displayMain.innerHTML !== 'ready') && (displayMain.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '='):
            displayAux1.innerHTML = displayMain.innerHTML;
            displayAuxOp.innerHTML = '&#247;';
            displayAux2.innerHTML = '';
            displayMain.innerHTML = '';
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '&#247;';
            displayAux2.innerHTML = '';
            
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '&#247;';
            displayAux2.innerHTML = '';
            
            break;

        default:
            console.log('default case "divide" - nothing to see here');
            break;
    }
}

function multiplyHandler(){
    console.log('print multiply');

    switch(true){
        case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAux2.innerHTML.length === 0):
            displayAuxOp.innerHTML = '&#215;';
            break;

        case (displayMain.innerHTML !== 'ready') && (displayMain.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '='):
            displayAux1.innerHTML = displayMain.innerHTML;
            displayAuxOp.innerHTML = '&#215;';
            displayAux2.innerHTML = '';
            displayMain.innerHTML = '';
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '&#215;';
            displayAux2.innerHTML = '';
            
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '&#215;';
            displayAux2.innerHTML = '';
            
            break;

        default:
            console.log('default case "multiply" - nothing to see here');
            break;
    }
}

function subtractHandler(){
    console.log('print subtract');

    switch(true){
        case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAux2.innerHTML.length === 0):
            displayAuxOp.innerHTML = '-';
            break;

        case (displayMain.innerHTML !== 'ready') && (displayMain.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '='):
            displayAux1.innerHTML = displayMain.innerHTML;
            displayAuxOp.innerHTML = '-';
            displayAux2.innerHTML = '';
            displayMain.innerHTML = '';
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '-';
            displayAux2.innerHTML = '';
            
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(2, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '-';
            displayAux2.innerHTML = '';
            
            break;
            
        default:
            console.log('default case "subtract" - nothing to see here');
            break;
    }
}

function addHandler(){
    console.log('print add');

    switch(true){
        case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAux2.innerHTML.length === 0):
            displayAuxOp.innerHTML = '+';
            break;

        case (displayMain.innerHTML !== 'ready') && (displayMain.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '='):
            displayAux1.innerHTML = displayMain.innerHTML;
            displayAuxOp.innerHTML = '+';
            displayAux2.innerHTML = '';
            displayMain.innerHTML = '';
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '+';
            displayAux2.innerHTML = '';
            
            break;

        case (displayMain.innerHTML === '') && (displayAux1.innerHTML.length > 0) && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

            if(displayAuxOp.innerHTML === '+'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '-'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '×'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));
            } else if(displayAuxOp.innerHTML === '÷'){
                displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                displayAux1.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));
            }

            displayAuxOp.innerHTML = '+';
            displayAux2.innerHTML = '';
            
            break;

        default:
            console.log('default case "add" - nothing to see here');
            break;
    }
}

function decimalHandler(){
    console.log('print decimal');

    switch (true){
        case (displayAuxOp.innerHTML === '') && (displayMain.innerHTML === 'ready'):
            displayAux1.innerHTML += '0.';
            displayMain.innerHTML = '';
            break
        case (displayAuxOp.innerHTML === '') && (displayMain.innerHTML === '') && (!displayAux1.innerHTML.includes('.')):
            displayAux1.innerHTML += '.';
            break
        case (displayAuxOp.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML)) && (displayAux2.innerHTML === '')):
            displayAux2.innerHTML += '0.';
            break
        case (displayAuxOp.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))) && (!displayAux2.innerHTML.includes('.'))  && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):
            displayAux2.innerHTML += '.';
            break;
        case !isNaN(parseFloat(displayMain.innerHTML)):
            displayMain.innerHTML = '';
            displayAux2.innerHTML = '';
            displayAuxOp.innerHTML = '';
            displayAux1.innerHTML = '0.';
            break;
        default:
            console.log('default case "decimal" - nothing to see here');
            break;
    }
}

function equalsHandler(){
    console.log('print equals');

    switch(displayAuxOp.innerHTML){

        case '+':
            switch(true){
                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));

                    displayAux2.innerHTML += '=';

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML === ''):

                    if(displayAux1.innerHTML >= 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `${displayAux1.innerHTML}=`;
                    } else if(displayAux1.innerHTML < 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `(${displayAux1.innerHTML})=`;
                    }

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) + Number(displayAux2.innerHTML.slice(0, -1)));

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -2);

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) + Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;
                    

                default:
                    console.log('default case "equals plus" - nothing to see here');
                    break;
            }      
        break;

        case '-':
            switch(true){
                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux2.innerHTML));

                    displayAux2.innerHTML += '=';

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML === ''):

                    if(displayAux1.innerHTML >= 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `${displayAux1.innerHTML}=`;
                    } else if(displayAux1.innerHTML < 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) - Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `(${displayAux1.innerHTML})=`;
                    }

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) - Number(displayAux2.innerHTML.slice(0, -1)));

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(2, -1);

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) + Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(-${displayAux2.innerHTML})=`;

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(2, -2);

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) + Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(-${displayAux2.innerHTML})=`;

                    break;
                    

                default:
                    console.log('default case "equals minus" - nothing to see here');
                    break;
            }      
        break;

        case '×': //multiply html code: &#215;
            switch(true){
                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));

                    displayAux2.innerHTML += '=';

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML === ''):

                    if(displayAux1.innerHTML >= 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `${displayAux1.innerHTML}=`;
                    } else if(displayAux1.innerHTML < 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `(${displayAux1.innerHTML})=`;
                    }

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')):

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) * Number(displayAux2.innerHTML.slice(0, -1)));

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')):

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -2);

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) * Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;
                    

                default:
                    console.log('default case "equals multiply" - nothing to see here');
                    break;
            }      
        break;

        case '÷': //divide html code: &#247;
            switch(true){
                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && displayAux2.innerHTML !== '0':

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));

                    displayAux2.innerHTML += '=';

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML === '') && (displayAux1.innerHTML !== '0'):

                    if(displayAux1.innerHTML >= 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `${displayAux1.innerHTML}=`;
                    } else if(displayAux1.innerHTML < 0){
                        displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux1.innerHTML));
                        displayAux2.innerHTML += `(${displayAux1.innerHTML})=`;
                    }

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && displayAux2.innerHTML !== '0':

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) / Number(displayAux2.innerHTML.slice(0, -1)));

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && displayAux2.innerHTML !== '0':

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);

                    displayMain.innerHTML = resLength(Number(displayAux1.innerHTML) / Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;

                case (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '=') && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && displayAux2.innerHTML !== '0':

                    displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -2);

                    displayAux1.innerHTML = displayMain.innerHTML;
                    displayMain.innerHTML = resLength(Number(displayMain.innerHTML) / Number(displayAux2.innerHTML));

                    displayAux2.innerHTML = `(${displayAux2.innerHTML})=`;

                    break;
                    

                default:
                    console.log('default case "equals divide" - nothing to see here');
                    break;
            }      
        break;

        default:
            console.log('default case "equals" - nothing to see here');
            break;
    }
}

//----------------------------------------------------------------------

function clickHandler(e){

    switch (e.target.id){
        case 'zero':
            numericHandler(0, 'zero');
            break;

        case 'one':
            numericHandler(1, 'one');
            break;

        case 'two':
            numericHandler(2, 'two');
            break;

        case 'three':
            numericHandler(3, 'three');
            break;

        case 'four':
            numericHandler(4, 'four');
            break;

        case 'five':
            numericHandler(5, 'five');
            break;

        case 'six':
            numericHandler(6, 'six');
            break;

        case 'seven':
            numericHandler(7, 'seven');
            break;

        case 'eight':
            numericHandler(8, 'eight');
            break;

        case 'nine':
            numericHandler(9, 'nine');
            break;

        case 'percent':
            console.log('print percent');

            switch(true){
                case (displayMain.innerHTML !== 'ready') && (!isNaN(parseFloat(displayAux1.innerHTML))) && (displayAuxOp !== '') && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '='):

                    if ((!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')'))){
                        displayAux2.innerHTML = resLength((Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML)) / 100);
                    } else if ((displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')'))){
                        displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                        displayAux2.innerHTML = resLength((Number(displayAux1.innerHTML) * Number(displayAux2.innerHTML)) / 100);
                        displayAux2.innerHTML = `(${displayAux2.innerHTML})`;
                    }

                break;

                default:
                    console.log('default case "percent" - nothing to see here');
                    break;
            }
            break;

        case 'ce':
            console.log('print ce');

                switch (true){
                    case (displayAux1.innerHTML.length > 0) &&
                        (displayAuxOp.innerHTML.length === 0) &&
                        (displayAux2.innerHTML.length === 0) &&
                        (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '='):

                            displayAux1.innerHTML = '';
                            displayMain.innerHTML = 'ready';
                        break

                    case (displayAux1.innerHTML.length > 0) &&
                        (displayAuxOp.innerHTML.length > 0) &&
                        (displayAux2.innerHTML.length > 0) &&
                        (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '='):

                            (displayAux2.innerHTML = '');
                        break

                    case (displayAux1.innerHTML.length > 0) &&
                        (displayAuxOp.innerHTML.length > 0) &&
                        (displayAux2.innerHTML.length > 0) &&
                        (displayAux2.innerHTML[displayAux2.innerHTML.length-1] === '='):

                            displayAux2.innerHTML = '';
                            displayAuxOp.innerHTML = '';
                            displayAux1.innerHTML = '';
                            displayMain.innerHTML = 'ready';
                        break

                    default:
                        console.log('default case "ce" - nothing to see here');
                        break;
                }

            break;

        case 'c':
            console.log('print c');
            displayAux1.innerHTML = '';
            displayAuxOp.innerHTML = '';
            displayAux2.innerHTML = '';
            displayMain.innerHTML = 'ready';
            break;

        case 'backspace':
            backspaceHandler();
            break;

        case 'oneslashx':
            console.log('print oneslashx');

            switch(true){

                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length === 0) && (displayAux2.innerHTML.length === 0) && (displayAux1.innerHTML !== '0'):

                    if(parseFloat(Number(displayAux1.innerHTML)) > 0){
                        displayAux2.innerHTML = `${displayAux1.innerHTML}`.length > 20 ? `${resLength(Number(displayAux1.innerHTML))}=` : `${displayAux1.innerHTML}=`;
                        displayMain.innerHTML = resLength(1 / Number(displayAux1.innerHTML));
                        displayAux1.innerHTML = 1;
                        displayAuxOp.innerHTML = '÷';
                    } else if (parseFloat(Number(displayAux1.innerHTML)) < 0){
                        displayAux2.innerHTML = `(${displayAux1.innerHTML})=`.length ? `(${resLength(Number(displayAux1.innerHTML))})=` : `(${displayAux1.innerHTML})=`;
                        displayMain.innerHTML = resLength(1 / Number(displayAux1.innerHTML));
                        displayAux1.innerHTML = 1;
                        displayAuxOp.innerHTML = '÷';
                    }
                    break;
                
                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML !== '0'):

                    if(parseFloat(Number(displayAux2.innerHTML)) > 0){
                        displayAux2.innerHTML = resLength(1 / Number(displayAux2.innerHTML));
                    } else if (displayAux2.innerHTML.includes('(') && (displayAux2.innerHTML.includes(')')) ){
                        displayAux2.innerHTML = `(${resLength(1 / Number(displayAux2.innerHTML.slice(1, -1)))})`;
                    }
                    break;
                
                case (!isNaN(parseFloat(displayMain.innerHTML))) && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayMain.innerHTML !== '0'):

                    if(parseFloat(Number(displayMain.innerHTML)) > 0){
                        displayAux2.innerHTML = displayMain.innerHTML;
                        displayMain.innerHTML = resLength(1 / Number(displayMain.innerHTML));
                        displayAux1.innerHTML = 1;
                        displayAuxOp.innerHTML = '÷';
                    } else if (parseFloat(Number(displayMain.innerHTML)) < 0){
                        displayAux2.innerHTML = `(${displayMain.innerHTML})=`;
                        displayMain.innerHTML = resLength(1 / Number(displayMain.innerHTML));
                        displayAux1.innerHTML = 1;
                        displayAuxOp.innerHTML = '÷';
                    }
                    break;

                default:
                    console.log('default case "oneslashx" - nothing to see here');
                    break;
            }

            break;

        case 'xsquared':
            console.log('print xsquared');

            switch(true){

                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length === 0) && (displayAux2.innerHTML.length === 0):

                    if (parseFloat(Number(displayAux1.innerHTML)) > 0){
                            displayAux2.innerHTML = `${displayAux1.innerHTML}=`;
                            displayMain.innerHTML = resLength(Math.pow((Number(displayAux1.innerHTML)), 2));
                            displayAuxOp.innerHTML = '×';
                    } else if(parseFloat(Number(displayAux1.innerHTML)) < 0){
                        displayAux2.innerHTML = `(${displayAux1.innerHTML})=`;
                        displayMain.innerHTML = resLength(Math.pow((Number(displayAux1.innerHTML)), 2));
                        displayAuxOp.innerHTML = '×';
                    }
                    break;
                
                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0):

                    if(parseFloat(Number(displayAux2.innerHTML)) > 0){
                        displayAux2.innerHTML = resLength(Math.pow((Number(displayAux2.innerHTML)), 2));
                    } else if (displayAux2.innerHTML.includes('(') && (displayAux2.innerHTML.includes(')')) ){
                        displayAux2.innerHTML = resLength(Math.pow((Number(displayAux2.innerHTML.slice(1, -1))), 2));
                    }
                    break;
                
                case (!isNaN(parseFloat(displayMain.innerHTML))) && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0):

                    if(parseFloat(Number(displayMain.innerHTML)) > 0){
                        displayAux1.innerHTML = displayMain.innerHTML;
                        displayAux2.innerHTML = `${displayMain.innerHTML}=`;
                        displayMain.innerHTML = resLength(Math.pow((Number(displayMain.innerHTML)), 2));
                        displayAuxOp.innerHTML = '×';
                    } else if (parseFloat(Number(displayMain.innerHTML)) < 0){
                        displayAux1.innerHTML = displayMain.innerHTML;
                        displayAux2.innerHTML = `(${displayMain.innerHTML})=`;
                        displayMain.innerHTML = resLength(Math.pow((Number(displayMain.innerHTML)), 2));
                        displayAuxOp.innerHTML = '×';
                    }
                    break;

                default:
                    console.log('default case "xsquared" - nothing to see here');
                    break;
            }

            break;

        case 'xsqrt':
            console.log('print xsqrt');

            switch(true){

                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length === 0) && (displayAux2.innerHTML.length === 0) && (displayAux1.innerHTML >= '0'):
                        displayAux1.innerHTML = resLength(Math.sqrt((Number(displayAux1.innerHTML))));
                    break;
                
                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayAux2.innerHTML >= '0'):
                        displayAux2.innerHTML = resLength(Math.sqrt((Number(displayAux2.innerHTML))));
                    break;
                
                case (!isNaN(parseFloat(displayMain.innerHTML))) && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML.length > 0) && (displayMain.innerHTML >= '0'):
                    displayAux1.innerHTML = resLength(Math.sqrt((Number(displayMain.innerHTML))));
                        displayAux2.innerHTML = '';
                        displayMain.innerHTML = '';
                        displayAuxOp.innerHTML = '';
                    break;

                default:
                    console.log('default case "xsqrt" - nothing to see here');
                    break;
            }

            break;

        case 'divide':
            divideHandler();
            break;

        case 'multiply':
            multiplyHandler();
            break;

        case 'subtract':
            subtractHandler();
            break;

        case 'add':
            addHandler();
            break;

        case 'plusslashminus':
            console.log('print plusslashminus');

            switch(true){
                case (displayMain.innerHTML === '') && (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAux2.innerHTML.length === 0):
                    displayAux1.innerHTML = Number(displayAux1.innerHTML) * (-1);
                    break;

                case (displayMain.innerHTML === '') && (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAux1.innerHTML.length > 0):

                    if ((displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')'))){
                        displayAux2.innerHTML = displayAux2.innerHTML.slice(1, -1);
                    }

                    displayAux2.innerHTML = Number(displayAux2.innerHTML) * (-1);
                    displayAux2.innerHTML = `(${displayAux2.innerHTML})`;

                    break;

                case (!isNaN(parseFloat(displayMain.innerHTML))) && (displayAux1.innerHTML !== '') && (displayAuxOp.innerHTML !== '') && (displayAux2.innerHTML !== ''):
                    displayAux1.innerHTML = Number(displayMain.innerHTML) * (-1);
                    displayAuxOp.innerHTML = '';
                    displayAux2.innerHTML = '';
                    displayMain.innerHTML = '';
                    break;

                default:
                    console.log('default case "plusslashminus" - nothing to see here');
                    break;
            }
            break;

        case 'decimal':
            decimalHandler();
            break;

        case 'equals':
            equalsHandler();
            break;

        case 'mc':
            console.log('print mc');

            if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                memory = undefined;
            } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                memory = undefined;
                memoryDiv.innerHTML = 'memory empty';
            }

            break;

        case 'mr':
            console.log('print mr');

            switch (true){
                case ((memory && displayAuxOp.innerHTML === '') && (displayMain.innerHTML === 'ready' || displayMain.innerHTML === '')):

                    displayAux1.innerHTML = memory;
                    displayMain.innerHTML = '';
                    break;

                case (memory && displayAuxOp.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    displayAux2.innerHTML = memory;
                    break;
                    
                case memory && !isNaN(parseFloat(displayMain.innerHTML)):
                    displayMain.innerHTML = '';
                    displayAux2.innerHTML = '';
                    displayAuxOp.innerHTML = '';
                    displayAux1.innerHTML = memory;
                    break;

                default:
                    console.log('default case "one" - nothing to see here');
                    break;
            }

            break;
            
        case 'mplus':
            console.log('print mplus');

            switch(true){
                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length >= 0) && (displayAux2.innerHTML === '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory += parseFloat(displayAux1.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory += parseFloat(displayAux1.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                    }
                    else if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory += parseFloat(displayAux2.innerHTML.slice(1, -1));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory += parseFloat(displayAux2.innerHTML.slice(1, -1));
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                    }
                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory += parseFloat(displayAux2.innerHTML);
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory += parseFloat(displayAux2.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length - 1] === '=') && (!isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayMain.innerHTML);
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory += parseFloat(displayMain.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory += parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    break;

                default:
                    console.log('default case "mplus" - nothing to see here');
                    break;
            }

            break;

        case 'mminus':
            console.log('print mminus');

            switch(true){
                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length >= 0) && (displayAux2.innerHTML === '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux1.innerHTML) * (-1);
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux1.innerHTML) * (-1);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory -= parseFloat(displayAux1.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory -= parseFloat(displayAux1.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1)) * (-1);
                    }
                    else if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1)) * (-1);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory -= parseFloat(displayAux2.innerHTML.slice(1, -1));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory -= parseFloat(displayAux2.innerHTML.slice(1, -1));
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML) * (-1);
                    }
                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML) * (-1);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory -= parseFloat(displayAux2.innerHTML);
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory -= parseFloat(displayAux2.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length - 1] === '=') && (!isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayMain.innerHTML) * (-1);
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayMain.innerHTML) * (-1);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory -= parseFloat(displayMain.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory -= parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    break;

                default:
                    console.log('default case "mminus" - nothing to see here');
                    break;
            }

            break;
            
        case 'ms':
            console.log('print ms');

            switch(true){
                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length >= 0) && (displayAux2.innerHTML === '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux1.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                    }
                    else if (!memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                    }
                    else if (memory && (displayAux2.innerHTML.includes('(')) && (displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML.slice(1, -1));
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                    }
                    else if (!memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')')) && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                    }
                    else if (memory && (!displayAux2.innerHTML.includes('(')) && (!displayAux2.innerHTML.includes(')'))  && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayAux2.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    }

                    break;

                case (displayAux1.innerHTML !== '') && (displayAux1.innerHTML[displayAux1.innerHTML.length-1] !== '.') && (displayAuxOp.innerHTML.length > 0) && (displayAux2.innerHTML !== '') && (displayAux2.innerHTML[displayAux2.innerHTML.length - 1] === '=') && (!isNaN(parseFloat(displayMain.innerHTML))):
                    
                    if (!memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (!memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } else if (memory && (memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                        memory = parseFloat(displayMain.innerHTML);
                    } else if (memory && (memoryDiv.style.fontSize === '0.9rem') && (memoryDiv.style.backgroundColor === ('rgb(26, 26, 26)'))){
                        memory = parseFloat(displayMain.innerHTML);
                        memoryDiv.innerHTML = resLength(Number(memory));
                    } 

                    break;

                default:
                    console.log('default case "ms" - nothing to see here');
                    break;
            }

            break;

        case 'marrow':
            console.log('print marrow');

            if((memoryDiv.style.fontSize === '0px') && (memoryDiv.style.backgroundColor === ('rgb(117, 85, 36)'))){
                memoryDiv.style.fontSize = ('0.9rem');
                memoryDiv.style.backgroundColor = ('rgb(26, 26, 26)');
                memoryDiv.innerHTML = resLength(Number(memory));
                (memoryDiv.innerHTML === 'NaN') && (memoryDiv.innerHTML = 'memory empty')
            } else{
                memoryDiv.style.fontSize = ('0px');
                memoryDiv.style.backgroundColor = ('rgb(117, 85, 36)');
                memoryDiv.innerHTML = '<span>vanilla calculator</span>';
            }

            break;

        default:
            console.log('default case "the big daddy main switch" - nothing to see here');
            break;
    }

}



