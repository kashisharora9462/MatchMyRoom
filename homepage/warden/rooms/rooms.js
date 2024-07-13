document.addEventListener("DOMContentLoaded", function () {
  fetch("/getRooms")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch room data. Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      displayRooms(data[0]);
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert(error.message);
    });

  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", async () => {
    const roomNumber = document.getElementById("room_number").value;

    const response = await fetch("/showRoom?roomNumber=" + roomNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch room details.");
    }
    const roomData = await response.json();
    console.log(roomData);

    if (roomData && roomData[0].occupancy_Status.toLowerCase() === "occupied") {
      const hostel = roomData[0].hostel_Type;

      const response = await fetch("/showResidents?roomNumber=" + roomNumber + "&hostel=" + hostel);
      if (!response.ok) {
        throw new Error("Failed to fetch residents data.");
      }
      const residentsData = await response.json();
      console.log(residentsData);
      displayRoomDetails(roomData[0], residentsData);
    } else {
      displayRoomDetails(roomData[0], []);
    }
  });
});

async function displayRoomDetails(roomData, residentsData) {
  console.log(roomData);
  console.log(residentsData);
  const roomDetailsContainer = document.getElementById("roomDetails");
  roomDetailsContainer.innerHTML = "";

  if (roomData) {
    const detailsList = document.createElement("ul");
    detailsList.style.listStyleType = "none";
    detailsList.style.padding = "0";

    const roomNumber = roomData.room_Number;
    const listItem7 = document.createElement("li");
    const room = "Room Number";
    listItem7.innerHTML = `<strong>${room} :</strong>  ${roomNumber}`;
    listItem7.style.margin = "10px 0";
    listItem7.style.fontSize = "18px";
    listItem7.style.textAlign = "left";
    detailsList.appendChild(listItem7);

    const occupancy = roomData.occupancy_Status;
    const listItem2 = document.createElement("li");
    const Occupancy = "Occupancy Status";
    listItem2.innerHTML = `<strong>${Occupancy} :</strong> ${occupancy}`;
    listItem2.style.margin = "10px 0";
    listItem2.style.textAlign = "left";
    listItem2.style.fontSize = "18px";
    detailsList.appendChild(listItem2);

    const floor = roomData.floor;
    const listItem3 = document.createElement("li");
    const Floor = "Floor";
    listItem3.innerHTML = `<strong>${Floor} : </strong>${floor}`;
    listItem3.style.margin = "10px 0";
    listItem3.style.textAlign = "left";
    listItem3.style.fontSize = "18px";
    detailsList.appendChild(listItem3);

    const type = roomData.hostel_Type;
    const listItem5 = document.createElement("li");
    const hostel = "Hostel";
    listItem5.innerHTML = `<strong>${hostel} : </strong>${type}`;
    listItem5.style.margin = "10px 0";
    listItem5.style.textAlign = "left";
    listItem5.style.fontSize = "18px";
    detailsList.appendChild(listItem5);

    const capacity = roomData.room_Capacity;
    const room_c = "Room Capacity";
    const listItem6 = document.createElement("li");
    listItem6.innerHTML = `<strong>${room_c} : </strong>${capacity}`;
    listItem6.style.margin = "10px 0";
    listItem6.style.textAlign = "left";
    listItem6.style.fontSize = "18px";
    detailsList.appendChild(listItem6);

    if (occupancy.toLowerCase() === "occupied") {
      if (residentsData.length > 0) {
        residentsData.forEach((resident, index) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<strong>Resident ${
            index + 1
          } : </strong>${resident.sname.toUpperCase()}`;
          listItem.style.margin = "10px 0";
          listItem.style.textAlign = "left";
          listItem.style.fontSize = "18px";
          detailsList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement("li");
        listItem.textContent = "No residents found.";
        listItem.style.margin = "10px 0";
        listItem.style.textAlign = "left";
        listItem.style.fontSize = "18px";
        detailsList.appendChild(listItem);
      }
    }

    roomDetailsContainer.appendChild(detailsList);
  } else {
    roomDetailsContainer.textContent =
      "No room found with the provided room number.";
    roomDetailsContainer.style.fontWeight = "bold";
    roomDetailsContainer.style.fontSize = "20px";
  }
}

function displayRooms(roomData) {
  const roomTable = document.getElementById("roomTable");
  console.log(roomTable);
  roomTable.innerHTML = ""; // Clear existing table content

  // After adding content to the table dynamically
  // Add this code to apply scrollbar styles
  document
    .getElementById("roomTableContainer")
    .classList.add("custom-scrollbar");

  if (roomData && roomData.length > 0) {
    console.log(roomData.length);
    const headers = ["Room Number", "Floor", "Capacity", "Hostel"];
    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      th.style.padding = "8px";
      th.style.border = "1px solid #dddddd";
      th.style.textAlign = "left";
      th.style.position = "sticky";
      th.style.top = "0";
      th.style.zIndex = "2";
      th.style.background = "#D3A675"; // Higher than the scrollable content
      headerRow.appendChild(th);
    });
    roomTable.appendChild(headerRow);

    // Table data
    roomData.forEach((room) => {
      const dataRow = document.createElement("tr");
      Object.values(room).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        td.style.padding = "8px";
        td.style.border = "1px solid #dddddd";
        td.style.textAlign = "left";
        dataRow.appendChild(td);
      });
      roomTable.appendChild(dataRow);
    });
  } else {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.textContent = "No vacant room available.";
    emptyCell.style.fontWeight = "bold"; // Make text bold
    emptyCell.style.fontSize = "30px"; // Set font size to 16 pixels
    emptyRow.appendChild(emptyCell);
    roomTable.appendChild(emptyRow);
  }
}