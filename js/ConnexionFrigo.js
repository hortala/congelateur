url = "http://@localhost";
port = ":5000/";
nbFrigo = 0;
requestFrigo = [];


function ClickImage(position) {
    alert(window.requestFrigo[position].mai_nom);
    sessionStorage.setItem("nomFrigo", window.requestFrigo[position].fre_name);
    sessionStorage.setItem("idFrigo", window.requestFrigo[position].fre_id);
    document.location.href = "PageFrigo.html";
    alert("ok" + (position + 1).toString());
}



/*Begin ajoue d'un frigo*/
function AddFrigo() {
    var nameFrigo = prompt("Entrer le nom du frigo", "");
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

/*Begin création de la page*/
function CreateAllFrigo() {
    requestFrigosThisUser(sessionStorage.getItem("idUser") + "/freezer");
}

function requestFrigosThisUser(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            ResquestFrigosThisUserSuccess(response);
        },
        error: function(request, status, error) {
            ResquestFrigosThisUserError(request, status, error);
        }
    });
}

function ResquestFrigosThisUserSuccess(response) {
    window.requestFrigo = JSON.parse(JSON.stringify(response));

    var corpsHTML = "";
    for (var i = 0; i < window.requestFrigo.length; i++) {

        corpsHTML =
            corpsHTML +
            "<h1 align=center>" + requestFrigo[i].fre_name + "</h1>" +
            "<img src=../image/Frigo/" + (i + 1).toString() + ".jpg onclick=ClickImage(" + i + ") width=100%>" +
            "<br><br>"
    }
    document.getElementById("GenerationFrigo").innerHTML = corpsHTML;

}

function ResquestFrigosThisUserError(request, status, error) {
    if (request.status == 560) {
        alert("Mauvaise adresse mail");
    } else if (request.status == 570) {
        alert("Mauvais mot de passe");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
    return false;
}
/*End création de la page*/

CreateAllFrigo();