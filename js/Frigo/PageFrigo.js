url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

//Ouverture du modal pour renseigner l'aliments a crée
function AddFoodDisplayModal(){
    DisplayModalAddFood();
}

/* Begin Modal */

function DisplayModalAddFood() {
    var modal = document.getElementById("modalAddFood"); // Get the modal

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

function DisplayListeType(){
    RequestTypes("type");
}

function RequestTypes(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestTypesSucces(response);
        },
        error: function(request, status, error) {
            RequestTypesError(request, status, error);
        }
    });
}

function RequestTypesSucces(response) {
    window.requestTypes = JSON.parse(JSON.stringify(response));

    var corpsHTMLListe = "<select class=custom-select id=listeType>"
        + "option selected>Choisir le type</option>";
    for (var i = 0; i < window.requestTypes.length; i++) {

        corpsHTMLListe =
        corpsHTMLListe +
            "<option value="+ window.requestTypes[i].typ_id +">"+ window.requestTypes[i].typ_name +"</option>";
    }
    corpsHTMLListe = corpsHTMLListe + "</select>";
    document.getElementById("TypeListe").innerHTML = corpsHTMLListe;

    return true;
}

function RequestTypesError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}
/* End Modal */

function AffichageNomFrigo(){
    document.getElementById("affichageName").innerHTML = "<h2>" + sessionStorage.getItem("nomFrigo") + "</h2>";
    return;
}

function GenerationPage(){
    AffichageNomFrigo();
    SelectionAffichage(sessionStorage.getItem("VTpmDisplayFood"));
    return; 
}

GenerationPage();







