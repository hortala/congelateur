url = "https://congelateur.herokuapp.com/";
port = "";
//port = ":5000/";

destination = "user";

function SendInformation() {
    var nom = document.getElementById("nom").value;
    var adressMail = document.getElementById("adresseMail").value;
    var pw1 = document.getElementById("password1").value;
    var pw2 = document.getElementById("password2").value;

    if (Verification(nom, pw1, pw2, adressMail)) {
        RequestCreateUser(nom, pw1, adressMail);
    } else {
        return;
    }
}

function Verification(nom, pw1, pw2, adressMail) {
    if (!isNaN(nom) || !isNaN(pw1) || !isNaN(pw2) || !isNaN(adressMail)) { // Si un des champs est vide
        if (!isNaN(nom)) { // Nom non remplie
            alert("Champ Nom non remplie");
        }
        if (!isNaN(pw1) || !isNaN(pw2)) { // Si le champ vide ce trouve dans mot de passe ou confirmation
            if (!isNaN(pw1)) { // Mot de passe non remplie
                alert("Champ mot de passe non remplie");
            } else { // Confirmation de mot de passe non remplie
                alert("Champ confirmation de mot de passe non remplie");
            }
        }
        if (!isNaN(adressMail)) {
            alert("Champ adresse mail non remplie");
        }
        return false;
    } else if (pw1 != pw2) {
        alert("mot de passe diférent");
        return false;
    } else if (pw1 == nom) {
        alert("le Nom est identique au mots de passe veuillez changer");
        return false;
    } else {
        return true;
    }
}

function RequestCreateUser(nom, pw1, adressMail) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomUser": "${nom}", "mdp": "${pw1}", "mailadress": "${adressMail}"}`,
        asynch: true,
        success: function(code_html, status, error) {
            ResquestCreateUserSuccess();
        },
        error: function(request, status, error) {
            ResquestCreateUserError(request, status, error);
        }
    });
}

function ResquestCreateUserSuccess() {
    document.location.href = "../index.html";
    alert("Compte crée");
}

function ResquestCreateUserError(request, status, error) {
    if (request.status == 570) {
        alert("Email déja utilisé");
    } else if (request.status == 550) {
        alert("Erreur base de donnée");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
}