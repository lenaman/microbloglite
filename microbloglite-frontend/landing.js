/* Landing Page JavaScript */

"use strict";


// document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#login");
    const signupForm = document.querySelector('#signup')
    
    loginForm.onsubmit = function (event) {
        // Prevent the form from refreshing the page,
        // as it will do by default when the Submit event is triggered:
        event.preventDefault();
    
        // We can use loginForm.username (for example) to access
        // the input element in the form which has the ID of "username".
        const loginData = {
            username: loginForm.username.value,
            password: loginForm.password.value,
        }
    
        // Disables the button after the form has been submitted already:
        loginForm.loginButton.disabled = true;
    
        // Time to actually process the login using the function from auth.js!
        login(loginData); 
    };
    signupForm.onsubmit = function (event) {
        // Prevent the form from refreshing the page,
        // as it will do by default when the Submit event is triggered:
        event.preventDefault();
    
        // We can use loginForm.username (for example) to access
        // the input element in the form which has the ID of "username".
        const signupData = {
            username: signupForm.username.value,
            fullname: signupForm.fullname.value,
            password: signupForm.create-password.value,
        }
    
        // Disables the button after the form has been submitted already:
        signupForm.loginButton.disabled = true;
    
        // Time to actually process the login using the function from auth.js!
        signup(signupData);
    };

