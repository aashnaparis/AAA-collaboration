async function post_patient_data(){
    let patient_name = document.getElementById('name-input').value;
    console.log(patient_name);
    
    let patient_age = document.getElementById('age').value;
    console.log(patient_age);
    ////

    let new_patient_patient_data = document.createElement('div');

    new_patient_patient_data.innerHTML = `Name: ${patient_name}<br>Age: ${patient_age}`;
    document.body.appendChild(new_patient_patient_data);

    /*new_patient_patient_data.innerHTML = patient_name;
    document.body.appendChild(new_patient_patient_data);

    new_patient_patient_data.innerHTML = patient_age;
    document.body.appendChild(new_patient_patient_data);*/
    ///

    var requestBody = {
        "patient_name": patient_name,
        "patient_age": patient_age
    }
    console.log(requestBody);

    var settings = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        },"body": JSON.stringify(requestBody)
    };

    var response = await fetch ("https://aaa-collaboration.onrender.com/patient_profile",settings);
    console.log(response.status);
    if(response.status != 201){
        alert("Error");
        return;
    }

    var patient_data_response_body = await response.json();
    console.log(patient_data_response_body);

    var patient_data = document.getElementById("patient-data");
    patient_data.innerHTML = requestBody;
    patient_data.innerHTML = `Name: ${patient_name}<br>Age: ${patient_age}`;

}
document.getElementById("myForm").addEventListener("submit", (event)=> {
    event.preventDefault();
    post_patient_data();
})
async function get_patient_data(){
    var response = await fetch ("https://aaa-collaboration.onrender.com/patient_profile");

    var patient_data_response_body = await response.json();
    console.log(patient_data_response_body);

    patient_data_hub = document.getElementById("patient-data");
    patient_data_hub.innerHTML ="";


    patient_data_response_body.profile_patient.patient_profile.forEach(element => {
        var patient_info = document.createElement('div');
        patient_info.classList.add("patient-data");

        patient_info.innerHTML =
        `Name: ${patient.patient_name}<br>Age: ${patient.patient_age}<br>ID: ${patient._id}`;

        patient_data_hub.appendChild(patient_info);
    });
}
get_patient_data();