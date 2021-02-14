url = sessionStorage.getItem("url");

/* Begin display freezer share */
function SearchShareFreezer(){
    SearchShareFreezerRequest(sessionStorage.getItem("idUser") + "/userinvit");
}

function SearchShareFreezerRequest(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            SearchShareFreezerRequestSucces(response);
        },
        error: function(request, status, error) {
            SearchShareFreezerRequestError(request, status, error);
        }
    });
}

function SearchShareFreezerRequestSucces(response) {
    window.requestFreezerShare = JSON.parse(JSON.stringify(response));
    
    var corpsHTMLListe = "<table><thead><tr><th colspan=3>Frigo partagé(s)</th></tr></thead>";
    corpsHTMLListe = corpsHTMLListe + "<tbody>";
    for (var i = 0; i < window.requestFreezerShare.length; i++) {

        corpsHTMLListe = corpsHTMLListe +
            "<tr><td>" + window.requestFreezerShare[i].fre_name + "</td>"+
            "<td>" + window.requestFreezerShare[i].use_mailadress + "</td>"+
            "<td><img src=../image/Supression.jpg onclick=ClickImageDeleteShareFreezer(" + i + ") width=10%></td></tr>";
    }
    corpsHTMLListe = corpsHTMLListe + "</tbody></table>";
    document.getElementById("FrigoPartager").innerHTML = corpsHTMLListe;

    return true;
}

function SearchShareFreezerRequestError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}

/* End display share freezer */

/* begin supression frigo partagé */

function ClickImageDeleteShareFreezer(NumImage){    
    alert(window.requestFreezerShare[NumImage].uin_id);
    RequestDeleteShareFreezer (window.requestFreezerShare[NumImage].uin_id, (sessionStorage.getItem("idUser") +"/userinvit"));
}

function RequestDeleteShareFreezer(idUserInvit, destination) {
    $.ajax({
        type: "DELETE",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"idUserInvit": "${idUserInvit}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestDeleteShareFreezerSuccess();
        },
        error: function(request, status, error) {
            RequestDeleteShareFreezerError(request, status, error);
        }
    });
}

function RequestDeleteShareFreezerSuccess() {
    alert("Aliment suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteShareFreezerError(request, status, error) {
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

/* End supression frigo partagé */

SearchShareFreezer();