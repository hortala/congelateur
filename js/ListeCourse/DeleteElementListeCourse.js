function DeleteElementListeCouse(idListe) {
    $(".btnDeleteElementListCourse").prop('disabled',true);
    RequestDeleteElementListeCourse (idListe, (sessionStorage.getItem("idUser") + "/deleteElementListeCouse"));
}

function RequestDeleteElementListeCourse(idListe, destination) {
    $.ajax({
        type: "DELETE",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"idListe": "${idListe}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestDeleteElementListeCourseSuccess();
        },
        error: function(request, status, error) {
            RequestDeleteElementListeCourseError(request, status, error);
        }
    });
}

function RequestDeleteElementListeCourseSuccess() {
    $(".btnDeleteElementListCourse").prop('disabled',false);
    window.location.reload(true); 
}

function RequestDeleteElementListeCourseError(request, status, error) {
    $(".btnDeleteElementListCourse").prop('disabled',false);
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