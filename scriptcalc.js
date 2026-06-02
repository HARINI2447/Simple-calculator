// Variables to store calculator state
let current = '0';
let expression = '';
let justCalculated = false;

// Update the display
function update() {
  document.getElementById('result').textContent = current;
  document.getElementById('expression').textContent = expression;
}

// When a number button is pressed
function inputNum(num) {
  if (justCalculated) {
    current = num;
    expression = '';
    justCalculated = false;
  } else {
    if (current === '0') {
      current = num;
    } else {
      current = current + num;
    }
  }
  update();
}

// When the dot (.) button is pressed
function inputDot() {
  if (justCalculated) {
    current = '0.';
    expression = '';
    justCalculated = false;
  } else if (!current.includes('.')) {
    current = current + '.';
  }
  update();
}

// When an operator button is pressed (+, -, *, /)
function inputOp(op) {
  justCalculated = false;

  // Show a friendly symbol in the expression
  let symbol = op;
  if (op === '/') symbol = '÷';
  if (op === '*') symbol = '×';
  if (op === '-') symbol = '−';

  expression = current + ' ' + symbol;
  update();
}

// When = is pressed
function calculate() {
  if (!expression) return;

  try {
    // Replace display symbols with real operators for calculation
    let expr = expression.replace('÷', '/').replace('×', '*').replace('−', '-');
    let fullExpr = expr + ' ' + current;

    // Calculate the result
    let result = Function('"use strict"; return (' + fullExpr + ')')();

    // Round to avoid floating point issues like 0.1 + 0.2 = 0.30000000004
    result = parseFloat(result.toPrecision(12));

    expression = fullExpr + ' =';
    current = String(result);
    justCalculated = true;
    update();
  } catch (e) {
    current = 'Error';
    update();
  }
}

// AC button - clear everything
function clearAll() {
  current = '0';
  expression = '';
  justCalculated = false;
  update();
}

// Backspace button - delete last character
function deleteLast() {
  if (justCalculated) return;
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
  update();
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') inputNum(e.key);
  else if (e.key === '.')           inputDot();
  else if (e.key === '+')           inputOp('+');
  else if (e.key === '-')           inputOp('-');
  else if (e.key === '*')           inputOp('*');
  else if (e.key === '/') { e.preventDefault(); inputOp('/'); }
  else if (e.key === '%')           inputOp('%');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace')   deleteLast();
  else if (e.key === 'Escape')      clearAll();
});
