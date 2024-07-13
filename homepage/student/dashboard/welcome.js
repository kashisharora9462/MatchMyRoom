document.addEventListener("DOMContentLoaded", function () {
  fetch("/studentDetails")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Invalid Credentials!!, check roll number and password"
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data[0]);
      update(data[0]);
      displayStudentDetails(data[0][0]);
      //   window.location.href = "student/loading/loader.html"; // Change this URL to your desired destination
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert(error.message);
    });
});
function update(studentData) {
  const student = studentData[0];
  console.log(student);
  const temp = student.sname.split(" ");
  const name = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
  const container = document.getElementById("name");
  container.textContent = name;
}
function displayStudentDetails(studentData) {
  const studentDetailsContainer = document.getElementById("studentDetails");
  studentDetailsContainer.innerHTML = "";
  console.log(studentData);
  if (studentData) {
    const detailsList = document.createElement("ul");
    detailsList.style.listStyleType = "none";
    detailsList.style.padding = "0";
    const rollNumber = studentData.roll_Number;
    const listItem1 = document.createElement("li");
    const roll = "Roll Number";
    listItem1.innerHTML = `<strong>${roll} :</strong>  ${rollNumber}`;
    listItem1.style.margin = "8px"; // Add margin-bottom

    detailsList.appendChild(listItem1);
    const name = studentData.sname;
    const listItem2 = document.createElement("li");
    const Name = "Name";
    listItem2.innerHTML = `<strong>${Name} :</strong> ${name}`;
    listItem2.style.margin = "8px"; // Add margin-bottom
    listItem2.style.textAlign = "left";
    detailsList.appendChild(listItem2);
    const gender = studentData.gender;
    const listItem3 = document.createElement("li");
    const gen = "Gender";
    listItem3.innerHTML = `<strong>${gen} : </strong>${gender}`;
    listItem3.style.margin = "8px"; // Add margin-bottom
    listItem3.style.textAlign = "left";
    detailsList.appendChild(listItem3);
    const department = studentData.department;
    const listItem5 = document.createElement("li");
    const dept = "Department";
    listItem5.innerHTML = `<strong>${dept} : </strong>${department}`;
    listItem5.style.margin = "8px"; // Add margin-bottom
    listItem5.style.textAlign = "left";
    detailsList.appendChild(listItem5);
    const batch = studentData.batch;
    const Batch = "Batch";
    const listItem6 = document.createElement("li");
    listItem6.innerHTML = `<strong>${Batch} : </strong>${batch}`;
    listItem6.style.margin = "8px"; // Add margin-bottom
    listItem6.style.textAlign = "left";

    detailsList.appendChild(listItem6);
    const listItem7 = document.createElement("li");
    const roomie = "Room Number";
    const mate = studentData.room_Number;
    if (mate) {
      listItem7.innerHTML = `<strong>${roomie} : </strong>${mate}`;
    } else {
      listItem7.innerHTML = `<strong>${roomie} : </strong>Not alloted`;
    }

    listItem7.style.margin = "8px"; // Add margin-bottom
    listItem7.style.textAlign = "left";
    detailsList.style.textAlign = "left";
    detailsList.appendChild(listItem7);
    studentDetailsContainer.appendChild(detailsList);
  } else {
    studentDetailsContainer.textContent =
      "No student found with the provided roll number.";
  }
}
