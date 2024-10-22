(function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
})();

// Phone number pattern validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function () {
    const phonePattern = /^\+?\d{1,4}?\s?\d{7,14}$/;
    if (!phonePattern.test(phoneInput.value)) {
        phoneInput.setCustomValidity('Invalid');
    } else {
        phoneInput.setCustomValidity('');
    }
});

// Image file validation and preview
const profilePictureInput = document.getElementById('profilePicture');
const profilePreview = document.getElementById('profilePreview');
const imageErrorMessage = document.getElementById('imageErrorMessage');

profilePictureInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        profilePictureInput.setCustomValidity('Invalid');
        imageErrorMessage.style.display = 'block';
        return;
    } else {
        profilePictureInput.setCustomValidity('');
        imageErrorMessage.style.display = 'none';
    }

    // Validate file format
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        profilePictureInput.setCustomValidity('Invalid');
        imageErrorMessage.style.display = 'block';
        return;
    } else {
        profilePictureInput.setCustomValidity('');
        imageErrorMessage.style.display = 'none';
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = function (e) {
        profilePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
});


// Select the toggle switch
const themeToggle = document.getElementById('themeToggle');

// Check if dark mode was previously enabled
if (localStorage.getItem('darkTheme') === 'enabled') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
    applyDarkThemeToElements(true);  // Apply dark theme to other elements
}

// Toggle the theme when the switch is clicked
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('darkTheme', 'enabled'); // Save preference in localStorage
        applyDarkThemeToElements(true);
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('darkTheme', 'disabled'); // Save preference in localStorage
        applyDarkThemeToElements(false);
    }
});

// Function to apply dark theme to form, buttons, and other elements
function applyDarkThemeToElements(isDark) {
    const navbar = document.querySelector('.navbar');
    const boxArea = document.querySelector('.box-area');
    const formControls = document.querySelectorAll('.form-control');
    const formLabels = document.querySelectorAll('.form-label');
    const buttons = document.querySelectorAll('.btn-custom-primary, .btn-custom-light');
    const profilePreview = document.getElementById('profilePreview');

    if (isDark) {
        navbar.classList.add('dark-theme');
        boxArea.classList.add('dark-theme');
        formControls.forEach(control => control.classList.add('dark-theme'));
        formLabels.forEach(label => label.classList.add('dark-theme'));
        buttons.forEach(btn => btn.classList.add('dark-theme'));
        profilePreview.classList.add('dark-theme');
    } else {
        navbar.classList.remove('dark-theme');
        boxArea.classList.remove('dark-theme');
        formControls.forEach(control => control.classList.remove('dark-theme'));
        formLabels.forEach(label => label.classList.remove('dark-theme'));
        buttons.forEach(btn => btn.classList.remove('dark-theme'));
        profilePreview.classList.remove('dark-theme');
    }
}
