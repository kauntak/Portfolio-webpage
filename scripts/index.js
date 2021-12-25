var sambaOverview = document.getElementById("samba-overview");
var sambaAction = document.getElementById("samba-project-link");
var closeSpan = document.getElementsByClassName("close")[0];

sambaAction.onclick = () => {
    sambaOverview.style.display = "block";
    console.log("Samba Clicked");
    return false;
}
closeSpan.onclick = () =>{
    sambaOverview.style.display = "none";
}
window.onclick = (event) => {
    if(event.target == sambaAction){
        sambaOverview.style.display == "none";
    }
}