//Définition des Sélecteurs
const todoInput = document.getElementById("todo__input");
const todoFilter = document.getElementById("todos__filter");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todos__list");

//Ecoute
todoButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheckItem);
todoFilter.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", retrieveItemsFromLocalStorage);

//Fonctions
function addItem(e) {
  e.preventDefault();
  //Création d'une div encadrant les todos
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todos__div");
  //Création de la liste
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  todoItem.classList.add("todos__items");
  todoDiv.appendChild(todoItem);
  //Ajout de l'item au Local Storage
  saveTodosItems(todoInput.value);
  //Ajout du bouton checker un item
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("todos__button", "todos__button__check");
  todoDiv.appendChild(checkButton);
  //Ajout du bouton Supprimer
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-ban"></i>';
  deleteButton.classList.add("todos__button", "todos__button__delete");
  todoDiv.appendChild(deleteButton);
  //Ajout de l'item à la liste
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheckItem(e) {
  const item = e.target;
  if (item.classList[1] === "todos__button__delete") {
    item.parentElement.classList.add("slide-out");
    removeItemsFromLocalStorage(item.parentElement);
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }
  if (item.classList[1] === "todos__button__check") {
    item.parentElement.classList.toggle("todos__strike-off");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("todos__strike-off")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "remaining":
        if (!todo.classList.contains("todos__strike-off")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodosItems(todo) {
  let todos;
  //On vérifie si il y a des items existants dans le Local Storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function retrieveItemsFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Création d'une div encadrant les todos
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos__div");
    //Création de la liste
    const todoItem = document.createElement("li");
    todoItem.innerText = todo;
    todoItem.classList.add("todos__items");
    todoDiv.appendChild(todoItem);
    //Ajout du bouton checker un item
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("todos__button", "todos__button__check");
    todoDiv.appendChild(checkButton);
    //Ajout du bouton Supprimer
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-ban"></i>';
    deleteButton.classList.add("todos__button", "todos__button__delete");
    todoDiv.appendChild(deleteButton);
    //Ajout de l'item à la liste
    todoList.appendChild(todoDiv);
  });
}

function removeItemsFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todosIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todosIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
