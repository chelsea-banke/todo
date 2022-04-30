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
            return "timed out";
        }
        else {
            return "pending";
        }
    }
    timeLeft(){
        let ms = this.dueDate.getTime() - new Date();
        if (ms < 0){
            return [0, 0, 0, 0];
        }
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms = ms % (24*60*60*1000);
        const hours = Math.floor(daysms / (60*60*1000));
        const hoursms = ms % (60*60*1000);
        const minutes = Math.floor(hoursms / (60*1000));
        const minutesms = ms % (60*1000);
        const sec = Math.floor(minutesms / 1000);
        
        return [days, hours, minutes, sec];
    }
}

let allToDo = [
    new ToDo("Walk the dog", "Walk the dog through the park for 30 mins and return home", "October 13, 2014 11:13:00")
]

let moreBoxes = document.querySelectorAll(".more");
function reset(){
    let index = 0;
    document.getElementById("todo-titles").innerHTML = `
        <button class="btn" id="all">All</button>
        <button class="btn" id="completed-btn">Time out</button>
    `;
    allToDo.forEach(todo => {
        let container = document.createElement("div");
        container.classList.add("todo");
        container.value = index;

        let todoLink = document.createElement("button");
        todoLink.value = index;
        todoLink.classList.add("btn");
        todoLink.innerHTML = todo.title;
        document.getElementById("todo-titles").append(todoLink);

        if (todo.status == "completed"){
            container.innerHTML = `
            <div class="info-box">
            <p>${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()+1}/ ${todo.dateCreated.getFullYear()}</p>
            <button class="btn info" value="${index}">ooo</button>
            </div>
            <div class="btn-group-vertical more" value="${index}">
                <button class="btn" id="delete">Delete</button>
            </div>
            <p>${todo.description}</p>
            <hr>
            <h5>${todo.title}</h5>
            <p class="status">${todo.status}</p>
            `;
        }
        else{
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
            <p class="status">${todo.status}</p>
            `;   
        }
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
                allToDo[parseInt(target.parentElement.getAttribute("value"))].status = "completed";
                document.getElementById("todo-container").innerHTML = "";
                reset();
            }
            else if(target.id == "delete"){
                delete allToDo[parseInt(target.parentElement.getAttribute("value"))];
                allToDo = allToDo.filter(item => {
                     return item !== undefined;
                })
                document.getElementById("todo-container").innerHTML = "";
                reset();
            }
            else{
                let temp = todo.timeLeft();
                document.getElementById("details").innerHTML = 
                `
                <h4>${todo.title}</h4>
                <p>${todo.description}</p><hr>
                <div id="info" value="${index}">
                    <p>Date/time created: ${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()+1}/ ${todo.dateCreated.getFullYear()} (${todo.dateCreated.getHours()}:${todo.dateCreated.getMinutes()})</p>
                    <p>Due date/time: ${todo.dueDate.getDate()}/ ${todo.dueDate.getMonth()+1}/ ${todo.dueDate.getFullYear()} (${todo.dueDate.getHours()}:${todo.dueDate.getMinutes()})</p>
                    <p>Time left: <span id="time-left">${temp[0]}day | ${temp[1]}hrs | ${temp[2]}mins | ${temp[3]}secs</span>
                    </p>
                    <p>Status: ${todo.status}</p>
                </div>
                `;
                document.getElementById("details-container").style.display = "block";
                document.getElementById("todo-container-all").style.display = "none";
                document.getElementById("add").style.display = "none";
                completed.style.display = "none";
            }
        })
        if (todo.status == "completed"){
            let temp = container;
            console.log(temp);
            document.getElementById("todo-completed").prepend(temp);
        }
        document.getElementById("todo-container").prepend(container);
        moreBoxes = document.querySelectorAll(".more");
        index ++;
    })
}

reset();
let dates = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("todo-titles").addEventListener("click", function(event){
    console.log(event.target.getAttribute("id"));
    if (event.target.getAttribute("id") == null){
        let todo_ = allToDo[parseInt(event.target.getAttribute("value"))];
        let temp = todo_.timeLeft();
        document.getElementById("details").innerHTML = 
        `
        <h4>${todo_.title}<button class="btn info">ooo</button></h4>
        <p>${todo_.description}</p><hr>
        <div id="info" value="${event.target.value}">
            <p>Date/time created: ${todo_.dateCreated.getDate()}/ ${todo_.dateCreated.getMonth()+1}/ ${todo_.dateCreated.getFullYear()} (${todo_.dateCreated.getHours()}:${todo_.dateCreated.getMinutes()})</p>
            <p>Due date/time: ${todo_.dueDate.getDate()}/ ${todo_.dueDate.getMonth()+1}/ ${todo_.dueDate.getFullYear()} (${todo_.dueDate.getHours()}:${todo_.dueDate.getMinutes()})</p>
            <p>Time left: <span id="time-left">${temp[0]}day | ${temp[1]}hrs | ${temp[2]}mins | ${temp[3]}secs</span>
            </p>
            <p>Status: ${todo_.status}</p>
        </div>
        `;
        document.getElementById("details-container").style.display = "block";
        document.getElementById("todo-container-all").style.display = "none";
        document.getElementById("add").style.display = "none";
        completed.style.display = "none";
        overview.style.display = "block";
    
        if (window.screen.width <= 750){
            menuDisplay = toogle(menuDisplay);
            document.getElementById("menu").style.display = "none";
            document.getElementById("mobile-title").style.display = "block"; 
        }
    }
    else if(event.target.getAttribute("id") == "completed-btn"){
        console.log("clicked");
        overview.style.display = "none";
        completed.style.display = "block";
        document.getElementById("menu").style.display = "none";
        document.getElementById("add").style.display = "block";
        menuDisplay = toogle(menuDisplay);
    }
    else{
        if (window.screen.width <= 750){
            completed.style.display = "none";
            document.getElementById("menu").style.display = "none";
            document.getElementById("mobile-title").style.display = "block"; 
        }
        overview.style.display = "block";
        document.getElementById("new-container").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("details-container").style.display = "none";
        document.getElementById("todo-container-all").style.display = "block";
        todoLists.forEach(todo => {
            todo.style.display = defaultDisplay;
        })
        menuDisplay = toogle(menuDisplay);
    }
})

document.getElementById("save").addEventListener("click", function(){
    let title = document.getElementById("title-input").value;
    let dDate = document.getElementById("date-input").value;
    let dTime = document.getElementById("time-input").value;
    let description = document.getElementById("description").value;

    if (title == '' || dDate == '' || dTime == "" || description == ""){
        alert("Please make sure you filled every field !");
    }
    else {
        console.log("okay");
        document.getElementById("todo-container").innerHTML = ``;
        allToDo.push(new ToDo(title, description, (dDate + "T" + dTime)));
        reset();

        document.getElementById("todo-container-all").style.display = "block";
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
    if (window.screen.width <= 750 && document.getElementById("menu").style.display != "none"){
        document.getElementById("menu").style.display = "none";
        document.getElementById("mobile-title").style.display = "block"; 
        menuDisplay = toogle(menuDisplay);
    }
})
document.getElementById("overview").addEventListener("click", function(){
    if (window.screen.width <= 750 && document.getElementById("menu").style.display != "none"){
        document.getElementById("menu").style.display = "none";
        document.getElementById("mobile-title").style.display = "block"; 
        document.getElementById("mobile-title").style.display = "block"; 
        menuDisplay = toogle(menuDisplay);
    
    }
})

let menuDisplay = false;
document.getElementById("menu-btn").addEventListener("click", function(){
    menuDisplay = toogle(menuDisplay);
    if (menuDisplay){
        document.getElementById("menu").style.display = "block";
        document.getElementById("mobile-title").style.display = "none"; 
    }
    else { 
        document.getElementById("menu").style.display = "none";
        document.getElementById("mobile-title").style.display = "block"; 
    }
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
    document.getElementById("todo-container-all").style.display = "none";
    completed.style.display = "none";
    overview.style.display = "block";
    document.getElementById("new-container").style.display = "block";
    document.getElementById("add").style.display = "none";
})

document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("todo-container-all").style.display = "block";
    if (window.screen.width > 750){
        completed.style.display = "block";
    }
    document.getElementById("new-container").style.display = "none";
    document.getElementById("add").style.display = "block";
})

document.getElementById("back").addEventListener("click", function(){
    document.getElementById("details-container").style.display = "none";
    document.getElementById("todo-container-all").style.display = "block";
    document.getElementById("add").style.display = "block";
    document.getElementById("details").innerHTML = ``;
    if (window.screen.width > 750){
        completed.style.display = "block";
    }
})

let timeOut = function(){
    let count = 0;
    document.getElementById("todo-completed").innerHTML = ``;   
    allToDo.forEach(elem => {
        if (elem.getStatus() == "timed out"){
            let element = document.createElement("div");
            element.classList.add("todo");
            element.innerHTML = `
                <div class="btn-group-vertical more" value="${allToDo.indexOf(elem)}">
                    <button class="btn" id="delete">Delete</button>
                </div>
                <p>${elem.description}</p>
                <hr>
                <h5>${elem.title}</h5>
                <p class="status">${elem.status}</p>
            `;
            document.getElementById("todo-completed").append(element);   
            count ++;
        }
    })
    if (count == 0){
        let empty = document.createElement("div");
    }
}
setInterval(function(){timeOut()}, 1000);

document.body.addEventListener("swiped-right", function(){
    if(window.screen.width <= 750){
        menuDisplay = toogle(menuDisplay);
        if (menuDisplay){
            document.getElementById("menu").style.display = "block";
            document.getElementById("mobile-title").style.display = "none"; 
        }
    }
})
document.body.addEventListener("swiped-left", function(){
    if(window.screen.width <= 750){
        menuDisplay = toogle(menuDisplay);
        if (!menuDisplay){
            document.getElementById("menu").style.display = "none";
            document.getElementById("mobile-title").style.display = "block"; 
        }
    }
})

document.getElementById("search-go").addEventListener("click", function(){
    let searchRequest = document.getElementById("search-input").value.toLowerCase();
    if (searchRequest != ''){
        count = 0;
        allToDo.forEach(todo => {
            title = todo.title.toLowerCase();
            if (title == searchRequest){
                index = allToDo.indexOf(todo);
                let temp = todo.timeLeft();
                document.getElementById("details").innerHTML = 
                `
                <h4>${todo.title}</h4>
                <p>${todo.description}</p><hr>
                <div id="info" value="${index}">
                    <p>Date/time created: ${todo.dateCreated.getDate()}/ ${todo.dateCreated.getMonth()+1}/ ${todo.dateCreated.getFullYear()} (${todo.dateCreated.getHours()}:${todo.dateCreated.getMinutes()})</p>
                    <p>Due date/time: ${todo.dueDate.getDate()}/ ${todo.dueDate.getMonth()+1}/ ${todo.dueDate.getFullYear()} (${todo.dueDate.getHours()}:${todo.dueDate.getMinutes()})</p>
                    <p>Time left: <span id="time-left">${temp[0]}day | ${temp[1]}hrs | ${temp[2]}mins | ${temp[3]}secs</span>
                    </p>
                    <p>Status: ${todo.status}</p>
                </div>
                `;
                document.getElementById("details-container").style.display = "block";
                document.getElementById("todo-container-all").style.display = "none";
                document.getElementById("add").style.display = "none";
                completed.style.display = "none";
                document.getElementById("search-input").value = "";
            }
            else{count++}
        })
        if (count == allToDo.length){
            document.getElementById("details").innerHTML = 
            `
                Sorry but Nothing matched your request "${searchRequest = document.getElementById("search-input").value}"
            `;
            document.getElementById("details-container").style.display = "block";
            document.getElementById("todo-container-all").style.display = "none";
            document.getElementById("add").style.display = "none";
            completed.style.display = "none";
            document.getElementById("search-input").value = "";   
        }
    }
})