url = sessionStorage.getItem("url");
port = "";

function DeleteFood(IdFood){
    $(".btnDeleteFood").prop('disabled',true);
    RequestDeleteFood (IdFood, (sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/food"));
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
    $(".btnDeleteFood").prop('disabled',false);
    alert("Aliment suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteFoodError(request, status, error) {
    $(".btnDeleteFood").prop('disabled',false);
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

