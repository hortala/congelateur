url = sessionStorage.getItem("url");
port = "";

function SendAddFood(){
    $("#btnAddFood").prop("disabled", true);

    var nameFood = document.getElementById("AddNameFoodID").value;
    var poids = document.getElementById("poidsAddFoodID").value;
    var idType = document.getElementById("listeType").value;   
    var date = document.getElementById("dateAddFoodID").value;  

    if (Verification(nameFood) && Verification(poids.toString())) {
        RequestCreateFood(nameFood, poids, idType, date, (sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/food"));
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

function RequestCreateFood(nameFood, poids, type, date, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomFood": "${nameFood}", "poids": "${poids}", "type": "${type}", "date": "${date}"}`,
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
    $("#btnAddFood").prop("disabled", false);
    alert("Aliment ajouté");        
}

function ResquestRequestCreateFoodError(request, status, error) {
    $("#btnAddFood").prop("disabled", false);
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

function resetAddFoodNom(){
    $("#AddNameFoodID").val("")
}

function resetAddFoodDate(){
    $("#dateAddFoodID").val("")
}

function resetAddFoodPoids(){
    $("#poidsAddFoodID").val("")
}