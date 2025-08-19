
window.onload = function () {
    getData();
};

async function getData() {
    // so we can know who is signed in based on username
    const username = localStorage.getItem("username");
    console.log(username);

    //want to do things with this info on the third page
    var patientData = await fetch(`https://aaa-collaboration-nij9.onrender.com/${username}`);
    var patientBody = await patientData.json();
    console.log(patientBody);

    const bp = {
        sys: patientBody.patient_sys,
        dia: patientBody.patient_dia
    };

    const result = classifyBloodPressure(bp.sys, bp.dia);

    const temp = patientBody.patient_temp;
    const age = patientBody.patient_age;

    const height = patientBody.patient_height;
    const weight = patientBody.patient_weight;

    const gender = patientBody.patient_gender;
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



    //temp
    if (temp < 35) {
        tempCategory = "Hypothermia (Too Low)";
        tempClass = "warning";
    } else if (temp < 37.5) {
        tempCategory = "Normal";
        tempClass = "good";
    } else if (temp < 39) {
        tempCategory = "Fever (Mild)";
        tempClass = "warning";
    } else {
        tempCategory = "High Fever (Dangerous)";
        tempClass = "bad";
    }


    // for Blood Pressure
    document.getElementById("bpStat").innerHTML =
        `Blood Pressure: ${bp.sys}/${bp.dia} mmHg → 
        <span class="status ${result.class}">${result.category}</span>`;

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

    //for Temp
    document.getElementById("tempStat").innerHTML =
        `Temp: ${temp} °C → 
   <span class="status ${tempClass}">${tempCategory}</span>`;

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

    new Chart(document.getElementById("cal"), {
        type: "doughnut",
        data: {
            labels: ["Normally Consumed", "Calculated Calorie Intake"],
            datasets: [{
                data: [calorie, intake - calorie],
                backgroundColor: ["#ff6384", "e0e0e0"]
            }]
        }
    });

    //for bmi
    document.getElementById("bmiStat").innerHTML = "BMI: ${bmi} (${comment})"
    new Chart(document.getElementById("bmi"), {
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
                    title: { display: true, text: "BMI" }
                }
            }
        }
    });

}


function classifyBloodPressure(sys, dia) {
    if (sys < 120 && dia < 80) {
        return { category: "Normal", class: "good" };
    }
    else if (sys >= 120 && sys <= 129 && dia < 80) {
        return { category: "Elevated", class: "warning" };
    }
    else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
        return { category: "Hypertension Stage 1", class: "bad" };
    }
    else if ((sys >= 140 && sys <= 179) || (dia >= 90 && dia <= 119)) {
        return { category: "Hypertension Stage 2", class: "bad" };
    }
    else if (sys >= 180 || dia >= 120) {
        return { category: "Hypertensive Crisis 🚨", class: "critical" };
    }
    else {
        return { category: "Unclassified", class: "neutral" };
    }
}






