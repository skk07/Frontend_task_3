// -------------------------- Reusable email validation function ----------------------------------------------------

function validateEmail(emailInput, feedbackElement) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();
    const isValid = emailPattern.test(emailValue);

    // Show feedback message based on validity
    feedbackElement.style.display = isValid ? "none" : "block";
    feedbackElement.textContent = isValid ? "" : "Invalid email format.";

    // Update input classes based on validity
    emailInput.classList.toggle('is-valid', isValid);
    emailInput.classList.toggle('is-invalid', !isValid);

    return isValid; // Return the validity status
}

// -------------------------------- Toggle between Login and Registration forms -----------------------------------------

function toggleForms(formType) {
    const forms = {
        login: document.getElementById('login-form'),
        register: document.getElementById('register-form'),
    };

    const buttons = {
        login: document.getElementById('login-btn'),
        register: document.getElementById('register-btn'),
    };

    // Toggle visibility and button styles
    Object.keys(forms).forEach(type => {
        forms[type].classList.toggle('d-none', type !== formType);
        buttons[type].classList.toggle('btn-primary', type === formType);
        buttons[type].classList.toggle('btn-light', type !== formType);
    });
}

// ---------------------------------- Password strength and matching checker -----------------------------------------

function checkPasswordStrengthAndMatch(password, confirmPassword, strengthElement, feedbackElement) {
    let strength = 0;
    if (password.length >= 8) strength++; // length
    if (/[A-Z]/.test(password)) strength++; // uppercase
    if (/[0-9]/.test(password)) strength++; // number
    if (/[\W_]/.test(password)) strength++; // special characters

    // Update strength message
    switch (strength) {
        case 0:
            strengthElement.textContent = '';
            break;
        case 1:
            strengthElement.textContent = 'Weak';
            strengthElement.style.color = 'red';
            break;
        case 2:
            strengthElement.textContent = 'Moderate';
            strengthElement.style.color = 'orange';
            break;
        case 3:
        case 4:
            strengthElement.textContent = 'Strong';
            strengthElement.style.color = 'green';
            break;
    }

    // Password matching condition
    if (confirmPassword) {
        feedbackElement.textContent = password === confirmPassword ? "Passwords match." : "Passwords do not match.";
        feedbackElement.style.color = password === confirmPassword ? "green" : "red";
    }
}

// ---------------------------- Password strength meter function for registration -----------------------------------

document.getElementById("r_password").addEventListener("input", function () {
    const password = this.value;
    const strengthDiv = document.getElementById("password-strength-register");
    const confirmPassword = document.getElementById("r_cpassword").value;

    checkPasswordStrengthAndMatch(password, confirmPassword, strengthDiv, document.getElementById("confirmPasswordFeedback"));
});

// ---------------------------- Password validation for change password ----------------------------------------------

document.getElementById('newUserPassword').addEventListener('input', function () {
    const newPassword = this.value;
    const strengthElement = document.getElementById('passwordStrengthMessage');
    const confirmPassword = document.getElementById('confirmUserPassword').value.trim();
    
    checkPasswordStrengthAndMatch(newPassword, confirmPassword, strengthElement, document.getElementById('confirmPasswordFeedbackMessage'));
});

// -------------------------- Add event listener to the confirm password field to validate matching ---------------------------------------------------

document.getElementById('confirmUserPassword').addEventListener('input', function () {
    const confirmPassword = this.value.trim();
    const newPassword = document.getElementById('newUserPassword').value.trim();
    const strengthElement = document.getElementById('passwordStrengthMessage');
    
    checkPasswordStrengthAndMatch(newPassword, confirmPassword, strengthElement, document.getElementById('confirmPasswordFeedbackMessage'));
});

// ---------------------------------------- Login form validation ------------------------------------------------------------------------------

document.getElementById("loginForm").addEventListener("submit", function (event) {
    const loginEmailInput = document.getElementById("email");
    const loginEmailMessageDiv = document.getElementById("login_message_email");
    const loginPasswordInput = document.getElementById("password");
    const loginPasswordMessageDiv = document.getElementById("login_message_password");

    let loginIsValid = true;

    // Validate email
    if (!loginEmailInput.value.trim()) {
        loginEmailInput.classList.add('is-invalid'); // Add invalid class for styling
        loginEmailMessageDiv.textContent = "Email is required.";
        loginEmailMessageDiv.style.display = 'block'; // Show error message
        loginIsValid = false;
    } else if (!validateEmail(loginEmailInput.value)) { // Check if the email format is valid
        loginEmailInput.classList.add('is-invalid');
        loginEmailMessageDiv.textContent = "Please enter a valid email.";
        loginEmailMessageDiv.style.display = 'block';
        loginIsValid = false;
    } else {
        loginEmailInput.classList.remove('is-invalid');
        loginEmailMessageDiv.style.display = 'none'; // Hide error message
    }

    // Validate password
    if (!loginPasswordInput.value.trim()) {
        loginPasswordInput.classList.add('is-invalid');
        loginPasswordMessageDiv.textContent = "Password is required.";
        loginPasswordMessageDiv.style.display = 'block';
        loginIsValid = false;
    } else {
        loginPasswordInput.classList.remove('is-invalid');
        loginPasswordMessageDiv.style.display = 'none';
    }

    // If either field is invalid, prevent form submission
    if (!loginIsValid) {
        event.preventDefault();
    } else {
        alert("Login Successful!");
    }
});

// --------------------------------------- Registration form validation ----------------------------------------

// Initial validation on form submit
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("r_email");
    const passwordInput = document.getElementById("r_password").value;
    const confirmPasswordInput = document.getElementById("r_cpassword").value;
    const messageDiv = document.getElementById("message");
    const emailMessageDiv = document.getElementById("message_email");
    const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");

    // Validate email
    if (!validateEmail(emailInput, emailMessageDiv)) return; // Exit if email is invalid

    // Validate passwords
    if (!passwordInput) {
        messageDiv.innerText = "Password is required.";
    } else if (!confirmPasswordInput) {
        messageDiv.innerText = "Please confirm your password.";
    } else if (passwordInput !== confirmPasswordInput) {
        confirmPasswordFeedback.textContent = "Passwords do not match.";
        confirmPasswordFeedback.style.color = 'red';
    } else {
        confirmPasswordFeedback.textContent = "Passwords match.";
        confirmPasswordFeedback.style.color = 'green';
    }
    
    // Show messages
    messageDiv.style.display = passwordInput && confirmPasswordInput ? "none" : "block";
    confirmPasswordFeedback.style.display = confirmPasswordInput ? "block" : "none";

});

// Real-time password matching feedback
const passwordInputElement = document.getElementById("r_password");
const confirmPasswordInputElement = document.getElementById("r_cpassword");

[passwordInputElement, confirmPasswordInputElement].forEach(input => 
    input.addEventListener("input", updatePasswordMatchFeedback)
);

function updatePasswordMatchFeedback() {
    const passwordValue = passwordInputElement.value;
    const confirmPasswordValue = confirmPasswordInputElement.value;
    const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");

    confirmPasswordFeedback.textContent = passwordValue === confirmPasswordValue
        ? "Passwords match." 
        : "Passwords do not match.";
    confirmPasswordFeedback.style.color = passwordValue === confirmPasswordValue ? 'green' : 'red';
    confirmPasswordFeedback.style.display = "block"; // Show feedback message
}

// --------------------------- Forgot password email validation -----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const emailInputs = [
        { input: document.getElementById("f_email"), feedback: document.getElementById("emailFeedback") },
        { input: document.getElementById("r_email"), feedback: document.getElementById("message_email") },
        { input: document.getElementById("email"), feedback: document.getElementById("login_message_email") }
    ];
    
    // Real-time email validation for all email inputs
    emailInputs.forEach(({ input, feedback }) => {
        input.addEventListener("input", () => {
            const isValid = validateEmail(input, feedback);
            if (input.id === "f_email") {
                document.getElementById("resetLinkBtn").disabled = !isValid; // Enable/disable button
            }
        });
    });

    // Handle reset button click event
    document.getElementById("resetLinkBtn").addEventListener("click", () => {
        const emailInput = document.getElementById("f_email");
        if (!document.getElementById("resetLinkBtn").disabled) {
            document.getElementById("successMessage").style.display = "block"; // Show success message
            emailInput.value = ""; // Clear email input
            emailInput.classList.remove('is-valid'); // Remove valid class
        }
    });
});

// Active form selection
function toggleForms(form) {
    const isLogin = form === 'login';
    const toggleClass = (id, condition) => document.getElementById(id).classList.toggle('d-none', condition);

    toggleClass("login-form", !isLogin);
    toggleClass("register-form", isLogin);

    const toggleButtonClass = (id, isPrimary) => {
        document.getElementById(id).classList.toggle('btn-primary', isPrimary);
        document.getElementById(id).classList.toggle('btn-light', !isPrimary);
    };

    toggleButtonClass("login-btn", isLogin);
    toggleButtonClass("register-btn", !isLogin);
}


// --------------------------- validation for change password -----------------------------------------------------------

// Toggle password visibility
function togglePasswordVisibility(fieldId) {
    const inputField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(`eye-${fieldId}`);
    const isPasswordVisible = inputField.type === "password";
    inputField.type = isPasswordVisible ? "text" : "password";
    eyeIcon.classList.toggle('fa-eye', isPasswordVisible);
    eyeIcon.classList.toggle('fa-eye-slash', !isPasswordVisible);
}

// Validate password matching and strength on form submission
document.getElementById('updatePasswordButton').addEventListener('click', () => {
    const currentPassword = document.getElementById('currentUserPassword').value.trim();
    const newPassword = document.getElementById('newUserPassword').value.trim();
    const confirmPassword = document.getElementById('confirmUserPassword').value.trim();
    const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedbackMessage');

    // Clear previous messages
    confirmPasswordFeedback.textContent = '';

    // Validate all fields
    if (!currentPassword || !newPassword || !confirmPassword) {
        confirmPasswordFeedback.textContent = "All fields are required.";
    } else if (newPassword !== confirmPassword) {
        confirmPasswordFeedback.textContent = "Passwords do not match.";
    } else if (currentPassword === newPassword) {
        confirmPasswordFeedback.textContent = "New password must not be the same as current password!";
    } else {
        confirmPasswordFeedback.textContent = "Password updated successfully!";
        confirmPasswordFeedback.style.color = 'green';
        return; // Exit after success
    }
    confirmPasswordFeedback.style.color = 'red'; // Set color to red for errors
});

// Real-time validation for current password field
document.getElementById('currentUserPassword').addEventListener('input', () => {
    document.getElementById('confirmPasswordFeedbackMessage').textContent = ''; // Clear feedback message
});

// ---------------------------------------------------- OTP Verification Script ---------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const otpInputs = document.querySelectorAll('.otp-input');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const timerElement = document.getElementById('timer');
    const resendBtn = document.getElementById('resendBtn');
    let timeLeft = 30;

    // Auto-tab functionality
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus(); // Move to next box
            } else if (this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus(); // Move back to previous box
            }
        });
    });

    // OTP validation on Verify button click
    document.getElementById('verifyBtn').addEventListener('click', function () {
        let otp = '';
        otpInputs.forEach(input => otp += input.value);
        
        if (otp.length === 6 && /^\d+$/.test(otp)) {
            feedbackMessage.textContent = 'OTP verified successfully!';
            feedbackMessage.classList.remove('text-danger');
            feedbackMessage.classList.add('text-success');
        } else {
            feedbackMessage.textContent = 'Invalid OTP. Please enter a valid 6-digit OTP.';
            feedbackMessage.classList.remove('text-success');
            feedbackMessage.classList.add('text-danger');
        }
    });

    // Resend OTP logic
    resendBtn.addEventListener('click', function () {
        resetTimer();
        feedbackMessage.textContent = '';
        otpInputs.forEach(input => input.value = ''); // Clear OTP fields
        otpInputs[0].focus(); // Focus back on the first input
    });

    // Timer countdown
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `OTP expires in ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = 'OTP expired.';
            resendBtn.disabled = false; // Enable resend OTP button
            otpInputs.forEach(input => input.disabled = true); // Disable OTP fields
        }
    }, 1000);

    // Reset timer and fields on resend
    function resetTimer() {
        timeLeft = 30;
        timerElement.textContent = `OTP expires in ${timeLeft}s`;
        otpInputs.forEach(input => {
            input.disabled = false; // Enable OTP inputs
            input.value = ''; // Clear the values
        });
        resendBtn.disabled = true; // Disable Resend OTP button
        otpInputs[0].focus(); // Set focus back to the first input
        feedbackMessage.textContent = ''; // Clear feedback message
    }
});