function toogle(bool){
    if (bool){return false}
    else {return true}
}

document.getElementById("completed").addEventListener("click", function(){
    document.getElementById("menu").style.display = "none";
})
document.getElementById("overview").addEventListener("click", function(){
    document.getElementById("menu").style.display = "none";
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
let defaultDisplay = todoLists[0].style.display;
let overview = document.getElementById("overview");
let completed = document.getElementById("completed");

document.getElementById("add").addEventListener("click", function(){
    todoLists.forEach(todo => {
        todo.style.display = "none";
    })
    // completed.style.display = "none";
    overview.style.display = "block";
    document.getElementById("new").style.display = "block";
    document.getElementById("add").style.display = "none";
})

document.getElementById("cancel").addEventListener("click", function(){
    // let defaultDisplay = todoLists[0].style.display;
    todoLists.forEach(todo => {
        todo.style.display = defaultDisplay;
    })
    document.getElementById("new").style.display = "none";
    document.getElementById("add").style.display = "block";
    document.getElementById("add").style.display = "block";
})

document.getElementById("all").addEventListener("click", function(){
    overview.style.display = "block";
    completed.style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("new").style.display = "none";
    todoLists.forEach(todo => {
        todo.style.display = defaultDisplay;
    })
})

document.getElementById("completed-btn").addEventListener("click", function(){
    overview.style.display = "none";
    completed.style.display = "block";
    document.getElementById("menu").style.display = "none";
})
