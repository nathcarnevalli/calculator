const calculator = {
  output: 0,
  '+': a => (calculator.output += a),
  '-': a => (calculator.output -= a),
  '*': a => (calculator.output *= a),
  '/': a => (calculator.output /= a),
  ',': a => (calculator.output += a),
  c: a => 0,
  c1: () => calculator.output.split(0, calculator.output.length - 2)
}

function calculate(e) {
  console.log(e.target)
}
