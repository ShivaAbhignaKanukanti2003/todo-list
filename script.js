const input = document.querySelector("input");
const addButton = document.querySelector(".input-box button");
const taskList = document.querySelector(".task-list");
const filterButtons = document.querySelectorAll(".filters button");
const darkToggle = document.querySelector(".dark-toggle");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks
    .filter(task => filter === "all" || task.completed)
    .forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = task.text;

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.onclick = () => toggleComplete(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.onclick = () => deleteTask(index);

      actions.append(completeBtn, deleteBtn);
      li.append(span, actions);
      taskList.appendChild(li);
    });
}

// Add task
function addTask() {
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

// Enter key support
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

// Button click
addButton.addEventListener("click", addTask);

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filters
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    if (filter) renderTasks(filter);
  });
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial render
renderTasks();
