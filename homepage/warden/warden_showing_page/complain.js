document.addEventListener("DOMContentLoaded", function () {
  fetch("/getComplaints")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch room data. Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      //   displayRooms(data[0]);
      displayComplaintDetails(data[0]);
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
    fetch("/showComplaints?rollNumber=" + rollNumber)
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
        displayComplaintDetail(data);
        // window.location.href = "student/loading/loader.html"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
});
function displayComplaintDetails(complaints) {
  const complaintTable = document.getElementById("complaintTable");
  const tbody = document.getElementById("tb1");
  tbody.innerHTML = ""; // Clear existing content
  const pen = document.getElementById("display-rooms-btn");

  if (!complaints || complaints.length === 0) {
    pen.textContent = "No pending complaints found";
  } else {
    pen.textContent = "Pending Complaints";
    const headers = {
      complaint_no: "Complaint Number",
      student_name: "Name",
      student_Roll_Number: "Roll Number",
      complaint_description: "Description",
      complaint_Status: "Status",
    };

    // Create the header row and add it to the table head
    const thead = document.getElementById("th1");
    const headerRow = document.createElement("tr");
    for (const key in headers) {
      const th = document.createElement("th");
      th.textContent = headers[key];
      th.style.color = "#724162";

      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Add the headers to the table body
    complaints.forEach((complaint, index) => {
      const tr = document.createElement("tr");

      // Display complaint number
      const complaintNumberTd = document.createElement("td");
      complaintNumberTd.textContent = index + 1;
      tr.appendChild(complaintNumberTd);

      // Display other complaint details
      for (const key in headers) {
        if (key !== "complaint_no") {
          // Skip assigning complaint_no to other columns
          const td = document.createElement("td");
          td.textContent = complaint[key];

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

function displayComplaintDetail(complaints) {
  console.log(complaints);
  const complaintTable = document.getElementById("complaintTable2");
  const tbody = document.getElementById("tb2");
  tbody.innerHTML = ""; // Clear existing content
  const pen = document.getElementById("complaints");

  if (!complaints || complaints.length === 0) {
    pen.textContent = "No pending complaints found";
  } else {
    const headers = {
      complaint_no: "Complaint Number",
      student_Name: "Name",
      complaint_description: "Description",
      complaint_Status: "Status",
    };

    // Create the header row and add it to the table head
    const thead = document.getElementById("th2");
    thead.innerHTML = "";
    const headerRow = document.createElement("tr");
    for (const key in headers) {
      const th = document.createElement("th");
      th.textContent = headers[key];
      th.style.color = "#724162";

      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Add the headers to the table body
    complaints.forEach((complaint, index) => {
      const tr = document.createElement("tr");

      // Display complaint number
      const complaintNumberTd = document.createElement("td");
      complaintNumberTd.textContent = index + 1;
      tr.appendChild(complaintNumberTd);

      // Display other complaint details
      for (const key in headers) {
        if (key !== "complaint_no") {
          // Skip assigning complaint_no to other columns
          const td = document.createElement("td");
          td.textContent = complaint[key];

          tr.appendChild(td);
        }
      }

      tbody.appendChild(tr);
    });

    // Fix the header
    const header = document.getElementById("th2");
    header.style.position = "sticky";
    header.style.top = "0";
    header.style.zIndex = "1";
    header.style.backgroundColor = "#FFEBCD";
  }
}
