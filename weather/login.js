// Mock user credentials (you can replace it with real authentication logic later)
const validUsername = "user";
const validPassword = "password123";

// Reference to the form and error message
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

// Handle form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username and password match
    if (username === validUsername && password === validPassword) {
        // Redirect to the weather page (replace 'weather.html' with your actual weather page file)
        window.location.href = "index.html";
    } else {
        // Show error message
        errorMessage.style.display = "block";
    }
});
