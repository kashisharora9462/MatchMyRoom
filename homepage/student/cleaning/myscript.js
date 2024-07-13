const colour = function () {
  // Generate random colour
  const hex = "0123456789ABCDEF";
  let color = "#"; // Color is of form #123456
  for (let i = 0; i < 6; i++) {
    color = color + hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

const startChanging = function () {
  // Start changing background color
  const interval = setInterval(changebgcolour, 500);

  function changebgcolour() {
    document.querySelector(".right").style.backgroundColor = colour();
  }
};
startChanging();

// Call fetchCleaningDetails() when the page loads
document.addEventListener("DOMContentLoaded", fetchCleaningDetails);

async function fetchCleaningDetails() {
  try {
    const response = await fetch("/getCleaningDetails");
    if (!response.ok) {
      throw new Error("Failed to fetch cleaning details");
    }
    const data = await response.json();
    console.log(data[0]);
    displayCleaningDetails(data[0][0]);
  } catch (error) {
    console.error("Error fetching cleaning details:", error);
    // Display an error message to the user
    const detailsDiv = document.getElementById("cleaningdet");
    detailsDiv.innerHTML = "";
    const errorMessage = document.createElement("h1");
    errorMessage.textContent = "Error fetching cleaning details. Please try again later.";
    detailsDiv.appendChild(errorMessage);
  }
}

function displayCleaningDetails(details) {
  const detailsDiv = document.getElementById("cleaningdet");
  detailsDiv.innerHTML = ""; // Clear previous content
  console.log(details);
  if (details) {
    const detailsList = document.createElement("ul");
    detailsList.style.listStyleType = "none";
    detailsList.style.marginTop = "40px";
    detailsList.style.padding = "0";
    const rollNumber = details.room_Number;
    const listItem1 = document.createElement("li");
    const roll = "Room Number";
    listItem1.innerHTML = `<strong>${roll} :</strong>  ${rollNumber}`;
    listItem1.style.margin = "5px"; // Add margin-bottom
    listItem1.style.fontSize = "25px";
    listItem1.style.marginLeft = "5px";
    detailsList.appendChild(listItem1);
    const day = details.cleaning_day;
    const listItem2 = document.createElement("li");
    const cleaning = "Cleaning day";
    listItem2.style.fontSize = "25px";
    listItem2.innerHTML = `<strong>${cleaning} :</strong> ${day}`;
    listItem2.style.margin = "5px"; // Add margin-bottom
    listItem2.style.textAlign = "left";
    detailsList.appendChild(listItem2);
    const clean_stat = details.cleaning_Status;
    const listItem3 = document.createElement("li");
    const stat = "Cleaning Status";
    listItem3.innerHTML = `<strong>${stat} : </strong>${clean_stat}`;
    listItem3.style.margin = "5px"; // Add margin-bottom
    listItem3.style.textAlign = "left";
    listItem3.style.fontSize = "25px";
    detailsList.appendChild(listItem3);

    detailsDiv.appendChild(detailsList);
  } else {
    console.log("hello");
    const noDataMessage = document.createElement("h1");
    noDataMessage.style.marginTop = "30px";
    noDataMessage.textContent = "No cleaning details found.";
    detailsDiv.appendChild(noDataMessage);
  }
}