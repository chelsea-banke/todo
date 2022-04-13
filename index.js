function toogle(bool){
    if (bool){return false}
    else {return true}
}
let menuDisplay = false;
document.getElementById("menu-btn").addEventListener("click", function(){
    menuDisplay = toogle(menuDisplay);
    if (menuDisplay){
        document.getElementById("menu").style.display = "block";
    }
    else { document.getElementById("menu").style.display = "none"}
})