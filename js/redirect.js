document.addEventListener("DOMContentLoaded", function () {
  const keyInput = document.getElementById("key");

  // Add an event listener to the whole document
  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is $
    if (event.key === "$") {
      event.preventDefault();
      // Focus on the input field
      keyInput.focus();
    }
  });
});
