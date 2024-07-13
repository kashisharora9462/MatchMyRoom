document.addEventListener("DOMContentLoaded", function () {
  fetch("/getRequests")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch room data. Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      //   displayRooms(data[0]);
      displayRequestDetails(data[0]);
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert(error.message);
    });
  const submitButton = document.getElementById("submitButton");
  console.log(submitButton);
  submitButton.addEventListener("click", () => {
    const rollNumber = document.getElementById("roll_number").value;
    console.log(rollNumber);
    fetch("/showRequests?rollNumber=" + rollNumber)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Please login First , if already logged in check the credentials"
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        displayRequest(data[0]);
        // window.location.href = "student/loading/loader.html"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
  const submit = document.getElementById("allot");
  submit.addEventListener("click", () => {
    fetch("/allot")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Please login First , if already logged in check the credentials"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
});
function displayRequestDetails(requests) {
  const requestTable = document.getElementById("requestTable");
  const tbody = document.getElementById("tb1");
  tbody.innerHTML = "";
  const pen = document.getElementById("display-rooms-btn");

  if (!requests || requests.length === 0) {
    pen.textContent = "No pending requests found";
  } else {
    pen.textContent = "Pending Roommate change requests";
    const headers = {
      complaint_no: "Request Number",
      student_name: "Name",
      new_Roommate_Roll: "Desired Roommate Roll number",
      student_roll_Number: "Roll Number",
      request_description: "Reason",
    };
    const thead = document.getElementById("th1");
    const headerRow = document.createElement("tr");
    for (const key in headers) {
      const th = document.createElement("th");
      th.textContent = headers[key];
      th.style.color = "#2F4F4F";

      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    requests.forEach((request, index) => {
      const tr = document.createElement("tr");

      const complaintNumberTd = document.createElement("td");
      complaintNumberTd.textContent = index + 1;
      tr.appendChild(complaintNumberTd);

      for (const key in headers) {
        if (key !== "complaint_no") {
          const td = document.createElement("td");
          td.textContent = request[key];

          tr.appendChild(td);
        }
      }

      tbody.appendChild(tr);
    });
    const header = document.getElementById("th1");
    header.style.position = "sticky";
    header.style.top = "0";
    header.style.zIndex = "1";
    header.style.backgroundColor = "#FFEBCD";
  }
}

function displayRequest(requestData) {
  const requestDetailsContainer = document.getElementById("requestDetails");
  requestDetailsContainer.innerHTML = "";

  console.log(requestData);
  if (requestData) {
    const detailsList = document.createElement("ul");
    detailsList.style.listStyleType = "none";
    detailsList.style.padding = "0";

    const rollNumber = requestData.student_roll_Number;
    const listItem7 = document.createElement("li");
    const roll = "Roll Number";
    listItem7.innerHTML = `<strong>${roll} :</strong>  ${rollNumber}`;
    listItem7.style.margin = "10px 0"; // Add margin bottom
    listItem7.style.fontSize = "25px";
    listItem7.style.textAlign = "left";
    listItem7.style.padding - "0";
    detailsList.appendChild(listItem7);
    const name = requestData.student_name;
    const listItem2 = document.createElement("li");
    const Name = "Name";
    listItem2.innerHTML = `<strong>${Name} :</strong> ${name}`;
    listItem2.style.margin = "10px 0"; // Add margin bottom
    listItem2.style.textAlign = "left";
    listItem2.style.fontSize = "25px"; // Increase font size
    detailsList.appendChild(listItem2);
    const roomie = requestData.new_Roommate_Roll;
    const listItem3 = document.createElement("li");
    const roomieRoll = "Desired Roommate's Roll Number";
    listItem3.innerHTML = `<strong>${roomieRoll} : </strong>${roomie}`;
    listItem3.style.margin = "10px 0"; // Add margin bottom
    listItem3.style.textAlign = "left";
    listItem3.style.fontSize = "25px"; // Increase font size
    detailsList.appendChild(listItem3);
    const desc = requestData.request_description;
    const listItem5 = document.createElement("li");
    const req_des = "Request reason";
    listItem5.innerHTML = `<strong>${req_des} : </strong>${desc}`;
    listItem5.style.margin = "10px 0"; // Add margin bottom
    listItem5.style.textAlign = "left";
    listItem5.style.fontSize = "25px";
    detailsList.appendChild(listItem5);
    const stat = requestData.request_Status;
    const req_s = "Status";
    const listItem6 = document.createElement("li");
    listItem6.innerHTML = `<strong>${req_s} : </strong>${stat}`;
    listItem6.style.margin = "10px 0"; // Add margin bottom
    listItem6.style.textAlign = "left";
    listItem6.style.fontSize = "25px"; // Increase font size
    detailsList.appendChild(listItem6);
    requestDetailsContainer.appendChild(detailsList);
  } else {
    const pen = document.getElementById("request");
    pen.style.marginTop = "20px";
    pen.textContent = "No roommate change requests found for this roll number";
    // roomDetailsContainer.margin = "35px 0";
  }
}
