function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {

  var getArguments = function(expression, sign) {
		var argumentsSet = [];
    var argument = '';
    var bracketsCounter = 0;
		
		for (var i = 0; i < expression.length; i++) {
			var char = expression[i];
			switch (char) {
				case '(':
					bracketsCounter++;
					break;
				case ')':
					bracketsCounter--;
					break;
				case sign:
					if (!bracketsCounter) {
						argumentsSet.push(argument);
						argument = '';
						char = '';
					}
					break;
			}
			argument += char;
    }
    if (bracketsCounter) {
			throw new Error('ExpressionError: Brackets must be paired');
		}
		argumentsSet.push(argument);
		
    return argumentsSet;
  }

	var add = function(expression) {
		var result = 0;
		var argumentsArr = getArguments(expression, '+');

		argumentsArr = argumentsArr.map( 
			function(item) {
				return subtract(item);
			}
		);

		result = argumentsArr.reduce( 
			function(previousValue, currentValue) {
				return +previousValue + +currentValue;
			}
		);

		return result;
	}

	var subtract = function(expression) {
		var result = 0;
		var argumentsArr = getArguments(expression, '-');
		
		argumentsArr = argumentsArr.map( 
			function(item) {
				return multiply(item);
			}
		);

		result = argumentsArr.reduce( 
			function(previousValue, currentValue) {
				return previousValue - currentValue;
			}
		);

		return result;
	}

	var multiply = function(expression) {
		var result = 0;
		var argumentsArr = getArguments(expression, '*');

		argumentsArr = argumentsArr.map( 
			function(item) {
				return divide(item);
			}
		);

		result = argumentsArr.reduce( 
			function(previousValue, currentValue) {
				return previousValue * currentValue;
			}
		);
		
		return result;
	}

	var divide = function(expression) {
		var result = 0;
		var argumentsArr = getArguments(expression, '/');

		argumentsArr = argumentsArr.map( 
			function(item) {
				item = item.trim();
				if ( item[0] === "(" && item[item.length - 1] === ")" ) {
					return add(item.slice(1, -1));
				}
				return item;
			}
		);
				
		result = argumentsArr.reduce( 
			function(previousValue, currentValue) {
				if (currentValue === '0') {
					throw new Error('TypeError: Division by zero.');
				}
				return previousValue / currentValue;
			}
		);

		return result;
	}

	return add(expr);
}

module.exports = {
	expressionCalculator
}