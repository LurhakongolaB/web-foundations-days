// 1. Select the HTML elements
const loadUsersButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

// 2. API URL and stored users
const usersUrl = "https://jsonplaceholder.typicode.com/users";

let users = [];
let usersLoaded = false;


// 3. Display a list of users on the page
function renderUsers(list) {
    // Remove the previous list before drawing the new one
    usersList.replaceChildren();

    // Handle an empty filtered result
    if (list.length === 0) {
        if (usersLoaded && filterInput.value.trim() !== "") {
            const message = document.createElement("li");
            message.textContent = "No users match your filter.";
            usersList.appendChild(message);
        }

        return;
    }

    // Create a card for each user
    list.forEach(function (user) {
        const userItem = document.createElement("li");
        userItem.classList.add("user-card");

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        // Add the details to the user's card
        userItem.appendChild(name);
        userItem.appendChild(email);
        userItem.appendChild(city);
        userItem.appendChild(company);

        // Add the card to the page
        usersList.appendChild(userItem);
    });
}


// 4. Load users from the API
async function loadUsers() {
    // Disable the button while the request is running
    loadUsersButton.disabled = true;
    statusMessage.textContent = "Loading users...";

    try {
        const response = await fetch(usersUrl);

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Convert the response into JavaScript data
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("The API did not return a list of users.");
        }

        // Keep the users in an array for filtering
        users = data;
        usersLoaded = true;

        // Display users that match the current filter
        const filteredUsers = getFilteredUsers();
        renderUsers(filteredUsers);

        // Report the loading result
        if (filterInput.value.trim() !== "" && filteredUsers.length === 0) {
            statusMessage.textContent = "No users match your filter.";
        } else {
            statusMessage.textContent =
                `Successfully loaded ${users.length} users.`;
        }

    } catch (error) {
        // Handle network errors and unsuccessful HTTP responses
        users = [];
        usersLoaded = false;
        usersList.replaceChildren();

        statusMessage.textContent =
            `Error loading users: ${error.message}. Please try again.`;

    } finally {
        // Always re-enable the button, even if an error occurs
        loadUsersButton.disabled = false;
    }
}


// 5. Return users matching the current search
function getFilteredUsers() {
    const searchText = filterInput.value.trim().toLowerCase();

    return users.filter(function (user) {
        return user.name.toLowerCase().includes(searchText);
    });
}


// 6. Load users when the button is clicked
loadUsersButton.addEventListener("click", loadUsers);


// 7. Filter the stored users without making another API request
filterInput.addEventListener("input", function () {
    // Do not filter until users have loaded successfully
    if (!usersLoaded) {
        return;
    }

    const filteredUsers = getFilteredUsers();

    renderUsers(filteredUsers);

    if (filteredUsers.length === 0) {
        statusMessage.textContent = "No users match your filter.";
    } else if (filterInput.value.trim() === "") {
        statusMessage.textContent =
            `Successfully loaded ${users.length} users.`;
    } else {
        statusMessage.textContent =
            `Showing ${filteredUsers.length} of ${users.length} users.`;
    }
});
