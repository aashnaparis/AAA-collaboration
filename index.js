// modal configuration
function showMod() {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');


  const logintouch = document.getElementById('logintouch');
  const signuptouch = document.getElementById('signuptouch');

  // Get the <span> elements that close the modals
  const closeButtons = document.querySelectorAll('.close');

  if (logintouch) {
    logintouch.onclick = function () {
      loginModal.style.display = 'block';
    }
  }


  if (signuptouch) {
    signuptouch.onclick = function () {
      signupModal.style.display = 'block';
    }
  }

  closeButtons.forEach(button => {
    button.onclick = function () {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
    }
  });

  window.onclick = function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    } else if (event.target === signupModal) {
      signupModal.style.display = 'none';
    }
  }

}



//to switch between the two modals
function showModal(modalShow) {
  var loginModal = document.getElementById('loginModal');
  var signupModal = document.getElementById('signupModal');

  loginModal.style.display = 'none';
  signupModal.style.display = 'none';

  modalShow.style.display = 'block';
}

//fucntion for email to differentiate from who is a doctor and who is not
function isGovEmail(email) {
  return /^[^@]+@[^@]+\.gov$/i.test(email);
}

//for email validation
function valid(mail) {
  const input = document.createElement("input");
  input.type = "email";
  input.value = mail;
  return input.checkValidity();
}

//make sure all fields are entered correctly
function verifySignup() {
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  var first = document.getElementById("fName");
  var last = document.getElementById("lName");
  var email = document.getElementById("email");
  var username = document.getElementById("username");
  var password = document.getElementById("password1");
  var check = document.getElementById("confirm");

  if (first.value === null || first.value === "") {
    alert("Put your first name in!");
    return false;
  } else if (last.value === null || last.value === "") {
    alert("Put your last name in!");
    return false;
  } else if (username.value === null || username.value == "") {
    alert("Put an appropriate Username!");
    return false;
  } else if (password.value === null || password.value == "" ) {
    alert("Put an appropriate password!");
    return false;
  } else if (password.value != check.value) {
    alert("Password not matching!");
    return false;
  } else if (
    !valid(email.value) ||
    email.value === "" ||
    email.value === null
  ) {
    alert("Put an Valid Email!");
    return false;
  } else {
    console.log("success");
    signupUser();
  }
}

function verifyLogin() {

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  var email = document.getElementById("login-email");
  var username = document.getElementById("login-username");
  var password = document.getElementById("login-password");


  if (username.value === null || username.value === "") {
    alert("Put valid username in!");
    return false;
  } else if (password.value === null || password.value === "") {
    alert("Put valid password in!");
    return false;
  } else if (
    !valid(email.value) ||
    email.value === "" ||
    email.value === null
  ) {
    alert("Put an Valid Email!");
    return false;
  } else {
    console.log("success");
    loginUser();
  }
}

async function loginUser() {
  var username = document.getElementById('login-username').value;
  var password = document.getElementById('login-password').value;
  var email = document.getElementById('login-email').value;

  var requestBody = {
    "username": username,
    "password": password,
    "email": email
  }

  var settings = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(requestBody)
  };


  try {
    var response = await fetch("https://aaa-collaboration-nij9.onrender.com/login", settings)

    if (response.status != 201) {
      alert("Login failed, check you email/username/password");

    }
    else {
      var responseBody = await response.json();
      console.log(responseBody);
      alert(`Welcome, ${responseBody.username}! You're logged in`);

      if (isGovEmail(responseBody.email)){ // thus does email look like "johndoe@health.gov"
        var touch = document.getElementById("button");
        touch.href = "second.html";
        touch.textContent = "Patient Sheet";
        
      }else{
        var touch = document.getElementById("button");
        touch.href = "third.html";
        touch.textContent = "Dashboard";
      }
    }
  } catch (err) {
    console.error("Error logging in, err");
  }

}

async function signupUser() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var firstname = document.getElementById('fName').value;
  var lastname = document.getElementById('lName').value;
  var email = document.getElementById('email').value;


  var requestBody = {
    "firstname": firstname,
    "lastname": lastname,
    "username": username,
    "password": password,
    "email": email,
  };

  var settings = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(requestBody)
  };

  try {
    var response = await fetch("https://aaa-collaboration-nij9.onrender.com/signup", settings)

    if (response.status != 200) {
      alert("Sign Up failed");

    }
    else {
      var responseBody = await response.json();
      console.log(responseBody);
      alert(`Welcome, ${responseBody.username}!, Login in to see your Dashboard`);
      window.location.href = "index.html";
    }
  }
  catch (err) {
    console.error("Failed to Sign Up", err)
  }

}

