type Task = {
  title: string;
  completed: boolean;
  createAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const clear = document.getElementById("clear") as HTMLButtonElement;
const confirmBtn = document.getElementById("confirm") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancel") as HTMLButtonElement;
const confirmPage = document.querySelector<HTMLDivElement>(".confirmPage");
let tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    title: input.value,
    completed: false,
    createAt: new Date(),
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const description = document.createElement("p");
  const checkbox = document.createElement("input");
  const erase = document.createElement("button");
  checkbox.className = "checkbox";
  erase.innerHTML = "❌";
  erase.className = "erase";

  saveTasks();

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    drawLine();
  });

  erase.addEventListener("click", () => {
    item.remove();
    tasks = tasks.filter((item) => item !== task);
    saveTasks();
  });

  clear.addEventListener("click", () => {
    // if (item) {
    //let check = confirm("This will delete all your list");
    confirmPage?.setAttribute("style", "display:flex");
  });

  confirmBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  cancelBtn.addEventListener("click", () => {
    confirmPage?.setAttribute("style", "display:none");
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  function drawLine() {
    if (checkbox.checked) {
      description.style.textDecoration = "line-through";
    } else {
      description.style.textDecoration = "none";
    }
  }

  drawLine();

  label.append(checkbox, description, erase);
  description.append(task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
