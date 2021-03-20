url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";


/*Begin ajoue d'un frigo*/

function AddFrigo() {
    var nameFrigo = prompt("Entrer le nom du nouveau frigo", "");
    if(nameFrigo == null || nameFrigo == ""){
        return;
    }
    RequestCreateFrigo(nameFrigo, sessionStorage.getItem("idUser") + "/freezer");
}

function RequestCreateFrigo(nameFrigo, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomFrigo": "${nameFrigo}", "idUser": "${sessionStorage.getItem("idUser")}"}`,
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
    alert("Frigo crée");
    window.location.reload(false);
}

function ResquestCreateFrigoError(request, status, error) {
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
/*End ajoue d'un frigo*/