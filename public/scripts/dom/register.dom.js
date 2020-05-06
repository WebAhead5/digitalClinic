const theForm = document.getElementById('regForm');

const firstNameElement = theForm.elements['firstName'];
const lastNameElement = theForm.elements['lastName'];
const errText = document.createElement('h1');


//passwords
const newPassword = document.querySelector("[name = 'password']");
const confirmPassword = document.querySelector("[name = 'confirmpassword']");
// const confirmPassword = document.getElementsByName('confirmpassword');


errText.textContent = '';

function isLettersAndSpaces(str) {
    const regex = /^[a-z ]+$/gi;
    return str && str.trim() === str && regex.test(str);
}

///////when going back to the initial state it shows the err (because of the space)
//validating first name
firstNameElement.addEventListener('input', (event) => {

    if (isLettersAndSpaces(firstNameElement.value)) {
        errText.textContent = ''
        firstNameElement.style.border = '2.5px solid green'
    } else {
        const errContainer = document.createElement('div');
        theForm.appendChild(errContainer);
        errContainer.classList.add('errContainer');
        errText.textContent = "First Name must be a string";
        errContainer.appendChild(errText)
        firstNameElement.style.border = '1.5px solid red';
    }
    event.preventDefault();
})

//validating last name
lastNameElement.addEventListener('input', (event) => {

    if (isLettersAndSpaces(lastNameElement.value)) {
        errText.textContent = ''
        lastNameElement.style.border = '2.5px solid green';

    } else {
        const errContainer = document.createElement('div');
        theForm.appendChild(errContainer);
        errContainer.classList.add('errContainer');
        errText.textContent = "Last Name must be a string";
        errContainer.appendChild(errText)
        lastNameElement.style.border = '1.5px solid red';
    }
    event.preventDefault();
})



confirmPassword.addEventListener('input', () => {
 
console.log(newPassword.value, confirmPassword.value);
    if (newPassword.value !== confirmPassword.value) {
        errText.textContent = 'Passwords do not match';
        newPassword.style.border = '1.5px solid red';
        confirmPassword.style.border = '1.5px solid red';
    } else {
        newPassword.style.border = '2.5px solid green';
        confirmPassword.style.border = '2.5px solid green';
    }


event.preventDefault();
})

    
    

