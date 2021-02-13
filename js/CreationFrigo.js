url = "https://congelateur.herokuapp.com/";
port = "";
//port = ":5000/";


function SendInformation() {
    var nameFrigo = document.getElementById("NameFrigo").value;

    if (Verification(nameFrigo)) {
        RequestCreateFrigo(nameFrigo, sessionStorage.getItem("idUser") + "/freezer");
    } else {
        return;
    }
}

function Verification(nameFrigo) {
    if (!isNaN(nameFrigo)) { // Si un des champs est vide
        return false;
    } else {
        return true;
    }
}

function RequestCreateFrigo(nameFrigo, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomFrigo": "${nameFrigo}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            ResquestCreateFrigoSuccess();
        },
        error: function(request, status, error) {
            ResquestCreateFrigoError(request, status, error);
        }
    });
}

function ResquestCreateFrigoSuccess() {
    document.location.href = "../html/ConnexionFrigo.html";
}

function ResquestCreateFrigoError(request, status, error) {
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