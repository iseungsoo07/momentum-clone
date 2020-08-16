const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
   const btn = event.target;
   const li = btn.parentNode;
   toDoList.removeChild(li);
   const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id != parseInt(li.id);
   });
   toDos = cleanToDos;
   saveToDos();
}

function saveToDos() {
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
   const li = document.createElement("li");
   const deleteButton = document.createElement("button");
   const span = document.createElement("span");
   const newId = toDos.length + 1;

   deleteButton.innerText = "✅";
   deleteButton.style.cursor = "pointer";
   deleteButton.style.fontSize = "20px";
   deleteButton.addEventListener("click", deleteToDo);
   deleteButton.style.marginLeft = "20px";
   deleteButton.style.backgroundColor = "transparent";
   deleteButton.style.border = "none";
   span.innerText = text;

   li.appendChild(span);
   li.appendChild(deleteButton);
   li.id = newId;
   toDoList.appendChild(li);

   const toDoObj = {
      text: text,
      id: newId,
   };
   toDos.push(toDoObj);
   saveToDos();
}

function submitHandler(event) {
   event.preventDefault();
   const currentValue = toDoInput.value;
   paintToDo(currentValue);
   toDoInput.value = "";
}

function loadToDos() {
   const loadedToDos = localStorage.getItem(TODOS_LS);
   if (loadedToDos != null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
         paintToDo(toDo.text);
      });
   }
}

function toDoListStyle() {
   toDoList.style.color = "white";
   toDoList.style.fontSize = "35px";
}

function init() {
   toDoListStyle();
   loadToDos();
   toDoForm.addEventListener("submit", submitHandler);
}

init();
