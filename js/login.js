// =========================
//        LOGIN SCRIPT
// =========================

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.innerHTML =
      '<img src="./assets/Imgaes/eye_login.png" alt="Show Password">';
  } else {
    passwordInput.type = "password";
    toggleIcon.innerHTML =
      '<img src="./assets/Imgaes/eye_slash_login.png" alt="Hide Password">';
  }
}

// Auto Uppercase for Employee ID
document.getElementById("employeeId").addEventListener("input", function () {
  this.value = this.value.toUpperCase();
});

// Reference to existing error spans in HTML
const employeeError = document.getElementById("employeeIdError");
const passwordError = document.getElementById("passwordError");

// List of valid employee IDs
const validIds = ["FST001", "FST002", "FST003", "FST004", "FST005"];
const validPassword = "1234";

// Handle Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = document.getElementById("employeeId").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.querySelector(".login-btn");

  // Reset error messages
  employeeError.textContent = "";
  passwordError.textContent = "";

  // Check for empty fields
  if (!employeeId) {
    employeeError.textContent = "Please enter your Employee ID";
    return;
  }

  if (!password) {
    passwordError.textContent = "Please enter your Password";
    return;
  }

  // Validate Employee ID
  if (!validIds.includes(employeeId)) {
    employeeError.textContent = "Invalid Employee ID";
    return;
  }

  // Validate Password
  if (password !== validPassword) {
    passwordError.textContent = "Wrong Password";
    return;
  }

  // If valid credentials -> show spinner & redirect
loginBtn.disabled = true;
loginBtn.innerHTML = '<div class="loading-spinner"></div>';

// Store logged-in user ID
sessionStorage.setItem("loggedInUser", employeeId);

// Redirect with slight delay
setTimeout(() => {
  window.location.href = "home.html";
}, 1200);
});
