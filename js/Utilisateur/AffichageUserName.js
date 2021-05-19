
if(sessionStorage.getItem("droitSuperUser") == 'true'){
    alert("Compte administrateur")
}

document.getElementById("UserName").innerHTML = sessionStorage.getItem("nameUser").toUpperCase();
