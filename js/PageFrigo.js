url = "http://@localhost";
port = ":5000/";

/* Begin Supression d'image */

function ClickImage(NumImage){
   RequestDeleteFood (window.requestFoods[NumImage].foo_id, (sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/food"));
}

function RequestDeleteFood(idFood, destination) {
    $.ajax({
        type: "DELETE",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"idFood": "${idFood}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestDeleteFoodSuccess();
        },
        error: function(request, status, error) {
            RequestDeleteFoodError(request, status, error);
        }
    });
}

function RequestDeleteFoodSuccess() {
    alert("Aliment suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteFoodError(request, status, error) {
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

/* En Supression image */

/* Begin add Food */

function AddFood(){
    DisplayModal();
}

/* Begin Modal */
function DisplayModal() {
    var modal = document.getElementById("myModal"); // Get the modal

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

    var corpsHTMLListe = "<select name=TypesAlliments id=listeType>";
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

function SendAddFood(){
    var nameFood = document.getElementById("NameFood").value;
    var poids = document.getElementById("poids").value;
    var idType = document.getElementById("listeType").value;   

    if (Verification(nameFood) && Verification(poids.toString())) {
        RequestCreateFood(nameFood, poids, idType, (sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/food"));
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

function RequestCreateFood(nameFood, poids, type, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomFood": "${nameFood}", "poids": "${poids}", "type": "${type}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            ResquestRequestCreateFoodSuccess();
        },
        error: function(request, status, error) {
            ResquestRequestCreateFoodError(request, status, error);
        }
    });
}

function ResquestRequestCreateFoodSuccess() {
    alert("Aliment ajouté");        
}

function ResquestRequestCreateFoodError(request, status, error) {
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

/*  End add Food */





/*
"<img src=../../image/Piece/" + (i + 1).toString() + ".jpg onclick=ClickImage(" + i + ") width=100%>" +
*/