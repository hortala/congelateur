url = sessionStorage.getItem("url");
mailadress = "";

/* Begin Share freezer */

/* Begin Modal */

function ShareFreezer(){
    DisplayModalShareFreezer()
    return true;
}

function DisplayModalShareFreezer() {
    var modal = document.getElementById("modalShareFreezer"); // Get the modal

    DisplayListeType()
    

    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload(false);
        }
    }
}

/* End Modal */

function SendShareFreezer(){
    sessionStorage.setItem("mailadress", document.getElementById("mailadress").value);
    RequestShareFreezer(sessionStorage.getItem("idUser") + "/" +sessionStorage.getItem("idFrigo") + "/userinvit");
    return;
}

function RequestShareFreezer(destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"mailadress": "${sessionStorage.getItem("mailadress")}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestShareFreezerSuccess();
        },
        error: function(request, status, error) {
            RequestShareFreezerError(request, status, error);
        }
    });
}

function RequestShareFreezerSuccess() {
    alert("Partage éffectué");
    return true;
}

function RequestShareFreezerError(request, status, error) {
    if (request.status == 570) {
        alert("Nom du frigo déjà utilisé");
    } else if (request.status == 550) {
        alert("Problème base de donnée");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error .");
    }
}

/* End Share freezer */