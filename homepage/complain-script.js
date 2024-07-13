function updateCharacterCount(textarea) {
  var maxLength = textarea.getAttribute("maxlength");
  var currentLength = textarea.value.length;
  var remaining = maxLength - currentLength;
  var counter = document.getElementById("characterCount");
  counter.textContent = remaining;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  console.log(submitButton);

  submitButton.addEventListener("click", () => {
    const rollNumber = document.getElementById("roll_number").value;
    console.log(rollNumber);
    const name = document.getElementById("name").value;
    const complaint = document.getElementById("complaint-description").value;
    console.log(complaint);

    const formData = {
      rollNumber: rollNumber,
      name: name,
      complaint: complaint,
    };
    console.log(formData);

    const studentData = {};
    for (const key in formData) {
      studentData[key] = formData[key];
    }
    console.log(studentData);

    fetch("/studentComplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Invalid Credentials!!, check roll number and password"
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/student_dashboard"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
  console.log("hello");
});
