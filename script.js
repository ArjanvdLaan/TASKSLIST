//Imports
import { getTasks } from "./api-client.js";
import { postTask } from "./api-client.js";
import { deleteTaskServer } from "./api-client.js";

//Variables
export const input = document.getElementById("task");
const taskList = document.getElementById("container");
const button = document.getElementById("addTask");

//Add tasks to DOM and server
const addNewTask = function (e) {        
        e.preventDefault();
        awaitPostTask();
        input.value = "";   
}

//Post tasks in DOM
async function awaitPostTask() {
    const post =  await postTask();    
    const taskList = document.getElementById("container");
    const taskDiv = document.createElement("div");
    const newLi = document.createElement("li");
    const deleteButton = document.createElement('button');
    taskDiv.classList.add('todoDiv');
    deleteButton.classList.add("trash-button");
    taskList.append(taskDiv);
    taskDiv.append(newLi);
    taskDiv.append(deleteButton);
    newLi.innerHTML = post.description;
    newLi.setAttribute("class", post._id)
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
}

//Show tasks in DOM
async function awaitGetTasks() {
    const showPosts =  await getTasks();
    showPosts.forEach((post) => {   
        const taskList = document.getElementById("container");
        const taskDiv = document.createElement("div");
        const newLi = document.createElement("li");
        const deleteButton = document.createElement('button');
        taskDiv.classList.add('todoDiv');
        deleteButton.classList.add("trash-button");
        taskList.append(taskDiv);
        taskDiv.append(newLi);
        taskDiv.append(deleteButton);
        newLi.innerHTML= post.description;
        newLi.setAttribute("class", post._id)
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        console.log(post)
        }) 
        
}
awaitGetTasks();

//Delete Tasks with class in DOM and ID in server
async function deleteTask (e) {
    const item = e.target;
    if (item.classList[0] === "fa-solid") {
        const task = item.parentElement.parentElement;
        const getID = task.firstChild.classList.value;
        deleteTaskServer(getID);
        task.remove();
    }
}

//Event listeners
button.addEventListener('click', addNewTask);
taskList.addEventListener('click', deleteTask);
