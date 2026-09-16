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


// Render todo cards
function renderTodos(todos) {
    todoContainer.innerHTML = "";

    todos.forEach(todo => {
        const card = createTodoCard(todo);
        todoContainer.appendChild(card);
    });
}


// Create a single todo card
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

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id, card);
    });

    card.appendChild(title);
    card.appendChild(status);
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

        // Remove card immediately after successful response
        card.remove();

    } catch (error) {
        alert("Failed to delete todo.");
        console.error(error);
    }
}


// Start application
fetchTodos();