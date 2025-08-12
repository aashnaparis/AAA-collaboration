var name0 = document.getElementById("name-input");
var age = document.getElementById("age");
var genderBend = document.getElementsById("gender"); //dropdown
var weight= document.getElementById("weight");
var bloodPressure = document.getElementById("blood-pressure");
var temp = document.getElementById("temp");
var height = document.getElementById("height");
var calorie = document.getElementById("cal");
var lastVisit = document.getElementById("last-vis"); //date
var nextVisit = document.getElementById("next-vis"); //date
var note = document.getElementById("doc-rem"); 
var meds = document.getElementById("meds"); 
var theField = document.getElementById("field-check"); //checkbox

//Check box - checking if any box is selected
var checks = theField.querySelectorAll('input[type = "checkbox"]');
let isChecked = false;
for(let i = 0; i < checks.length; i++){
    if(checks[i].checked){
        isChecked = true;
        break;
    }
}

function isDateValid(dateString){
    return !isNaN(new Date(dateString));
}

function validateItems() {
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });



  if (nameo.value === null || nameo.value === "") {
    alert("Put your name in!");
    return false;
  } else if (age.value <= 0 || age.value >= 100 || age.value === null || isNaN(age.value)) {
    alert("Put an appropriate age!");
    return false;
  } else if (weight.value <= 0 || weight.value >= 600 || weight.value === null || isNaN(weight.value)) {
    alert("Put an appropriate weight!");
    return false;
  } else if (bp.value <= 70 || bp.value >= 200 || bp.value === null || isNaN(bp.value)) {
    alert("Put blood pressure in");
    return false;
  } else if (height.value <= 54 || height.value >= 250 || height.value === null || isNaN(height.value)) {
    alert("Put an appropriate height!");
    return false;
  } else if (genderBend.value === null || genderBend.value === "" || genderBend.value === "default") {
    alert("Select a proper gender!");
    return false;
  } else if (calorie.value <= 900 || calorie.value >= 3000 || calorie.value === null || isNaN(calorie.value)) {
    alert("Put your daily calorie intake!");
    return false;
  } else if (temp.value <= 34 || temp.value >= 43 || temp.value === null || isNaN(temp.value)) {
    alert("Put an appropriate height!");
    return false;
  } else if (!isChecked) {
      alert("Select a pre-existing condition!");
      return false;
  } else if (note.value === null || note.value === "") {
    alert("Doctors remark needed!");
    return false;
  } else if (meds.value === null || meds.value === "") {
    alert("Prescription Necessary!");
    return false;
  } else if (!isDateValid(lastVisit)) {
    alert("Please enter a appropriate date!");
    return false;
  } else if (!isDateValid(nextVisit)) {
    alert("Please enter a appropriate date!");
    return false;
  }  else {
    console.log("Success");
  }
}