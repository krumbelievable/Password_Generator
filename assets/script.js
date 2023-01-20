// Assignment Code
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector('#password');

	passwordText.value = password;
}
// Function that generate password
function generatePassword() {
	// Arrays for use in the funciton
	const special = [
		' ',
		'!',
		'"',
		'#',
		'$',
		'%',
		'&',
		"'",
		'(',
		')',
		'*',
		'+',
		',',
		'-',
		'.',
		'/',
		':',
		';',
		'<',
		'=',
		'>',
		'?',
		'@',
		'[',
		']',
		'^',
		'_',
		'`',
		'{',
		'|',
		'}',
		'~',
	];
	const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const lowers = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];
	const uppers = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];
	const generatedPassword = new Array();
	const optionsIncluded = new Array();

	// Calls the function that determines which character will be added
	function addChar(numToCall) {
		var charToPush;
		if (numToCall === 0) {
			charToPush = addLowers();
		} else if (numToCall === 1) {
			charToPush = addUppers();
		} else if (numToCall === 2) {
			charToPush = addNumber();
		} else {
			charToPush = addSpecial();
		}
		return charToPush;
	}

	// Function to increment the random number
	function increment(numToIncrement) {
		if (numToIncrement >= optionsIncluded.length - 1) {
			return 0;
		} else {
			return numToIncrement + 1;
		}
	}

	// Returns an uppercase letter
	function addUppers() {
		return uppers[Math.floor(Math.random() * uppers.length)];
	}

	// Returns a lowercase letter
	function addLowers() {
		return lowers[Math.floor(Math.random() * lowers.length)];
	}

	// Returns a number
	function addNumber() {
		return numbers[Math.floor(Math.random() * numbers.length)];
	}

	// Retruns a special character
	function addSpecial() {
		return special[Math.floor(Math.random() * special.length)];
	}

	// Function that checks for user selected characters
	function checkOption(numToCheck) {
		var isIncluded = false;
		var i = 0;

		if (numToCheck === 0) {
			while (!isIncluded) {
				isIncluded = generatedPassword.includes(lowers[i]);
				i++;
				if (i === lowers.length) {
					return isIncluded;
				}
			}
		} else if (numToCheck === 1) {
			while (!isIncluded) {
				isIncluded = generatedPassword.includes(uppers[i]);
				i++;
				if (i === uppers.length) {
					return isIncluded;
				}
			}
		} else if (numToCheck === 2) {
			while (!isIncluded) {
				isIncluded = generatedPassword.includes(numbers[i]);
				i++;
				if (i === numbers.length) {
					return isIncluded;
				}
			}
		} else {
			while (!isIncluded) {
				isIncluded = generatedPassword.includes(special[i]);
				i++;
				if (i === special.length) {
					return isIncluded;
				}
			}
		}
		return isIncluded;
	}

	// Puts random characters into an array
	function createPassword() {
		for (var i = 0; i < passLength; i++) {
			// Generates random number based on selected options
			var ranNum = Math.floor(Math.random() * optionsIncluded.length);
			var charToPush;

			// Checks for user selected characters
			while (!optionsIncluded[ranNum]) {
				ranNum = increment(ranNum);
			}

			//  Addes characters to password array
			charToPush = addChar(ranNum);
			generatedPassword.push(charToPush);
		}
	}

	// Checks for user selected characters
	function validatePassword() {
		for (var i = 0; i < optionsIncluded.length; i++) {
			if (optionsIncluded[i]) {
				if (!checkOption(i)) {
					generatedPassword.length = 0;
					createPassword();
				}
			}
		}
	}

	// Asks for password length and checks for minimum characters
	var passLength = window.prompt(
		'How long does your password need to be? (minimum 8 characters)'
	);
	if (passLength < 8 || passLength > 128) {
		window.alert('Must be a number between 8 and 128. Please try again.');
		return 'start over';
	}

	// Prompts for all of the user options
	optionsIncluded[0] = window.confirm(
		'Would you like to include lowercase letters?'
	);
	optionsIncluded[1] = window.confirm(
		'Would you like to include uppercase letters?'
	);
	optionsIncluded[2] = window.confirm('Would you like to include numbers?');
	optionsIncluded[3] = window.confirm(
		'Would you like to include special characters?'
	);

	// Checks for at least one option
	if (
		!optionsIncluded[0] &&
		!optionsIncluded[1] &&
		!optionsIncluded[2] &&
		!optionsIncluded[3]
	) {
		window.alert('You must include at least one option. Please start over.');
		return 'start over';
	}

	createPassword();
	validatePassword();

	// Returns the password
	return generatedPassword.join('');
}

// Button even listener
generateBtn.addEventListener('click', function () {
	writePassword();
});
