"use strict"

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
        return;
    }

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
        logout();
    });

    // Post creation form
    document.getElementById("postForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const postContent = document.getElementById("postContent").value;

        fetch("https://example.com/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: postContent,
                author: "currentUser", // Replace with actual user data
                timestamp: new Date().toISOString(),
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert("Post created successfully!");
                    document.getElementById("postContent").value = ""; // Clear the form
                } else {
                    alert("Error creating post.");
                }
            })
            .catch(error => console.error("Error creating post:", error));
    });
});
