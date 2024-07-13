document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  console.log(submitButton);

  submitButton.addEventListener("click", () => {
    console.log(document.getElementById("name").value);
    const name = document.getElementById("name").value;
    const rollNumber = document.getElementById("roll_number").value;
    console.log(rollNumber);
    const batch = document.getElementById("batch").value;
    const gender = document.getElementById("gender").value;
    const password = document.querySelector('input[name="password"]').value;
    const department = document.querySelector('input[name="department"]').value;

    const formData = {
      name: name,
      rollNumber: rollNumber,
      batch: batch,
      gender: gender,
      password: password,
      department: department,
    };
    console.log(formData);

    const studentData = {};
    for (const key in formData) {
      studentData[key] = formData[key];
    }
    console.log(studentData);

    fetch("/submitStudentDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid Entry!! Check the data you have entered.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Congratuations , Account Created Succesfully!!");
        window.location.href = "/roommate_request"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, display error message to the user
        window.alert("An error occurred: " + error.message);
      });
  });
  console.log("hello");
});
