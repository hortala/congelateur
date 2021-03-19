//sessionStorage.setItem("url", "http://@localhost:5000/");
sessionStorage.setItem("url", "https://congelateur.herokuapp.com/");
url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

destinationConnexion = "connexion/client";

function Connexion() {
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
    alert("Connexion réussis");
    var data = JSON.parse(JSON.stringify(response));
    sessionStorage.setItem("idUser", data.id);
    window.location.href = 'html/ConnexionFrigo.html'
    return;
    //return RequestFindfrigoUser(sessionStorage.getItem("idUser") + "/freezer");;
}

function ResquestConnexionError(request, status, error) {
    if (request.status == 560) {
        alert("Mauvaise Adresse mail")
    } else if (request.status == 570) {
        alert("Mauvais mot de passe");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
    return false;
}

function GoCreateAccount() {
    document.location.href = "html/CreationCompte.html";
}
