// Create task arrays
let tasks = [];
let doneTasks = [];

// Function to Display tasks
function displayTasks() {
  // Pending tasks
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += "<li>" + tasks[i] +
    " <button class='done-btn' onclick='markDone(" + i + ")'>Done</button>" +
    " <button class='remove-btn' onclick='removeTask(" + i + ")'>x</button></li>";
  }
  document.getElementById("list").innerHTML = html;

  // Show or hide no tasks message
  document.getElementById("noTasks").style.display = tasks.length === 0 ? "block" : "none";

  // Done tasks
  let doneHtml = "";
  for (let i = 0; i < doneTasks.length; i++) {
    doneHtml += "<li>" + doneTasks[i] +
    " <button class='remove-btn' onclick='removeDone(" + i + ")'>x</button></li>";
  }
  document.getElementById("doneList").innerHTML = doneHtml;
}

// Function to Add a task
function addTask() {
  let taskInput = document.getElementById("task");
  let text = taskInput.value;
  if (text === "") {
    return;
  }
  tasks.push(text);
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