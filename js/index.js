const calculator = {
  output: '',
  oldValue: '',
  currentValue: '',
  currentOperation: '',
  oldOperation: '',
  sum: (a, b) => a + b,
  sub: (a, b) => a - b,
  mult: (a, b) => a * b,
  divi: (a, b) => a / b,
  C: () => {
    calculator.output = ''
    calculator.currentValue = ''
    calculator.oldValue = ''
    calculator.currentOperation = ''
    calculator.oldOperation = ''
  },
  DEL: currentValue => currentValue.substring(0, currentValue.length - 1)
}

function calculate(e) {
  const text = e.target.innerText
  const output = document.querySelector('.output')

  switch (text) {
    case '+':
      checkAndCalculateOperation(text, output)
      break
    case '-':
      checkAndCalculateOperation(text, output)
      break
    case '*':
      checkAndCalculateOperation(text, output)
      break
    case '/':
      checkAndCalculateOperation(text, output)
      break
    case '.':
      if (calculator.output !== '') {
        calculator.output = calculator.output + text
        output.innerText = calculator.output
      }
      break
    case '=':
      checkAndCalculateOperation(calculator.currentOperation, output)
      break
    case 'C':
      calculator.C()
      output.innerText = '0'
      break
    case 'DEL':
      output.innerText = output.innerText.substring(
        0,
        output.innerText.length - 1
      )
      calculator.output = output.innerText
      calculator.currentValue = Number(output.innerText)

      if (output.innerText === '') {
        output.innerText = '0'
        calculator.output = ''
        calculator.currentValue = 0
      }
      break
    default:
      if (calculator.output.length < 17) {
        if (calculator.output === '0') {
          calculator.output = '' + text
        } else {
          calculator.output = calculator.output + text
          output.innerText = calculator.output
        }
      }
  }
}

function setOperands(value, operation) {
  if (calculator.oldValue === '') {
    if (operation !== '+' && operation !== '-') {
      calculator.oldValue = Number(value)
      calculator.currentValue = 1
      calculator.output = ''
    } else {
      calculator.oldValue = Number(value)
      calculator.currentValue = 0
      calculator.output = ''
    }
  } else {
    calculator.oldValue = calculator.currentValue
    calculator.currentValue = Number(value) //
    calculator.output = ''
  }
}

function calculateResult(a, b, operation) {
  calculator.oldValue = b

  switch (operation) {
    case '+':
      calculator.currentValue = calculator.sum(a, b)
      return calculator.currentValue
    case '-':
      calculator.currentValue = calculator.sub(a, b)
      return calculator.currentValue
    case '*':
      calculator.currentValue = calculator.mult(a, b)
      return calculator.currentValue
    case '/':
      if (calculator.divi(a, b) === Infinity) {
        return 'ERROR'
      }

      return calculator.currentValue
  }
}

function calculateOperation(operation) {
  setOperands(calculator.output, operation)
  return calculateResult(
    calculator.oldValue,
    calculator.currentValue,
    operation
  )
}

function operationChanged(operation) {
  if (calculator.currentOperation === '') {
    calculator.currentOperation = operation
    calculator.oldOperation = operation
    return false
  } else {
    calculator.oldOperation = calculator.currentOperation
    calculator.currentOperation = operation
    if (calculator.oldOperation === calculator.currentOperation) {
      return false
    } else {
      return true
    }
  }
}

function checkAndCalculateOperation(operation, output) {
  console.log(operation)
  console.log(calculator)
  if (operationChanged(operation)) {
    output.innerText = calculateOperation(calculator.oldOperation)
  } else {
    output.innerText = calculateOperation(calculator.currentOperation)
  }
}
