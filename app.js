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
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks events
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  // Check local storage for existing tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Local storage is able to store only strings so we need to parse it
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Loop through the tasks we've found
  // Create elements in DOM

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";

    li.appendChild(document.createTextNode(task));

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
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please write something");
    return
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
function storeTaskInLocalStorage(task) {
  let tasks;
  // Check local storage for existing tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Local storage is able to store only strings so we need to parse it
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Add new task
  tasks.push(task);
  // Stringify before storin in LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check local storage for existing tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Local storage is able to store only strings so we need to parse it
    tasks = JSON.parse(localStorage.getItem("tasks"));
    
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      // Delete the task based on its index in the array
      tasks.splice(index);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all Tasks
function clearTasks() {
  //taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Remove everything from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
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
