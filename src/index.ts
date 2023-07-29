import { v4 as uuidV4 } from "uuid"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[]= loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value =="" || input?.value ==null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  

  tasks.push(newTask)

  addListItem(newTask)

  input.value=""
})

function addListItem(task: Task) {

  const item  = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed=checkbox.checked
    saveTasks()
    console.log(tasks)
  })
  checkbox.type = "checkbox"
  checkbox.checked= task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

}

function saveTasks() {
 localStorage.setItem("TASKS", JSON.stringify(tasks)) 
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}

function addActionItem() {
  // creating a new action item
  const newActionItem = document.createElement("div");
  newActionItem.className = "action_item";

  // creating a text input element
  const actionItemText = document.createElement("input");
  actionItemText.type = "text";
  actionItemText.placeholder = "Enter your text here";

  actionItemText.addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
      event.preventDefault();
    }

    const AI_text = actionItemText.value.trim();
    if(AI_text != "") {
      const newParagraph = document.createElement("p");
      newParagraph.textContent = AI_text;

      newActionItem.replaceChild(newParagraph, actionItemText);
    }
  });
  const removeActionItemBtn = document.createElement("button");
  removeActionItemBtn.textContent = "remove";
  removeActionItemBtn.addEventListener("click", () => {
    newActionItem.remove();
  });


  // text box to new action item box and remove button
  newActionItem.appendChild(actionItemText);
  newActionItem.appendChild(removeActionItemBtn);

  // getting parent div
  const actionItemsDiv = document.querySelector(".action_items");
  
  // appending new div to parent div
  actionItemsDiv?.appendChild(newActionItem);

}

const addActionItemBtn = document.getElementById("add_action_item_btn");
addActionItemBtn?.addEventListener("click", addActionItem)