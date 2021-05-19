url = sessionStorage.getItem("url");
port = "";

/* Begin Modal */

function ClickImageModifierFreezer(idFrigo){
    $(".btnUpdateFreezer").prop('disabled', true);

    window.idFrigo = idFrigo;
    DisplayModalUpdateFreezer()
    return true;
}

function DisplayModalUpdateFreezer() {
    var modal = document.getElementById("modalUpdateFreezer"); // Get the modal

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

/*Begin Update d'un frigo*/

function SendUpdateFrigo(){
    $("#btnModifFreezer").prop('disabled', true)
    RequestUpdateFrigo(window.idFrigo, document.getElementById("nameFrigoModif").value, sessionStorage.getItem("idUser") + "/freezer");
}

function RequestUpdateFrigo(idFrigo, newNameFrigo, destination) {
    $.ajax({
        type: "PUT",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"newNomFrigo": "${newNameFrigo}", "idFrigo": "${idFrigo}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            ResquestUpdateFrigoSuccess();
        },
        error: function(request, status, error) {
            ResquestUpdateFrigoError(request, status, error);
        }
    });
}

function ResquestUpdateFrigoSuccess() {
    $("#btnModifFreezer").prop('disabled', true);
    $(".btnUpdateFreezer").prop('disabled', false);
    
    alert("Frigo modifier");
    window.location.reload(false);
}

function ResquestUpdateFrigoError(request, status, error) {
    $("#btnModifFreezer").prop('disabled', true);
    $(".btnUpdateFreezer").prop('disabled', false);

    if (request.status == 570) {
        alert("Nom du frigo déjà utilisé");
    } else if (request.status == 550) {
        alert("Problème base de donnée");
    } else if (request.status == 520) {
        alert("Utilisateur inexistant");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
}
/*End Update d'un frigo*/