// Toggle Password Visibility with Images
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // Change to "hide" password icon
        toggleIcon.innerHTML = '<img src="./assets/Imgaes/eye_login.png" alt="Show Password">';
    } else {
        passwordInput.type = 'password';
        // Change to "show" password icon
        toggleIcon.innerHTML = '<img src="./assets/Imgaes/eye_slash_login.png" alt="Hide Password">';
    }
}

// AUTO UPPERCASE FOR EMPLOYEE ID - NEW CODE
document.getElementById('employeeId').addEventListener('input', function(e) {
    this.value = this.value.toUpperCase();
});

// Form Submission Handler - Now works with button outside form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;
    
    if (!employeeId || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    console.log('Employee ID:', employeeId);
    console.log('Password:', password);
    
    // Add your login logic here
    alert('Login functionality will be implemented here');
});

// Optional: Handle Enter key press in form fields
document.getElementById('employeeId').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});

document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
