url = sessionStorage.getItem("url");
port = "";

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