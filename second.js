//Second page javascript

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
      // postData();
    });

  //variables
  var nameo = document.getElementById("nameo");
  var age = document.getElementById("age");
  var gender = document.getElementById("gender"); //dropdown
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
    systolic.value <= 75 ||
    systolic.value >= 120 ||
    systolic.value === null ||
    isNaN(systolic.value)
  ) {
    alert("Put systolic blood pressure in");
    return false;
  } else if (
    height.value <= 120 ||
    height.value >= 180 ||
    height.value === null ||
    isNaN(height.value)
  ) {
    alert("Put an appropriate height!");
    return false;
  } else if (
    gender.value === null ||
    gender.value === "" ||
    gender.value === "default"
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
    temp.value >= 40 ||
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
    postData();
    prepPrint();
  }
}

//Reload the page
function freshStart() {
  location.reload();
}

//adding span tag dynamically
function prepPrint(){

  //Variables for embedded span tags
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
  var nextInput = document.getElementById("nextVis"); //date
  var checkInput = document.getElementById("pre");
  var noteInput = document.getElementById("docSpan");
  var medInput = document.getElementById("presSpan");

  //same variables form function above
  var theField = document.getElementsByName("box"); //checkbox
  var diastolic = document.getElementById("dia-pressure");
  var systolic = document.getElementById("sys-pressure");
  var temp = document.getElementById("temp");
  // var height = document.getElementById("height");
  var calorie = document.getElementById("cal");
  var lastVisit = document.getElementById("last-vis"); //date
  var nextVisit = document.getElementById("next-vis"); //date
  var note = document.getElementById("doc-rem");
  var meds = document.getElementById("meds");

  //Populating spans
  nameInput.innerHTML = nameo.value;
  ageInput.innerHTML = age.value;
  heightInput.innerHTML = height.value  + "cm";

  //switch case for the dropdown menu
  switch(gender.value) {
    case "male":
      genderInput.innerHTML = "Male";
      break;
    case "female":
      genderInput.innerHTML = "Female";
      break;
    case "trans":
      genderInput.innerHTML = "Trans";
      break;
    case "preferno":
      genderInput.innerHTML = "Prefer not to say";
      break;
  }

 

  weightInput.innerHTML = weight.value + " lbs";
  // console.log(diastolic.value);
  diaInput.innerHTML = diastolic.value + " mmHg";
  sysInput.innerHTML = systolic.value + " mmHg";
  tempInput.innerHTML = temp.value + " °C";
  
  calInput.innerHTML = calorie.value + " calories per day";
  lastInput.innerHTML = lastVisit.value;

  //getting values from the checkboxes
  let result = "";
  for (var i = 0; i < theField.length; i++) {
    if (theField[i].checked) {
      if(theField[i].value !== "none"){
        result += theField[i].value + "  ";
      }else{
        result = theField[i].value;
      }
      
    }
  }
  
  checkInput.innerHTML = result;
  nextInput.innerHTML = nextVisit.value;
  noteInput.innerHTML = note.value;
  medInput.innerHTML = meds.value;

  //creating a button to print screen when button is populated
  var butt = document.getElementById("button");
  var printScr = document.createElement("button");
  printScr.textContent = "Print Screen";
  printScr.id = "print";
  printScr.onclick = function (){
    window.print();
  }
  butt.appendChild(printScr);


}

// async function getData(){
//   //want to do things with this info on the third page
//   var patientData = await fetch("https://aaa-collaboration.onrender.com/aashna");
//   var patientBody = await patientData.json();
//   console.log(patientBody);

// }

async function postData(){

  //same variables again
  var nameo = document.getElementById("nameo");
  var age = document.getElementById("age");
  var gender = document.getElementById("gender"); //dropdown
  var weight = document.getElementById("weight");
  var theField = document.getElementsByName("box"); //checkbox
  var diastolic = document.getElementById("dia-pressure");
  var systolic = document.getElementById("sys-pressure");
  var temp = document.getElementById("temp");
  var height = document.getElementById("height");
  var calorie = document.getElementById("cal");
  var lastVisit = document.getElementById("last-vis"); //date
  var nextVisit = document.getElementById("next-vis"); //date
  var note = document.getElementById("doc-rem");
  var meds = document.getElementById("meds");

  //getting values from the checkboxes
  let result = "";
  for (var i = 0; i < theField.length; i++) {
    if (theField[i].checked) {
      if(theField[i].value !== "none"){
        result += theField[i].value + "  ";
      }else{
        result = theField[i].value;
      }
      
    }
  }
  
  //sending all the info to api
  var requestBody = {
    // "userId": "aashna",
    "patient_name": nameo.value,
    "patient_age": parseInt(age.value),
    "patient_height": parseFloat(height.value), 
    "patient_gender": gender.value,
    "patient_weight": parseFloat(weight.value),
    "patient_dia": parseFloat(diastolic.value),
    "patient_sys": parseFloat(systolic.value),
    "patient_temp": parseFloat(temp.value),
    "patient_cal": parseFloat(calorie.value),
    "last_visit": lastVisit.value,
    "pre_con": result,
    "next_visit": nextVisit.value,
    "doc_remarks": note.value,
    "prescription": meds.value
  };
  
  var settings = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(requestBody)
    }; 
    
    var response = await fetch("https://aaa-collaboration-nij9.onrender.com/data",settings)

    if(response.status != 201){
      alert("Something went wrong!");
    }

    var responseBody = await response.json();
    console.log(responseBody);

}

function backMain(){
     document.getElementById("backButton").addEventListener("click", function(){
      window.location.href = "index.html"
     });
}
