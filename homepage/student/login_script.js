document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  console.log(submitButton);

  submitButton.addEventListener("click", () => {
    const rollNumber = document.getElementById("roll_number").value;
    console.log(rollNumber);
    const password = document.querySelector('input[name="password"]').value;

    const formData = {
      rollNumber: rollNumber,
      password: password,
    };
    console.log(formData);

    const studentData = {};
    for (const key in formData) {
      studentData[key] = formData[key];
    }
    console.log(studentData);

    fetch("/studentLogin", {
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
        window.location.href = "student/loading/loader.html"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
  console.log("hello");
});
