url = sessionStorage.getItem("url");
port = "";

function AjouterListeCourse(){
    DisplayModalAddListeCourse()
}

/* Begin modal */

function DisplayModalAddListeCourse() {
    var modal = document.getElementById("modalAddListeCourse"); // Get the modal    

    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload(false);
        }
    }
}

/* End modal */

function SendAddListeCourse (){
    $("#btnAddListeCourseID").prop("disabled", true);
    let nameListeCourse = $("#nomListeCourseID").val()

    RequestCreateListeCourse(nameListeCourse, sessionStorage.getItem("idUser") + "/addListeCourse")
}

function RequestCreateListeCourse(nameListeCourse, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nameListeCourse": "${nameListeCourse}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            RequestCreateListeCourseSuccess();
        },
        error: function(request, status, error) {
            RequestCreateListeCourseError(request, status, error);
        }
    });
}

function RequestCreateListeCourseSuccess() {
    $("#btnAddListeCourseID").prop("disabled", false);
    alert("Liste de course crée");        
}

function RequestCreateListeCourseError(request, status, error) {
    $("#btnAddElementID").prop("disabled", false);
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
