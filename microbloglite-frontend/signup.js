"use strict"

function signup (signupData) {
    // POST /auth/login
    const options = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    };
    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(signupData => {
            if (signupData.message === "Invalid username or password") {
                console.error(signupData)
                alert("Signup failed: " + signupData.message);
                document.getElementById("signupButton").disabled = false;
                return null;
            }

            window.localStorage.setItem("login-data", JSON.stringify(signupData));
            window.location.assign("index.html");  // redirect

            // return signupData;
        })
    .catch(error => {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again.");
        document.getElementById("signupButton").disabled = false;
    });
}

const signupForm = document.querySelector('#signup')

signupForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const signupData = {
        username: signupForm.username.value,
        fullName: signupForm.fullname.value,
        password: signupForm.createPassword.value,
    };
        const confirmPassword = signupForm.confirmPassword.value;
    if (signupData.password !== confirmPassword) {
        alert("Passwords do not match!");
        return; // Exit without submitting the form
    };
    // Disables the button after the form has been submitted already:
    // signupForm.loginButton.disabled = true;
    const signupButton = document.getElementById("signupButton");
    signupButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    signup(signupData);
};

