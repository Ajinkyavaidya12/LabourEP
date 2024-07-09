document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullname = form.fullname.value.trim();
        const phone = form.phone.value.trim();
        const address = form.address.value.trim();
        const password = form.password.value.trim();

        // Regular expressions for validation
        const fullnameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        const phoneRegex = /^\d{10}$/; // Assuming phone number is 10 digits long
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least one letter, one digit, one special character, and minimum 8 characters

        let isValid = true;

        // Full Name validation
        if (!fullnameRegex.test(fullname)) {
            isValid = false;
            alert("Please enter a valid full name containing only letters and spaces.");
            return;
        }

        // Phone validation
        if (!phoneRegex.test(phone)) {
            isValid = false;
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Address validation
        if (address.length === 0) {
            isValid = false;
            alert("Please enter your address.");
            return;
        }

        // Password validation
        if (!passwordRegex.test(password)) {
            isValid = false;
            alert("Password must contain at least one letter, one digit, one special symbol, and be at least 8 characters long.");
            return;
        }

        // If all validations pass, submit the form via AJAX
        if (isValid) {
            fetch(form.action, {
                method: form.method,
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    alert("Registration successful!");
                    // Optionally, redirect to another page
                    window.location.href = "home.html";
                } else {
                    alert("Registration failed. Please try again later.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while processing your request.");
            });
        }
    });
});
