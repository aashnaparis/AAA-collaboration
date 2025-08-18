
function hideMod() {
  var modal = document.getElementById("modal");
    modal.style.display = "none";
    verifyItems();
}

function showMod() {
  var modal = document.getElementById("modal").style.display= "block";
  toggleform("loginform");
    //modal.style.display = "block";
}


function toggleform(formID){
  document.getElementById("loginform").style.display = "none";
  document.getElementById("container").style.display = "none";//container is for the signup form
  document.getElementById(formID).style.display = "block";

}

//for email validation
function valid(mail) {
  const input = document.createElement("input");
  input.type = "email";
  input.value = mail;
  return input.checkValidity();
}

//make sure all fields are entered correctly

  function verifyItems() {
    var first = document.getElementById("fName");
    var last = document.getElementById("lName");
    var email = document.getElementById("email");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var admin = document.getElementsByName("admin"); 

      if (first.value === null || first.value === "") {
        alert("Put your first name in!");
        return false;
      }else if(last.value === null || last.value === "") {
        alert("Put your last name in!");
        return false;
      }else if (username.value === null || username.value == "") {
        alert("Put an appropriate Username!");
        return false;
      } else if (password.value === null || password.value == "") {
        alert("Put an appropriate password!");
        return false;
      } else if (
        !valid(email.value) ||
        email.value === "" ||
        email.value === null
      ){
        alert("Put an Valid Email!");
        return false;
      }else if (!isChecked) {
        alert("Select a admin!");
        return false;
      }else{
        console.log("success");
  } 
  
  /*let isChecked = false;

  for (let i = 0; i < admin.length; i++) {
    if (admin[i].checked) {
      isChecked = true;
      break; // Exit the loop once a checked radio button is found
    }
  }*/

  let isChecked = Array.from(admin).some(radio => radio.checked);
  if (!isChecked) {
    alert("Select Doctor or Patient!");
    return false;
  }

  return true;  

}

///////////////////////////////////////////////////////////
async function LoginUser(){
  var username = document.getElementById('login_Username').value;

  var password = document.getElementById('login_Password').value;

  var email = document.getElementById('loginEmail').value;

  var requestBody = {
    "username":username,
    "password": password,
    "email": email
  }

  var settings = {
    "method": "POST",
    "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(requestBody)
  };

  try {
    var response = await fetch("https://aaa-collaboration-nij9.onrender.com/secureLogin",settings)

  if(response.status != 200){
     alert("Login failed, check you email/username/password");

    }
    else{
      hideMod();
       var responseBody = await response.json();
       console.log(responseBody);
       alert(`Welcome, ${responseBody.username}!`);
       window.location.href = "index.html";
    }
  }catch (err){
    console.error("Error logging in, err");
  }
  
}
////////////////////////////////////////////////////////////////
async function SignUpUser(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var firstname = document.getElementById('fName').value;
  var lastname = document.getElementById('lName').value;
  var email = document.getElementById('email').value;
  var typeOfUser = document.getElementsByName('admin');
  var usertag ="";

  for(let i = 0;i<typeOfUser.length;i++){
    if (typeOfUser[i].checked){
      usertag = typeOfUser[i].id === "doctor" ? "Doctor": "Patient";
      break;
    }
  }

  var requestBody = {
    "username": username,
    "password": password,
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "typeOfUser": usertag
  };

  var settings = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(requestBody)
    }; 
  
  try{
    var response = await fetch("https://aaa-collaboration-nij9.onrender.com/signUp",settings)

  if(response.status != 200){
      alert("Sign Up failed");

    }
    else{
       var responseBody = await response.json();
       console.log(responseBody);
       window.location.href = "second.html";
    }
  } catch (err) {
    console.error("Failed to Sign Up", err)
  }
  
}
//////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  var signUpForm = document.getElementById("myForm");
  var loginForm = document.getElementById("loginForm");

  if (signUpForm) {
    signUpForm.addEventListener("submit", function(event) {
      event.preventDefault();
      if (verifyItems()) {   // Only validation passes
        SignUpUser();
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      LoginUser();
    });
  }
});
