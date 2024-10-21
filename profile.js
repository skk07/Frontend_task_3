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

 
