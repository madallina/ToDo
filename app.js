document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector("form");
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterTodo = document.querySelector(".filter-todo");

  // Check for existing todos in local storage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Event listeners
  todoForm.addEventListener("submit", addTodo);
  todoList.addEventListener("click", deleteOrCheckTodo);
  filterTodo.addEventListener("change", filterTodoList);

  // Functions
  function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      const newTodo = {
        text: todoText,
        completed: false,
      };
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      todoInput.value = "";
    }
  }

  function deleteOrCheckTodo(event) {
    const item = event.target;
    const todo = item.parentElement.parentElement;

    const index = Array.from(todoList.children).indexOf(todo);
        if (item.classList.contains("delete-button")) {
            todos.splice(index, 1);
        }
            saveTodos();
            renderTodos();

    if (item.classList.contains("check-button")) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      }
  }

  function filterTodoList() {
    renderTodos();
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    const selectedFilter = filterTodo.value;
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      if (selectedFilter === "completed" && !todo.completed) {
        return;
      }
      if (selectedFilter === "uncompleted" && todo.completed) {
        return;
      }

      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      const completedClass = todo.completed ? "completed" : "";
      todoItem.innerHTML = `
              <span class="todo-text ${completedClass}">${todo.text}</span>
              <div>
              <button class="check-button"><i class="fas fa-check"></i></button>
              <button class="delete-button"><i class="fas fa-trash"></i></button>
              </div>
          `;
      todoList.appendChild(todoItem);
    });
  }

  // Initial rendering
  renderTodos();
});
