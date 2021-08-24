url = sessionStorage.getItem("url");
port = "";

idUserAddElement = ""
//Ouverture du modal pour renseigner l'aliments a crée
function AddElementDisplayModal(idUser){
    idUserAddElement = idUser
    DisplayModalAddElement();
}

/* Begin Modal */

function DisplayModalAddElement() {
    var modal = document.getElementById("modalAddElement"); // Get the modal    

    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload(false);
        }
    }
}

function SendAddElement(){
    $("#btnAddElementID").prop("disabled", true);

    var nameElement = document.getElementById("nomElementID").value;
    var poids = document.getElementById("poidsElementID").value;
    var description = document.getElementById("descriptionElementID").value;   

    if (Verification(nameElement)) {
        RequestCreateElement(nameElement, poids, description, (idUserAddElement + "/addElementListeCourse"));
    } else {
        alert('attention saisie incorect');
        return;
    }
}

function Verification(string) {
    if (string == "") { // Si un des champs est vide
        return false;
    } else {
        return true;
    }
}

function RequestCreateElement(nameElement, poids, description, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nameElement": "${nameElement}", "poids": "${poids}", "description": "${description}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestCreateElementSuccess();
        },
        error: function(request, status, error) {
            RequestCreateElementError(request, status, error);
        }
    });
}

function RequestCreateElementSuccess() {
    $("#btnAddElementID").prop("disabled", false);
    alert("Element ajouté");        
}

function RequestCreateElementError(request, status, error) {
    $("#btnAddElementID").prop("disabled", false);
    if (request.status == 570) {
        alert("Nom du frigo déjà utilisé");
    } else if (request.status == 550) {
        alert("Problème base de donnée");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
}

function ResetNomElement(){
    $("#nomElementID").val("")
    /*
    let notif = {
        Type: "error",
        Message: "Nom reset"
    }
    let arrayNotif = [notif]
    RiseNotification(arrayNotif)
    */
}

function ResetPoidsElement(){
    $("#poidsElementID").val("")
}

function ResetDescriptionElement(){
    $("#descriptionElementID").val("")
}