document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    console.log("hello");
    window.location.href = "/home";
    // Redirects to home page after 2 seconds
  }, 1500);
});
