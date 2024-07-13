document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    console.log("hello");
    window.location.href = "/student_dashboard"; // Redirects to home page after 2 seconds
  }, 2000);
});
