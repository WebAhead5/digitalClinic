function isLettersAndSpaces(str) {
  const regex = /^[a-z ]+$/gi;
  return str && str.trim() === str && regex.test(str);
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



function passwordsMatch(password, confirmPassword) {
  let isValid;
  let errorMessage;

  isValid = password === confirmPassword;
  if (!isValid) {
    errorMessage = "passwords do not match"
  }
  return {isValid, errorMessage};
}


function validateEmail(email) {
  let isValid;
  let errorMessage;
  const regex = /^[a-z0-9_.\-]+@[a-z0-9\-_]+[.a-z0-9\-_]+/i;

  isValid = regex.test(email);

  if (!isValid)
    errorMessage = "Email is invalid!"

  return { isValid, errorMessage }
}



module.exports = {
  isEmptyString,
  isLettersAndSpaces,
  validatePassword,
  passwordsMatch,
  validateEmail
};
