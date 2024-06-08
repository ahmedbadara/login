// Retrieve existing user data or initialize an empty array
var userData = localStorage.getItem("userDataInput")
  ? JSON.parse(localStorage.getItem("userDataInput"))
  : [];

// Sign-up functionality
var userNameSignUpInput = document.getElementById("userNameSignUp");
var userEmailSignUpInput = document.getElementById("userEmailSignUp");
var userPasswordSignUpInput = document.getElementById("userPasswordSignUp");
var signBtnInput = document.getElementById("signBtn");
var emptyInputMessage = document.getElementById("emptyInput");

// Validate if the input fields are empty
function isSignUpInputValid() {
  return (
    userNameSignUpInput.value !== "" &&
    userEmailSignUpInput.value !== "" &&
    userPasswordSignUpInput.value !== ""
  );
}

// Check if the email already exists in the local storage
function isEmailExist(email) {
  return userData.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

// Add user to the local storage if validation passes
function addUser() {
  if (!isSignUpInputValid()) {
    emptyInputMessage.innerHTML = "All inputs are required";
    return false;
  } else if (
    !userEmailSignUpInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ) {
    emptyInputMessage.innerHTML = "Invalid email format";
    return false;
  } else if (isEmailExist(userEmailSignUpInput.value)) {
    emptyInputMessage.innerHTML = "Email already exists";
    return false;
  }

  var userDataInput = {
    name: userNameSignUpInput.value,
    email: userEmailSignUpInput.value,
    pass: userPasswordSignUpInput.value,
  };

  userData.push(userDataInput);
  localStorage.setItem("userDataInput", JSON.stringify(userData));
  emptyInputMessage.innerHTML = "Success";
  setTimeout(() => {
    window.location.href = "../html/signin.html"; // Redirect to sign-in page on successful sign-up
  }, 1000);
  return true;
}

// Event listener for sign-up button
if (signBtnInput) {
  signBtnInput.addEventListener("click", function (event) {
    event.preventDefault();
    addUser();
  });
}

// Sign-in functionality
var signInEmail = document.getElementById("signInEmail");
var signInPass = document.getElementById("signInPass");
var signInBtn = document.getElementById("signInBtn");
var signInText = document.getElementById("signInText");
var loggedInUsermassege = document.getElementById("logiedName");

// Validate sign-in inputs
function isSignInInputValid() {
  return signInEmail.value !== "" && signInPass.value !== "";
}

// Validate sign-in
function validateSignIn() {
  if (!isSignInInputValid()) {
    signInText.innerHTML = "All inputs are required";
    return false;
  } else if (!signInEmail.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    signInText.innerHTML = "Invalid email format";
    return false;
  }

  var user = userData.find(
    (user) =>
      user.email.toLowerCase() === signInEmail.value.toLowerCase() &&
      user.pass === signInPass.value
  );
  if (user) {
    signInText.innerHTML = "Login successful";

    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    // Store logged-in user info
    setTimeout(() => {
      window.location.href = "../html/home.html"; // Redirect to home page on successful sign-in
    }, 1000);
    return true;
  } else {
    signInText.innerHTML = "Invalid email or password";
    return false;
  }
}

// Event listener for sign-in button
if (signInBtn) {
  signInBtn.addEventListener("click", function (event) {
    event.preventDefault();
    validateSignIn();
  });
}
//welcome user
var loggedInUser = sessionStorage.getItem("loggedInUser");
if (loggedInUser) {
  var user = JSON.parse(loggedInUser);
  var loggedInUserName = user.name;
  document.getElementById("logiedName").innerText = loggedInUserName;
}

// Log out functionality
var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "../html/signin.html";
  });
}
