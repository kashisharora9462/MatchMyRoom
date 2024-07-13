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
    const student_rollNumber = document.getElementById(
      "student_roll_number"
    ).value;

    console.log(student_rollNumber);
    const name = document.getElementById("name").value;
    const request_description = document.getElementById(
      "complaint-description"
    ).value;
    console.log(request_description);
    const roommate_rollNumber = document.getElementById(
      "roommate_roll_number"
    ).value;

    const formData = {
      student_rollNumber: student_rollNumber,
      roommate_rollNumber: roommate_rollNumber,
      name: name,
      request_description: request_description,
    };
    // console.log(formData);

    const studentData = {};
    for (const key in formData) {
      studentData[key] = formData[key];
    }
    console.log(studentData);

    fetch("/roommateChange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Check the details, also make sure you're not entering the same details again"
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "loading/loader.html"; // Change this URL to your desired destination
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert(error.message);
      });
  });
  console.log("hello");
});
