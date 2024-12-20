/* Posts Page JavaScript */

"use strict";

function loadProfile() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log("LoginData", loginData);
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((userNameInfo) => {
      document.getElementById("profile-name").innerHTML = userNameInfo.fullName;
      document.getElementById("profile-username").innerHTML = userNameInfo.username;
      console.log(userNameInfo.fullName);
    });
}

loadProfile();

function loadPosts() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts);
      for (let post of posts) {
        buildCard(post, loginData.username);
      }
    });
}
loadPosts();

function buildCard(info, currentUser) {
  const row = document.querySelector("#postRow");

  let col = document.createElement("div");
  col.className = "col-md-12 d-flex justify-content align mb-4";

  let card = document.createElement("div");
  card.className = "card";
  card.style = "width: 100%; background-color: grey; color: black";
  col.append(card);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  let h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = `${info.username}`;
  cardBody.append(h5);

  let p = document.createElement("p");
  p.className = "card-text";
  p.innerText = `${info.text}`;
  cardBody.append(p);

  let timestamp = document.createElement("p");
  timestamp.className = "card-text";
  let timestampText = document.createElement("small");
  timestampText.className = "text-body-secondary";
  timestampText.innerText = `${formatDate(info.createdAt)}`;
  timestamp.append(timestampText);
  cardBody.append(timestamp);

  row.append(col);
}

function formatDate(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}-${day}-${year} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const newPostButton = document.querySelector("#new-post");

  newPostButton.addEventListener("click", () => {
    createNewPostModal();
  });

  function createNewPostModal() {
    // Check if modal already exists to prevent duplication
    const existingModal = document.querySelector("#newPostModal");
    if (existingModal) {
      const modalInstance = new bootstrap.Modal(existingModal);
      modalInstance.show();
      return;
    }

    // Modal Outer Structure
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "newPostModal";
    modal.tabIndex = "-1";
    modal.setAttribute("aria-labelledby", "newPostModalLabel");
    modal.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";
    modal.appendChild(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    // Modal Header
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalContent.appendChild(modalHeader);

    const modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title";
    modalTitle.id = "newPostModalLabel";
    modalTitle.textContent = "Create a New Post";
    modalHeader.appendChild(modalTitle);

    const closeButton = document.createElement("button");
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    modalHeader.appendChild(closeButton);

    // Modal Body with Textarea
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalContent.appendChild(modalBody);

    const textArea = document.createElement("textarea");
    textArea.id = "postContent";
    textArea.className = "form-control";
    textArea.rows = "5";
    textArea.placeholder = "Write your post here...";
    modalBody.appendChild(textArea);

    // Modal Footer with Post Button
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    const postButton = document.createElement("button");
    postButton.className = "btn btn-primary";
    postButton.textContent = "POST";
    modalFooter.appendChild(postButton);

    // Append modal to the body
    document.body.appendChild(modal);

    // Bootstrap Modal Instance
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    // Post Button Click Handler
    postButton.addEventListener("click", () => {
      const postContent = textArea.value;
      const loginData = getLoginData();

      // POST request to server
      fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLoginData().token}`, // Replace with token logic
        },
        body: JSON.stringify({
          text: postContent,
        }),
      })
        .then((response) => response.json())
        .then((newPost) => {
          console.log("Post created successfully:", newPost);
          buildCard(newPost, loginData.username);

          modalInstance.hide(); // Close the modal
          textArea.value = ""; // Clear the textarea
        })
        .catch((error) => console.error("Error creating post:", error));
    });
  }
});

// Make the button a like with no color
// Check if the button is liked (has color), if it is already liked, called the API with the DELETE method and remove the data-like-id
// Else, Call the like API with the POST method. In that API, it returns the like ID, add the attribute "data-like-id"
// with the addAttribute function (I think) and set the value of that attribute to the like ID
// If the like ID returns a success, then change the heart image from the empty heart to full heart.
