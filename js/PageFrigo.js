url = "http://@localhost";
port = ":5000/";

/* Begin create Foods */
function CreateAllFoods() {
    RequestFoodsThisFreezer(sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("idFrigo") + "/food");
}

function RequestFoodsThisFreezer(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestFoodsThisFreezerSucces(response);
        },
        error: function(request, status, error) {
            RequestFoodsThisFreezerError(request, status, error);
        }
    });
}

function RequestFoodsThisFreezerSucces(response) {
    window.requestFoods = JSON.parse(JSON.stringify(response));
    var corpsHTML = "";
    for (var i = 0; i < window.requestFoods.length; i++) {

        corpsHTML =
            corpsHTML +
            "<h1 align=center>" + requestFoods[i].foo_name + "</h1>" +
            
            "<br><br>"
    }
    document.getElementById("GenerationFood").innerHTML = corpsHTML;
}

function RequestFoodsThisFreezerError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}
/* End create Foods */
 
/* Begin add Food */

function AddFood(){
    DisplayModal();
}

/* Begin Modal */
function DisplayModal() {
    var modal = document.getElementById("myModal"); // Get the modal



    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload(false);
        }
    }
}

function GenerationSensorModal() {
    CreateAllSensor();
}

/* End Modal */

function SendAddFood(){
    var nameFood = document.getElementById("NameFood").value;
    var poids = document.getElementById("poids").value;
    var type = document.getElementById("TypeFood").value;

    if (Verification(nameFood) && Verification(type)) {
        alert('ok on est passé');
        alert(sessionStorage.getItem("idUser"));
        alert(sessionStorage.getItem("idFrigo"));
        alert(sessionStorage.getItem("idUser") + "/" +sessionStorage.getItem("idFrigo") + "/food");
        alert(url+port+sessionStorage.getItem("idUser") + "/" +sessionStorage.getItem("idFrigo") + "/food")
        RequestCreateFood(nameFood, poids, type, (sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/food"));
    } else {
        alert('attention saisie incorect');
        return;
    }
}

function Verification(string) {
    if (!isNaN(string)) { // Si un des champs est vide
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
    /*
    modal.style.display = "none";
    window.location.reload(false);
    */
   document.location.href = "PageFrigo.html";
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

CreateAllFoods();



/*
"<img src=../../image/Piece/" + (i + 1).toString() + ".jpg onclick=ClickImage(" + i + ") width=100%>" +
*/