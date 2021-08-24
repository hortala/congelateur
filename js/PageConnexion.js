url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

destinationConnexion = "connexion/client";

function Connexion() {
    $("#btnConnexion").prop('disabled', true);
    VerificationConnexion(document.getElementById('mailadress').value, document.getElementById('password').value);
}

function VerificationConnexion(mailadress, password) {
    if (!VerificationChamp(mailadress, password)) {
        return false;
    }
    RequestConnexion(mailadress, password);
}

function VerificationChamp(mailadress, password) {
    if (!isNaN(mailadress) || !isNaN(password)) {
        if (!isNaN(mailadress)) {
            alert("Champ Adresse mail non remplie");
        } else {
            alert("Champ mot de passe non remplie");
        }
        $("#btnConnexion").prop('disabled', false);
        return false
    }
    return true;
}

function RequestConnexion(mailadress, password) {
    $.ajax({
        type: "POST",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"mailadress": "${mailadress}", "mdp": "${password}"}`,
        asynch: true,
        success: function(response) {
            return ResquestConnexionSuccess(response);
        },
        error: function(request, status, error) {
            return ResquestConnexionError(request, status, error);
        }
    });
}

function ResquestConnexionSuccess(response) {
    var data = JSON.parse(JSON.stringify(response));

    sessionStorage.setItem("droit", data.use_droit)
    sessionStorage.setItem("droitSuperUser", data.use_droitsuperuser)
    sessionStorage.setItem("idUser", data.use_id);
    sessionStorage.setItem("nameUser", data.use_name);
    sessionStorage.setItem("mailAdress", data.use_mailadress);

    $("#btnConnexion").prop('disabled', false)

    window.location.href = 'html/ConnexionFrigo.html'
    return;
}

function ResquestConnexionError(request, status, error) {
    $("#btnConnexion").prop('disabled', false)
    if(request.status == 400){
        alert("Identifiant ou mot de passe érroné")
    }
    else if (request.status == 560) {
        alert("Identifiant ou mot de passe érroné")
    } else if (request.status == 570) {
        alert("Identifiant ou mot de passe érroné")
    } else if (request.status == 580) {
        alert("Vous n'avez pas les droits pour utiliser cette application");
    } else {
        alert("Error");
    }
    return false;
}

function GoCreateAccount() {
    
    document.location.href = "html/CreationCompte.html";
}
