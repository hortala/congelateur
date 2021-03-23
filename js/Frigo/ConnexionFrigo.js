url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

//Variable tmp pour affichage du contenu du frigo 
sessionStorage.setItem("VTpmDisplayFood", "Type");

nbFrigo = 0;
requestFrigo = [];

/* Begin connexion Frigo */

function ClickImageConnexionFrigo(idFrigo) {
    var i = 0;
    while(window.requestFrigo[i].fre_id != idFrigo){
        i++;
    }

    sessionStorage.setItem("nomFrigo", window.requestFrigo[i].fre_name);
    sessionStorage.setItem("idFrigo", idFrigo);
    document.location.href = "PageFrigo.html";
}

/* End connexion frigo */

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
            corpsHTML 
            +"<h1 align=center>" + requestFrigo[i].fre_name + "</h1>" 
            +"<div class=centerPerso><img src=../image/Supression.jpg onclick=ClickImageDeleteFreezer(" + window.requestFrigo[i].fre_id.toString() + ") width=5%>"
            +"  <img src=../image/Modifier.jpg onclick=ClickImageModifierFreezer(" + window.requestFrigo[i].fre_id.toString() + ") width=5%>"
            +"</div>"
            +"<div class=centerPerso><img src=../image/Frigo/" + (i + 1).toString() + ".jpg onclick=ClickImageConnexionFrigo(" + window.requestFrigo[i].fre_id.toString() + ") width=50%></div>" 
            +"<br><br>"
    }
    document.getElementById("GenerationFrigo").innerHTML = corpsHTML;

}

function ResquestFrigosThisUserError(request, status, error) {
    if (request.status == 520) {
        alert("Pas de frigo");
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

