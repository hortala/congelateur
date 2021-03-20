url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

//Variable tmp pour affichage du contenu du frigo 
sessionStorage.setItem("VTpmDisplayFood", "Type");

nbFrigo = 0;
requestFrigo = [];

/* Begin connexion Frigo */

function ClickImageConnexionFrigo(position) {
    sessionStorage.setItem("nomFrigo", window.requestFrigo[position].fre_name);
    sessionStorage.setItem("idFrigo", window.requestFrigo[position].fre_id);
    document.location.href = "PageFrigo.html";
}

/* End connexion frigo */

/* Begin Delete Frigo */

function ClickImageDeleteFreezer(NumImage){
    RequestDeleteFreezer (window.requestFrigo[NumImage].fre_id, (sessionStorage.getItem("idUser") +"/freezer"));
}

function RequestDeleteFreezer(idFreezer, destination) {
    $.ajax({
        type: "DELETE",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"idFreezer": "${idFreezer}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestDeleteFreezerSuccess();
        },
        error: function(request, status, error) {
            RequestDeleteFreezerError(request, status, error);
        }
    });
}

function RequestDeleteFreezerSuccess() {
    alert("Frigo suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteFreezerError(request, status, error) {
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

/* End Delete Frigo */ 



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
            "<div class=centerPerso><img src=../image/Supression.jpg onclick=ClickImageDeleteFreezer(" + i + ") width=5%></div>"+
            "<div class=centerPerso><img src=../image/Frigo/" + (i + 1).toString() + ".jpg onclick=ClickImageConnexionFrigo(" + i + ") width=50%></div>" +
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
        alert("Pas de frigo trouvé");
        AddFrigo();
    }
    return false;
}
/*End création de la page*/




CreateAllFrigo();

