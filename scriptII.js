//Second page javascript

//global variables
// var nameInput = document.getElementById("nameo");
// var age = document.getElementById("age");
// var genderBend = document.getElementById("gender"); //dropdown
// var weight = document.getElementById("weight");
// var diastolic = document.getElementById("dia-pressure");
// var systolic = document.getElementById("sys-pressure");
// var temp = document.getElementById("temp");
// var height = document.getElementById("height");
// var calorie = document.getElementById("cal");
// var lastVisit = document.getElementById("last-vis"); //date
// var nextVisit = document.getElementById("next-vis"); //date
// var note = document.getElementById("doc-rem");
// var meds = document.getElementById("meds");
// var theField = document.getElementsByName("box"); //checkbox

// //Check box - checking if any box is selected
// let isChecked = false;
// for (let i = 0; i < theField.length; i++) {
//   if (theField[i].checked) {
//     isChecked = true;
//     break;
//   }
// }

//Check if date is a valid mm-dd-yyyy
function isDateValid(dateString) {
  return !isNaN(new Date(dateString));
}


//Make sure all inputs are valid
function validateItems() {
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  //global variables
  var nameo = document.getElementById("nameo");
  var age = document.getElementById("age");
  var genderBend = document.getElementById("gender"); //dropdown
  var weight = document.getElementById("weight");
  var diastolic = document.getElementById("dia-pressure");
  var systolic = document.getElementById("sys-pressure");
  var temp = document.getElementById("temp");
  var height = document.getElementById("height");
  var calorie = document.getElementById("cal");
  var lastVisit = document.getElementById("last-vis"); //date
  var nextVisit = document.getElementById("next-vis"); //date
  var note = document.getElementById("doc-rem");
  var meds = document.getElementById("meds");

  var theField = document.getElementsByName("box"); //checkbox

//Check box - checking if any box is selected
  let isChecked = false;
  for (let i = 0; i < theField.length; i++) {
    if (theField[i].checked) {
      isChecked = true;
      break;
    }
  }


  if(nameo.value === null || nameo.value === ""){
    alert("Put your name in!");
    return false;
  } else if (
    age.value <= 0 ||
    age.value >= 100 ||
    age.value === null ||
    isNaN(age.value)
  ) {
    alert("Put an appropriate age!");
    return false;
  } else if (
    weight.value <= 0 ||
    weight.value >= 600 ||
    weight.value === null ||
    isNaN(weight.value)
  ) {
    alert("Put an appropriate weight!");
    return false;
  } else if (
    diastolic.value <= 70 ||
    diastolic.value >= 200 ||
    diastolic.value === null ||
    isNaN(diastolic.value)
  ) {
    alert("Put diastolic blood pressure in");
    return false;
  } else if (
    systolic.value <= 70 ||
    systolic.value >= 200 ||
    systolic.value === null ||
    isNaN(systolic.value)
  ) {
    alert("Put systolic blood pressure in");
    return false;
  } else if (
    height.value <= 54 ||
    height.value >= 250 ||
    height.value === null ||
    isNaN(height.value)
  ) {
    alert("Put an appropriate height!");
    return false;
  } else if (
    genderBend.value === null ||
    genderBend.value === "" ||
    genderBend.value === "default"
  ) {
    alert("Select a proper gender!");
    return false;
  } else if (
    calorie.value <= 900 ||
    calorie.value >= 3000 ||
    calorie.value === null ||
    isNaN(calorie.value)
  ) {
    alert("Put your daily calorie intake!");
    return false;
  } else if (
    temp.value <= 34 ||
    temp.value >= 43 ||
    temp.value === null ||
    isNaN(temp.value)
  ) {
    alert("Put an appropriate temp!");
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
  } else if (!isDateValid(lastVisit.value)) {
    alert("Please enter a appropriate date for last visit!");
    return false;
  } else if (!isDateValid(nextVisit.value)) {
    console.log(lastVisit.value);
    alert("Please enter a appropriate date!");
    return false;
  } else {
    console.log("Success");
    prepPrint();
  }
}

//Reload the page
function freshStart() {
  location.reload();
}

//adding span tag dynamically
function prepPrint(){
  var nameInput = document.getElementById("nameSpan");
  var ageInput = document.getElementById("ageSpan");
  var genderInput= document.getElementById("genderSpan"); //dropdown
  var weightInput = document.getElementById("weightSpan");
  var diaInput = document.getElementById("diaSpan");
  var sysInput = document.getElementById("sysSpan");
  var tempInput = document.getElementById("tempSpan");
  var heightInput= document.getElementById("heightSpan");
  var calInput = document.getElementById("calSpan");
  var lastInput = document.getElementById("lastVis"); //date
  var nextInput = document.getElementById("nextvis"); //date
  var noteInput = document.getElementById("docSpan");
  var medInput = document.getElementById("presSpan");

  nameInput.innerHTML = nameo.value;
  ageInput.innerHTML = age.value;
  genderInput.innerHTML = genderBend.value;
  weightInput.innerHTML = weight.value;
  diaInput.innerHTML = diastolic.value;
  sysInput.innerHTML = systolic.value;
  tempInput.innerHTML = temp.value;
  heightInput.innerHTML = height.value;
  calInput.innerHTML = calorie.value;
  lastInput.innerHTML = lastVisit.value;
  nextInput.innerHTML = nextVisit.value;
  noteInput.innerHTML = note.value;
  medInput.innerHTML = meds.value;


}
