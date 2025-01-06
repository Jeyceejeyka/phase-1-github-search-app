document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    // Listen for form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
  
      if (query) {
        searchUsers(query);
      }
    });
  
    // Search users by name
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users.");
          }
          return response.json();
        })
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Unable to fetch users. Please try again later.");
        });
    }
  
    // Display users on the page
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      reposList.innerHTML = ""; // Clear repos list
  
      users.forEach((user) => {
        const userItem = document.createElement("li");
  
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}" class="view-repos-btn">View Repos</button>
        `;
  
        // Add event listener to the "View Repos" button
        const viewReposBtn = userItem.querySelector(".view-repos-btn");
        viewReposBtn.addEventListener("click", () => {
          fetchRepos(user.login);
        });
  
        userList.appendChild(userItem);
      });
    }
  
    // Fetch repositories for a specific user
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch repositories.");
          }
          return response.json();
        })
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Unable to fetch repositories. Please try again later.");
        });
    }
  
    // Display repositories on the page
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous results
  
      repos.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  