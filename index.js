class ToDo {
    constructor (title, desc, dueDate, status="pending"){
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.description = desc;
        this.dateCreated = new Date();
        this.status = status;
    }
    getStatus (){
        let today = new Date();
        if (today.getTime() >= this.dueDate.getTime()){
            return "timed Out";
        }
        else {
            return "pending";
        }
    }
}

let allToDo = [
    new ToDo("Walk the dog", "Walk the dog through the park for 30 mins and return home", "October 13, 2014 11:13:00")
]

let index = 0;

allToDo.forEach(todo => {
    let container = document.createElement("div");
    container.classList.add("todo");
    container.value = index;
    container.innerHTML = `
    <div class="info-box">
    <p>${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()}/ ${todo.dateCreated.getFullYear()}</p>
    <button class="btn info">ooo</button>
    </div>
    <div class="btn-group-vertical" id="more" value="${index}">
        <button class="btn" id="mark-complete">Mark as complete</button>
        <button class="btn" id="delete">Delete</button>
    </div>
    <p>${todo.description}</p>
    <hr>
    <h5>${todo.title}</h5>
    `;
    document.getElementById("todo-container").append(container);
    if (todo.getStatus == "timed Out"){
        document.getElementById("todo-completed").append(container);
    }
})

document.getElementById("todo-container").addEventListener("click", function(event){
    if(event.target.classList.contains("todo")){
        let zoomIn = allToDo[parseInt(event.target.value)];
        console.log(event.target.value);
        document.getElementById("details").innerHTML = 
        `
        <h4>${zoomIn.title}<button class="btn info">ooo</button></h4>
        <p>${zoomIn.description}</p><hr>
        <div id="info">
            <p>Date/time created: ${zoomIn.dateCreated.getDate()}/ ${zoomIn.dateCreated.getMonth()}/ ${zoomIn.dateCreated.getFullYear()} (${zoomIn.dateCreated.getHours()}:${zoomIn.dateCreated.getMinutes()})</p>
            <p>Due date/time: ${zoomIn.dueDate.getDate()}/ ${zoomIn.dueDate.getMonth()}/ ${zoomIn.dueDate.getFullYear()} (${zoomIn.dueDate.getHours()}:${zoomIn.dueDate.getMinutes()})</p>
            <p>Time left: <span id="time-left">1day | 2hrs | 9mins | 2secs</span>
            </p>
            <p>Status: ${zoomIn.getStatus()}</p>
        </div>
        `;
        document.getElementById("details-container").style.display = "block";
        document.getElementById("todo-container-all").style.display = "none";
        document.getElementById("add").style.display = "none";
    }
})

function toogle(bool){
    if (bool){return false}
    else {return true}
}

document.getElementById("completed").addEventListener("click", function(){
    if (window.screen.width <= 750){
        document.getElementById("menu").style.display = "none";
        menuDisplay = toogle(menuDisplay);
    }
})
document.getElementById("overview").addEventListener("click", function(){
    if (window.screen.width <= 750){
        document.getElementById("menu").style.display = "none";
        menuDisplay = toogle(menuDisplay);
    
    }
})

let menuDisplay = false;
document.getElementById("menu-btn").addEventListener("click", function(){
    menuDisplay = toogle(menuDisplay);
    if (menuDisplay){
        document.getElementById("menu").style.display = "block";
    }
    else { document.getElementById("menu").style.display = "none"}
})

function filter(list){
    let temp = []; 
    list.forEach(listItem => {
        if (listItem.parentElement.id == "overview"){
            temp.push(listItem);
        }
    })
    return temp;
}

let todoLists = filter(document.querySelectorAll(".todo"));
let defaultDisplay = "inline-block";
if (window.screen.width <= 750){
    defaultDisplay = "block";
}
let overview = document.getElementById("overview");
let completed = document.getElementById("completed");

document.getElementById("add").addEventListener("click", function(){
    // todoLists.forEach(todo => {
    //     todo.style.display = "none";
    // })
    document.getElementById("todo-container").style.display = "none";
    // completed.style.display = "none";
    // completed.style.display = "block";
    // if (window.screen.width <= 750){
    //     completed.style.display = defaultDisplay;
    // }
    completed.style.display = "none";
    overview.style.display = "block";
    document.getElementById("new-container").style.display = "block";
    document.getElementById("add").style.display = "none";
})

document.getElementById("cancel").addEventListener("click", function(){
    // let defaultDisplay = todoLists[0].style.display;
    // todoLists.forEach(todo => {
    //     todo.style.display = defaultDisplay;
    // })
    document.getElementById("todo-container").style.display = "block";
    if (window.screen.width > 750){
        completed.style.display = "block";
    }
    document.getElementById("new-container").style.display = "none";
    document.getElementById("add").style.display = "block";
})

document.getElementById("all").addEventListener("click", function(){
    if (window.screen.width <= 750){
        completed.style.display = "none";
        document.getElementById("menu").style.display = "none";
    }
    overview.style.display = "block";
    document.getElementById("new-container").style.display = "none";
    document.getElementById("add").style.display = "block";
    todoLists.forEach(todo => {
        todo.style.display = defaultDisplay;
    })
})

document.getElementById("completed-btn").addEventListener("click", function(){
    overview.style.display = "none";
    completed.style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("add").style.display = "block";
})
console.log(window.screen.width)

document.getElementById("back").addEventListener("click", function(){
    document.getElementById("details-container").style.display = "none";
    document.getElementById("todo-container-all").style.display = "block";
    document.getElementById("add").style.display = "block";
})