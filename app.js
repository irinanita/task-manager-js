// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks events
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");

  // Add class
  li.className = "collection-item";

  // Create text node and append to li

  /* Note:
 1. .append vs .appendChild. Ther former does not have a return value while .appendChild returns the appended Node object, but allows only a single item. .append is more recent? .append() allows you to also append DOMString objects whereas Node.appendChild() only accepts Node objects.
 2. createTextNode() vs textContent: createTextNode() is a method and  it creates an element, then you must do something with it (for ex append it as a child);
 so it is useful if you want to have a new element and place it somewhere . textContent is a property you may get or set, with a unique statement and nothing else;
 so it is useful when you only want to change the content of an already existing element 
 */

  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement("a");

  // Add class
  link.className = "delete-item secondary-content";

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
  tasks=[];
  } else {
    // Local storage is able to store only strings so we need to parse it
    tasks=JSON.parse(localStorage.getItem("tasks"));
  }
   // Add new task
   tasks.push(task);
   // Stringify before storin in LS
   localStorage.setItem("tasks",JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear all Tasks
function clearTasks() {
  //taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
