// Create task arrays
let tasks = [];
let doneTasks = [];
const jobs = [];

// Function to Display tasks
function displayTasks() {
  // Pending tasks
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";
  if (tasks.length !== 0) {
    for (let i = 0; i < tasks.length; i++) {
      const taskItem = document.createElement("li");

      const taskItemCheckbox = document.createElement("input");
      taskItemCheckbox.type = "checkbox";
      taskItemCheckbox.classList.add("done-checkbox");
      taskItemCheckbox.addEventListener("change", () => {
        taskItem.classList.add("fade");
        setTimeout(() => {
          markDone(i);
        }, 600);
      });

      const taskText = document.createElement("span");
      taskText.textContent = tasks[i];

      const taskItemRemoveButton = document.createElement("button");
      taskItemRemoveButton.classList.add("remove-btn");
      taskItemRemoveButton.addEventListener("click", () => {
        removeTask(i);
      });
      taskItemRemoveButton.textContent = "x";

      taskItem.appendChild(taskItemCheckbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(taskItemRemoveButton);
      listElement.appendChild(taskItem);
    }
  }

  // Show or hide no tasks message
  document.getElementById("noTasks").style.display =
    tasks.length === 0 ? "block" : "none";

  // Done tasks
  const doneListElement = document.getElementById("doneList");
  doneListElement.innerHTML = "";
  if (doneTasks.length !== 0) {
    for (let i = 0; i < doneTasks.length; i++) {
      const doneItem = document.createElement("li");

      const doneText = document.createElement("span");
      doneText.textContent = doneTasks[i];

      const returnButton = document.createElement("button");
      returnButton.classList.add("return-btn");
      returnButton.textContent = "↩";
      returnButton.addEventListener("click", () => {
        doneItem.classList.add("fade");
        setTimeout(() => {
          returnToPending(i);
        }, 600);
      });

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", () => {
        removeDone(i);
      });

      doneItem.appendChild(doneText);
      doneItem.appendChild(returnButton);
      doneItem.appendChild(removeButton);
      doneListElement.appendChild(doneItem);
    }
  }
}

document.querySelector("form").addEventListener("submit", (ev) => {
  // console.log(ev);
  ev.preventDefault();
  addTask();
});

// Function to Add a task
function addTask() {
  let taskInput = document.getElementById("task");
  let text = taskInput.value;
  if (text === "") {
    alert("cannot sumit an empty taSK");
    return;
  }
  tasks.push(text);

  jobs.push({
    name: text,
    completed: Math.round(Math.random()) > 0,
    createAt: new Date(),
    completeAt: null,
  });

  console.log(
    jobs,
    jobs.filter((job) => job.completed === true), // all the completed tasks
    jobs.filter((job) => job.completed === false), // and the rest
  );

  taskInput.value = "";
  saveTasks();
  displayTasks();
}

// Function to Remove a pending task
function removeTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

// Function to Mark task as done
function markDone(i) {
  let task = tasks.splice(i, 1)[0];
  doneTasks.push(task);
  saveTasks();
  displayTasks();
}

// Function to Remove a done task
function removeDone(i) {
  doneTasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

// Function to Return a done task to pending
function returnToPending(i) {
  const task = doneTasks.splice(i, 1)[0];
  tasks.push(task);
  saveTasks();
  displayTasks();
}

// Function to Clear all tasks
function clearAll() {
  tasks = [];
  doneTasks = [];
  saveTasks();
  displayTasks();
}

// Function to Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

// Function to Load tasks
function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
  let doneSaved = localStorage.getItem("doneTasks");
  if (doneSaved !== null) {
    doneTasks = JSON.parse(doneSaved);
  }
}

// Load and display tasks when page loads
loadTasks();
displayTasks();
