url = sessionStorage.getItem("url");
port = "";

function ClickImageDeleteFreezer(idFrigo){
    $(".btnDeleteFreezer").prop('disabled', true);
    RequestDeleteFreezer (idFrigo, (sessionStorage.getItem("idUser") +"/freezer"));
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
    $(".btnDeleteFreezer").prop('disabled', false);
    alert("Frigo suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteFreezerError(request, status, error) {
    $(".btnDeleteFreezer").prop('disabled', false);

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
