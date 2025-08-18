
function hideMod() {
  var modal = document.getElementById("modal");
    modal.style.display = "none";
    verifyItems();
}

function showMod() {
  var modal = document.getElementById("modal");
    modal.style.display = "block";
}

//for email validation
function valid(mail) {
  const input = document.createElement("input");
  input.type = "email";
  input.value = mail;
  return input.checkValidity();
}

//make sure all fields are entered correctly
function verifyItems(){
    document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault();
  });

 

  var first = document.getElementById("fName");
  var last = document.getElementById("lName");
  var email = document.getElementById("email"); 
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var admin = document.getElementsByName("admin"); 
  
  let isChecked = false;

  for (let i = 0; i < admin.length; i++) {
    if (admin[i].checked) {
      isChecked = true;
      break; // Exit the loop once a checked radio button is found
    }
  }

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

}

async function EmployeeAccess(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var requestBody = {
    "username": username,
    "password": password
  };

  var settings = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(requestBody)
    }; 

  var response = await fetch("https://aaa-collaboration-nij9.onrender.com/secureLogin",settings)

  if(response.status != 200){
      alert("Access Denied: Unauthorized User");
    }
    else{
       var responseBody = await response.json();
       console.log(responseBody);
       window.location.href = "second.html"; //need to put in a if loop
    }
}
