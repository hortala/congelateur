url = sessionStorage.getItem("url");
port = "";

function DeleteListeCourse(idListeCourse){
    $("#buttonDeleteListeCourseID_" + idListeCourse).prop('disabled',true);
    RequestDeleteListeCourse(sessionStorage.getItem("idUser") + "/" + idListeCourse + "/deleteListeCourse")
}

function RequestDeleteListeCourse(destination) {
    $.ajax({
        type: "DELETE",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: true,
        success: function(code_html, status, error) {
            RequestDeleteListeCourseSuccess();
        },
        error: function(request, status, error) {
            RequestDeleteListeCourseError(request, status, error);
        }
    });
}

function RequestDeleteListeCourseSuccess() {
    window.location.reload(true); 
}

function RequestDeleteListeCourseError(request, status, error) {
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