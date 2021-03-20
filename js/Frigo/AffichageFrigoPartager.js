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

    var corpsHTMLListe = "<table class="+"\""+"table table-bordered table-dark"+"\""+">"
                        +"<thead>"
                        +"<tr>"
                        +"<th colspan=3>Frigo partagé(s)</th>"
                        +"</tr>"
                        +"</thead>"
                        +"<tbody>";

    for (var i = 0; i < window.requestFreezerShare.length; i++) {

        corpsHTMLListe = corpsHTMLListe +
            "<tr><td>" + window.requestFreezerShare[i].fre_name +"</td>"+
            "<td>" + window.requestFreezerShare[i].use_mailadress + "</td>"+
            "<td><img src=../image/Supression.jpg onclick=ClickImageDeleteShareFreezer(" + window.requestFreezerShare[i].uin_id + ") width=30%></td></tr>";
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



SearchShareFreezer();