function isLettersAndSpaces(str) {
  const regex = /[a-z ]/gi;
  return str && str.trim() && regex.test(str);
}

function isEmptyString(str) {
  return !str || !str.trim();
}

function validatePassword(str) {
  let isValid = true;
  let errorMessage;
  let strength = 0;

  // check for whitespace characters----------------
  const regex_spaces = /\s+/g;
  isValid = !regex_spaces.test(str);
  if (!isValid) {
    errorMessage = 'No spaces are allowed in the password';
    return { isValid, errorMessage, strength };
  }

  //check if password is weak-----------------------
  if (str.length < 6) {
    isValid = false;
    errorMessage = 'the password must contain at least 6 characters';
    return { isValid, errorMessage, strength };
  } else strength++;

  if (str.length > 10) strength++;

  //contains a small letter followed by a capital letter
  // or a capital letter followed by a small letter
  let regex = /([a-z]+.*[A-Z]+)|([A-Z]+.*[a-z]+)/g;
  if (regex.test(str)) strength++;

  //contains a number
  regex = /\d/g;
  if (regex.test(str)) strength++;

  //contains a special char
  regex = /[^(a-z0-9)]/gi;
  if (regex.test(str)) strength++;

  return { isValid, errorMessage, strength, total: 5 };
}

module.exports = { isEmptyString, isLettersAndSpaces, validatePassword };
