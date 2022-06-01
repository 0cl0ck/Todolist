//Définition des Sélecteurs
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todos__list");
//Ecoute
todoButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteItem);

//Fonctions
function addItem(e) {
  e.preventDefault();

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todos__div");
  //Création de la liste
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
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
  todoInput.value = "";
}

function deleteItem(e) {
  console.log(e.target);
}

// const deleteButton = document.createElement("button");
// deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
// deleteButton.classList.add("todos__button__delete");
