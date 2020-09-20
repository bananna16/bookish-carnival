const console = document.querySelector("#console");
let op1 = "";
let op2 = "";
let operand = "";
let lastKey = "";
const keys = document.querySelector('#keys');

function add(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function sub(x, y) {
    return parseFloat(x) - parseFloat(y);
}

function mult(x, y) {
    return parseFloat(x) * parseFloat(y);
}

function div(x, y) {
    return parseFloat(x) / parseFloat(y);
}

function mod(x, y) {
    return parseFloat(x) % parseFloat(y);
}

//operator here needs to be add, sub, mult, div, or mod
function operate(operator, x, y) {
    if (operator == 'div' && y == 0) {
        return "Nice try :)"
    }
    switch (operator) {
        case 'add':
            return add(x, y);
        case 'sub':
            return sub(x, y);
        case 'mult':
            return mult(x, y);
        case 'div':
            return div(x, y);
        case 'mod':
            return mod(x, y);
    }
    return operator(x, y);
}

keys.addEventListener('click', e => {
    let button = e.target;
    populate(button);
})

function reset() {
    op1 = "";
    op2 = "";
    operand = "";
    console.innerText = 0;
}

function updateScreen(value) {
    if (value.toString(10).length > 13) {
        console.innerText = value.toString(10).slice(0, 13);
    } else {
        console.innerText = value;
    }
}

function populate(button) {
    let key = button.className;
    let val = button.textContent;

    if (key == 'numbers') {
        if (val == '.' && console.innerText.indexOf(".") != -1) {
            return;
        }
        if (lastKey == 'equal') {
            reset();
        }
        if (!operand) {
            op1 = op1 + val;
            updateScreen(op1);
        } else {
            op2 = op2 + val;
            updateScreen(op2)
        }
    } else if (key == 'operations') {
        if (lastKey == 'equal') {
            op2 = '';
        }
        if (op2 && operand) {
            op1 = operate(operand, op1, op2);
            updateScreen(op1);
            operand = "";
            op2 = "";
        }
        operand = button.id;
    } else if (key == 'clear') {
        reset();
    } else if (key == 'delete') {
        if (console.innerText == op1) {
            if (op1.length == 1) {
                reset();
            } else {
                op1 = op1.toString(10).slice(0, -1);
                updateScreen(op1);
            }
        } else if (console.innerText == op2) {
            if (op2.length == 1) {
                reset();
            } else {
                op2 = op2.toString(10).slice(0, -1);
                updateScreen(op2);
            }
        }
    } else if (key == 'invert') {
        if (console.innerText == op1) {
            op1 = -op1;
            updateScreen(op1);
        } else if (console.innerText == op2) {
            op2 = -op2;
            updateScreen(op2);
        }
    } else if (key == 'equal') {
        op1 = operate(operand, op1, op2);
        updateScreen(op1);
    }

    lastKey = key;
}
