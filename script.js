const API_URL = "https://jsonplaceholder.typicode.com/todos";

const todoContainer = document.getElementById("todo-container");


// Fetch todos from API
async function fetchTodos() {
    todoContainer.innerHTML = '<p class="loading">Loading todos...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const todos = await response.json();

        renderTodos(todos);

    } catch (error) {
        todoContainer.innerHTML =
            `<p class="loading">Error: ${error.message}</p>`;
    }
}


// Render all todos
function renderTodos(todos) {
    todoContainer.innerHTML = "";

    todos.forEach(todo => {
        const card = createTodoCard(todo);
        todoContainer.appendChild(card);
    });
}


// Create a todo card
function createTodoCard(todo) {
    const card = document.createElement("div");

    card.className = "todo-card";
    card.dataset.id = todo.id;

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const status = document.createElement("p");
    status.className = "status";
    status.textContent = todo.completed
        ? "Status: Completed"
        : "Status: Pending";


    // Delete button
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id, card);
    });


    // Toggle status button
    const toggleButton = document.createElement("button");

    toggleButton.className = "toggle-btn";
    toggleButton.textContent = "Toggle Status";

    toggleButton.addEventListener("click", () => {
        toggleTodoStatus(todo, status);
    });


    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(toggleButton);
    card.appendChild(deleteButton);

    return card;
}


// Delete todo
async function deleteTodo(todoId, card) {
    try {
        const response = await fetch(`${API_URL}/${todoId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete request failed");
        }

        card.remove();

    } catch (error) {
        alert("Failed to delete todo.");
        console.error(error);
    }
}


// Toggle todo status
async function toggleTodoStatus(todo, statusElement) {

    const newStatus = !todo.completed;

    try {

        const response = await fetch(`${API_URL}/${todo.id}`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                completed: newStatus
            })
        });


        if (!response.ok) {
            throw new Error("Status update failed");
        }


        // Update local state
        todo.completed = newStatus;


        // Update UI
        statusElement.textContent = todo.completed
            ? "Status: Completed"
            : "Status: Pending";

    } catch (error) {

        alert("Failed to update todo status.");
        console.error(error);

    }
}


// Start application
fetchTodos();