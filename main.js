let toDoInput = document.querySelector(".todo-input");
let toDoBtn = document.querySelector(".todo-btn");
let toDoList = document.querySelector(".todo-list");

let todos = [];
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}
addToPage(todos);

toDoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (toDoInput.value !== "") {
    const todo = {
      id: Date.now(),
      title: toDoInput.value,
      completed: false,
    };
    todos.push(todo);
    savelocal(todos);
    addToPage(todos);
    // CLearing the input;
    toDoInput.value = "";
  }
});

toDoList.addEventListener("click", function (e) {
  if (e.target.classList[0] === "delete-btn") {
    // animation
    e.target.parentElement.classList.add("fall");
    //removing local todos
    removeLocalTodos(e.target.parentElement.getAttribute("todo-id"));

    e.target.parentElement.addEventListener("transitionend", () => {
      e.target.parentElement.remove();
    });
  }
  if (e.target.classList[0] === "check-btn") {
    checkStatus(e.target.parentElement.getAttribute("todo-id"));
    e.target.parentElement.classList.toggle("completed");
  }
});

function addToPage(todos) {
  toDoList.innerHTML = "";
  todos.forEach((todo) => {
    // toDo DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList = "todo";
    if (todo.completed) {
      todoDiv.classList = "todo completed";
    }
    todoDiv.setAttribute("todo-id", todo.id);
    // Create LI
    let todoI = document.createElement("li");
    todoI.innerText = todo.title;
    todoI.classList = "todo-item";
    todoDiv.appendChild(todoI);
    // check button
    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fa-solid fa-check"></i>';
    checked.classList = "check-btn";
    todoDiv.appendChild(checked);
    // delete button
    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fa-sharp fa-solid fa-trash"" ></i>';
    deleted.classList = "delete-btn";
    todoDiv.appendChild(deleted);
    // Append to list
    toDoList.appendChild(todoDiv);
  });
}
// Saving to local storage:
function savelocal(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todoId) {
  todos = todos.filter((todo) => todo.id != todoId);
  savelocal(todos);
}

function checkStatus(todoId) {
  todos.forEach((todo) => {
    if (todo.id == todoId) {
      console.log(todo.id, todoId);
      todo.completed == false
        ? (todo.completed = true)
        : (todo.completed = false);
    }
    savelocal(todos);
  });
}
