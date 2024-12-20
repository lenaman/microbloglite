"use strict";

function loadProfile() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((userNameInfo) => {
      console.log(userNameInfo);
      document.getElementById("profile-title").innerText = userNameInfo.fullName;
      document.getElementById("profile-email").innerText = userNameInfo.username;
    });
}

loadProfile();

function buildCardForUser(info, currentUser) {
  const row = document.querySelector("#userPostRow");

  let col = document.createElement("div");
  col.className = "col-md-12 d-flex justify-content-center mb-4";

  let card = document.createElement("div");
  card.className = "card";
  card.style = "width: 100%; margin-top: 20px; background-color: grey; color: black";
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

function loadPostsForUser() {
  const loginData = getLoginData();
  // POST request to server
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      const postsForUserName = posts.filter((post) => post.username === loginData.username); // This function allows you to filter by the username
      console.log("posts", postsForUserName);
      for (let post of postsForUserName) {
        buildCardForUser(post, loginData.username);
      }
    });
}

loadPostsForUser();
