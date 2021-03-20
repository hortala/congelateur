url = sessionStorage.getItem("url");
port = "";

function UpdateInfo(repBtn){
    if(repBtn.id == "btnName"){
        UpdateName();
    }
    else if(repBtn.id == "btnMaildresse"){
        UpdateMailAdress();
    }
    else if(repBtn.id == "btnPassword"){
        UpdatePassword();
    }
    else{
        alert("error");
    }

    return;
}

function UpdateName(){
    RequestUpateName(document.getElementById("UseNameInput").value, sessionStorage.getItem("idUser")+"/name");   
    return; 
}

function RequestUpateName(useName, destinationConnexion) {
    $.ajax({
        type: "PUT",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"nomUser": "${useName}"}`,
        asynch: true,
        success: function(response) {
            return ResquestUpateNameSuccess(response);
        },
        error: function(request, status, error) {
            return ResquestUpateNameError(request, status, error);
        }
    });
}

function ResquestUpateNameSuccess(response) {
    sessionStorage.setItem("nameUser", document.getElementById("UseNameInput").value);
    window.location.reload(true); 
    return;
}

function ResquestUpateNameError(request, status, error) {
    if (request.status == 560) {
        alert("Mauvaise Adresse mail")
    } else if (request.status == 520) {
        alert("utilisateur inexistant");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
    return false;
}

function UpdateMailAdress(){
    RequestUpateMailAdress(document.getElementById("MailAdressInput").value, sessionStorage.getItem("idUser")+"/mailAdress");
   return;
}

function RequestUpateMailAdress(mailAdress, destinationConnexion) {
    $.ajax({
        type: "PUT",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"mailAdress": "${mailAdress}"}`,
        asynch: true,
        success: function(response) {
            return ResquestUpateMailAdressSuccess(response);
        },
        error: function(request, status, error) {
            return ResquestUpateMailAdressError(request, status, error);
        }
    });
}

function ResquestUpateMailAdressSuccess(response) {
    sessionStorage.setItem("mailAdress", document.getElementById("MailAdressInput").value);
    window.location.reload(true); 
    return;
}

function ResquestUpateMailAdressError(request, status, error) {
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

function UpdatePassword(){
    VerificationMDP(document.getElementById("OldMDP").value);
    return;
}

function VerificationMDP(mdp){
    RequestVerifMDP(mdp, sessionStorage.getItem("idUser") + "/mdp");
    return;
}

function RequestVerifMDP(mdp, destinationConnexion) {
    $.ajax({
        type: "POST",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"mdp": "${mdp}"}`,
        asynch: true,
        success: function(response) {
            return ResquestVerifMDPSuccess(response);
        },
        error: function(request, status, error) {
            return ResquestVerifMDPError(request, status, error);
        }
    });
}

function ResquestVerifMDPSuccess(response) {
    if(document.getElementById("NewMdp1").value == document.getElementById("NewMdp2").value){
        RequestUpateMDP(document.getElementById("NewMdp2").value, sessionStorage.getItem("idUser") + "/mdp");
        alert("Mot de passe mis à jour");
        window.location.reload(true); 
    }
    else{
        alert("Mot de passe incorect");
    }

    return;
}

function ResquestVerifMDPError(request, status, error) {
    if (request.status == 560) {
        alert("Mauvaise Adresse mail")
    } else if (request.status == 520) {
        alert("Mauvais mot de passe");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
    return false;
}

function RequestUpateMDP(mdp,destinationConnexion) {
    $.ajax({
        type: "PUT",
        url: url + port + destinationConnexion,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"newPassword": "${mdp}"}`,
        asynch: true,
        success: function(response) {
            return ResquestUpateMDPSuccess(response);
        },
        error: function(request, status, error) {
            return ResquestUpateMDPError(request, status, error);
        }
    });
}

function ResquestUpateMDPSuccess(response) {
    window.location.reload(true); 
    return;
}

function ResquestUpateMDPError(request, status, error) {
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




corpsHTMLInputUseName = "<input type=text class=form-control id=UseNameInput value="+ sessionStorage.getItem("nameUser") +" aria-label=Username aria-describedby=basic-addon1>";
corpsHTMLInputMailAdress = "<input type=text class=form-control id=MailAdressInput value="+ sessionStorage.getItem("mailAdress") +" aria-label=MailAdress aria-describedby=basic-addon1>";
document.getElementById("UseName").innerHTML = corpsHTMLInputUseName;
document.getElementById("MailAdress").innerHTML = corpsHTMLInputMailAdress;
