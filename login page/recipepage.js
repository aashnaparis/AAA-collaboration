
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
  }else if (!admin) {
    let check = admin.checked;
    if (!check) {
      alert("Select a gender!");
      return false;
    }
  }else{
    console.log("success");
  }

}
