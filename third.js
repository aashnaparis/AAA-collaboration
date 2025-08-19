
window.onload = function() {
  getData();
};

async function getData() {
     // so we can know who is signed in based on username
    const username = localStorage.getItem("username");

    //want to do things with this info on the third page
    var patientData = await fetch(`https://aaa-collaboration.onrender.com/profile/${username}`);
    var patientBody = await patientData.json();
    console.log(patientBody);

    const bp = {
        sys: patientBody.patient_sys,
        dia: patientBody.patient_dia
    };

    const temp = patientBody.patient_temp;
    const age = patientBody.patient_age;

    const height = patientBody.patient_height;
    const weight = patientBody.patient_weight;

    //change lbs to kg
    const kg = weight / 2.205;

    const calorie = patientBody.patient_cal;


    // calorie intake formula based on weight, height and age
    if (gender === "female") {
        var intake = (10 * kg) + (6.25 * height) - (5 * age) - 161;
    } else {
        var intake = (10 * kg) + (6.25 * height) - (5 * age) + 5;
    }

    //bmi based on weight and height (imperial)
    var bmi = (weight / (height * height)) * 7030

    var status = "";
    var comment = "good";

    if (bmi < 18.5) { 
      status = "Underweight"; 
      comment = "warning"; 
    } else if (bmi < 25) { 
      status = "Normal"; 
      comment = "good"; 
    } else if (bmi < 30) { 
      status = "Overweight"; 
      comment = "warning"; 
    } else { 
      status = "Obese"; 
      comment = "bad"; 
    }


    // for Blood Pressure
    new Chart(document.getElementById("bp"), {
        type: "bar",
        data: {
            labels: ["Systolic", "Diastolic"],
            datasets: [{
                data: [bp.sys, bp.dia],
                backgroundColor: ['#5d42f5ff', '#66bb6a']
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: { min: 60, max: 180 }
            }
        }
    });

    //for Temperature
    new Chart(document.getElementById("temp"), {
        type: "bar",
        data: {
            labels: ["Temp in Celcius"],
            datasets: [{
                data: [temp],
                backgroundColor: ['#5d42f5ff']
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: { min: 30, max: 40 }
            }
        }
    });

    // for Calories
    new Chart(document.getElementById("cal"),{
        type: "doughnut",
        data: {
            labels: ["Normally Consumed", "Calculated Calorie Intake"],
            datasets:[{
                data: [calorie, intake - calorie],
                backgroundColor: ["#ff6384", "e0e0e0"]
            }]
        }
    });

    //for bmi
    document.getElementById("bmiStat").innerHTML = "BMI: ${bmi} (${comment})"
    new Chart(document.getElementById("bmi"),{
        type: "bar",
        data: {
            labels: ["BMI"],
            datasets: [
                {
                    label: "Your BMI",
                    data: [bmi],
                    backgroundColor: "gray"
                }
            ] 
        },
        options: {
            indexAxis: "y",
            scales: {
                x: {
                    min: 10,
                    max: 40,
                    title: {display: true, text: "BMI"}
                }
            }
        }
    });

}


window.onload = function() {
    // so we can know who is signed in based on username
    const username = localStorage.getItem("username");
  getData();
};




