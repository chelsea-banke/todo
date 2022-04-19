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
let moreBoxes = document.querySelectorAll(".more");
function reset(){
    allToDo.forEach(todo => {
        let container = document.createElement("div");
        container.classList.add("todo");
        container.value = index;
        container.innerHTML = `
        <div class="info-box">
        <p>${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()+1}/ ${todo.dateCreated.getFullYear()}</p>
        <button class="btn info" value="${index}">ooo</button>
        </div>
        <div class="btn-group-vertical more" value="${index}">
            <button class="btn" id="mark-complete">Mark as complete</button>
            <button class="btn" id="delete">Delete</button>
        </div>
        <p>${todo.description}</p>
        <hr>
        <h5>${todo.title}</h5>
        `;
        container.addEventListener("click", function(event){
            let target = event.target; 
            if (target.classList.contains("info")){
                moreBoxes.forEach(box => {
                    console.log(target.value);
                    if (parseInt(box.getAttribute("value")) == parseInt(target.value)){
                        box.style.display = "block";
                    }
                    else{
                        box.style.display = "none";
                    }
                    console.log(box.getAttribute("value"));
                })
            }
            else if(target.id == "mark-complete"){
                allToDo[parseInt(target.parentElement.value)].status = "completed";
                reset();
            }
            else if(target.id == "delete"){
                delete allToDo[parseInt(target.parentElement.value)];
                allToDo = allToDo.filter(item => {
                     return item !== undefined;
                })
                document.getElementById("todo-container").innerHTML = "";
                reset();
            }
            else{
                document.getElementById("details").innerHTML = 
                `
                <h4>${todo.title}<button class="btn info">ooo</button></h4>
                <p>${todo.description}</p><hr>
                <div id="info" value="${index}">
                    <p>Date/time created: ${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()+1}/ ${todo.dateCreated.getFullYear()} (${todo.dateCreated.getHours()}:${todo.dateCreated.getMinutes()})</p>
                    <p>Due date/time: ${todo.dueDate.getDate()}/ ${todo.dueDate.getMonth()+1}/ ${todo.dueDate.getFullYear()} (${todo.dueDate.getHours()}:${todo.dueDate.getMinutes()})</p>
                    <p>Time left: <span id="time-left">1day | 2hrs | 9mins | 2secs</span>
                    </p>
                    <p>Status: ${todo.getStatus()}</p>
                </div>
                `;
                document.getElementById("details-container").style.display = "block";
                document.getElementById("todo-container-all").style.display = "none";
                document.getElementById("add").style.display = "none";
                completed.style.display = "none";
            }
        })
        document.getElementById("todo-container").append(container);
        if (todo.getStatus == "timed Out"){
            document.getElementById("todo-completed").append(container);
        }
        moreBoxes = document.querySelectorAll(".more");
        index ++;
    })
}

reset();
let dates = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "dECEMBER"];
document.getElementById("save").addEventListener("click", function(){
    let title = document.getElementById("title-input").value;
    let dDate = document.getElementById("date-input").value;
    let dTime = document.getElementById("time-input").value;
    let description = document.getElementById("description").value;

    console.log(title);
    console.log(dDate);
    console.log(dTime);
    console.log(description);
    if (title == '' || dDate == '' || dTime == "" || description == ""){
        alert("Please make sure you filled every field !");
    }
    else {
        document.getElementById("todo-container").innerHTML = ``;
        allToDo.push(new ToDo(title, description, (dDate + "T" + dTime)));
        reset();

        document.getElementById("todo-container").style.display = "block";
        if (window.screen.width > 750){
            completed.style.display = "block";
        }
        document.getElementById("new-container").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("title-input").value = "";
        document.getElementById("date-input").value = "";
        document.getElementById("time-input").value = "";
        document.getElementById("description").value = "";
    }
})

document.body.addEventListener("click", function(event){
    if (!(event.target.classList.contains("info"))){
        moreBoxes.forEach(box => {
            box.style.display = "none";
        })   
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
    document.getElementById("todo-container").style.display = "none";
    completed.style.display = "none";
    overview.style.display = "block";
    document.getElementById("new-container").style.display = "block";
    document.getElementById("add").style.display = "none";
})

document.getElementById("cancel").addEventListener("click", function(){
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
    document.getElementById("details").innerHTML = ``;
    if (window.screen.width > 750){
        completed.style.display = "block";
    }
})