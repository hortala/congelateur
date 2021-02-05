url = "http://192.168.71.128";
port = ":5000/";
destinationConnexion = "connexion/client";

function Connexion() {
    VerificationConnexion(document.getElementById('login').value, document.getElementById('password').value);
}

function VerificationConnexion(login, password) {
    if (!VerificationChamp(login, password)) {
        return false;
    }

    // Chiffrement du mot de passe
    RequestConnexion(login, password);
}

function VerificationChamp(login, password) {
    if (!isNaN(login) || !isNaN(password)) {
        if (!isNaN(login)) {
            alert("Champ login non remplie");
        } else {
            alert("Champ mot de passe non remplie");
        }
        return false
    }
    return true;
}

function RequestConnexion(login, password) {
    $.ajax({
        type: "POST",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"login": "${login}", "mdp": "${password}"}`,
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
    return RequestFindMaisonUser(sessionStorage.getItem("idUser") + "/maison");;
}

function ResquestConnexionError(request, status, error) {
    if (request.status == 560) {
        alert("Mauvais Login")
    } else if (request.status == 570) {
        alert("Mauvais mot de passe");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
    return false;
}

function RequestFindMaisonUser(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: true,
        success: function(response) {
            ResquestCreateMaisonSuccess(response);
        },
        error: function(request, status, error) {
            ResquestCreateMaisonError(request, status, error);
        }
    });
}

function ResquestCreateMaisonSuccess(response) {
    alert("Maison trouvée");
    window.location.href = '../html/Maison/ConnexionMaison.html';
    return true;
}

function ResquestCreateMaisonError(request, status, error) {
    if (request.status == 520) {
        window.location.href = '../html/Creation/CreationMaison.html';
    } else {
        alert("Error");
    }

    return false;
}

function GoCreateAccount() {
    document.location.href = "../congelateur/html/Creation/CreationCompte.html";
}