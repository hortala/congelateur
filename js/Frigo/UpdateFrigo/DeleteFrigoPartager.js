url = sessionStorage.getItem("url");

function ClickImageDeleteShareFreezer(idUserInvit){    
    $(".btnDeletePartageFreezer").prop('disabled', true);
    RequestDeleteShareFreezer (idUserInvit, (sessionStorage.getItem("idUser") +"/userinvit"));
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
    $(".btnDeletePartageFreezer").prop('disabled', false);
    alert("Frigo partagé suprimé"); 
    window.location.reload(true); 
}

function RequestDeleteShareFreezerError(request, status, error) {
    $(".btnDeletePartageFreezer").prop('disabled', false);
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

