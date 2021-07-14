url = sessionStorage.getItem("url");
port = "";

$( document ).ready(function() {
    GetinformationAllUser()
});

/*Begin get information*/

function GetinformationAllUser() {
    RequestGetInfosAllUser(sessionStorage.getItem("idUser") + "/getAllUser");
}

function RequestGetInfosAllUser(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: true,
        success: function(response) {
            ResquestRequestGetInfosAllUserSuccess(response);
        },
        error: function(request, status, error) {
            ResquestRequestGetInfosAllUserError(request, status, error);
        }
    });
}

function ResquestRequestGetInfosAllUserSuccess(response) {
    let tableInfosUtilisateur = $("<table>").addClass("table table-bordered table-dark centerPerso")
    let tHeadInfosUtilisateur = $("<thead>")
    let trInfosUtilisateurHead = $("<tr>")
    let thUseID = $("<th>").attr('scope', 'col').attr('hidden', 'true').text("userID")
    let thUseName = $("<th>").attr('scope', 'col').text("Utilisateur")
    let thUseMail = $("<th>").attr('scope', 'col').text("Adresse mail")
    let thUseDroit = $("<th>").attr('scope', 'col').text("Droit de l'utilisateur")
    let thVisualisation = $("<th>").attr('scope', 'col')
    trInfosUtilisateurHead.append(thUseID, thUseName, thUseMail, thUseDroit, thVisualisation)
    tHeadInfosUtilisateur.append(trInfosUtilisateurHead)

    let tBodyInfosUtilisateur = $("<tbody>")

    for(let i = 0 ; i < response.length ; i++){
        console.log(response[i])
        let trInfosUtilisateurBody = $("<tr>")
        let tdUseId = $("<td>").attr('hidden', 'true').text(response[i].use_id)
        let tdUseName = $("<td>").text(response[i].use_name)
        let tdUseMail = $("<td>").text(response[i].use_mailadress)
        let tdUseDroit = $("<td>").html(response[i].use_droit + " <button type=button class=\"btn  btn-primary btn-visualisationUserFood\" id=SwitchDroitUserID_"+ response[i].use_id +" onclick=SwitchDroitUser(" + response[i].use_id + ")>-></td>")
        let tdVisualisation = $("<td>").html("<button type=button class=\"btn  btn-primary btn-visualisationUserFood\" id=visualisationUserFood_"+ response[i].use_id +" onclick=VisualisationFoodUser(" + response[i].use_id + ")>?</td>")
        trInfosUtilisateurBody.append(tdUseId, tdUseName, tdUseMail, tdUseDroit, tdVisualisation)
        tBodyInfosUtilisateur.append(trInfosUtilisateurBody)
    }

    tableInfosUtilisateur.append(tHeadInfosUtilisateur, tBodyInfosUtilisateur)
    $("#cardBodyPanneauAdminID").append(tableInfosUtilisateur)
}

function ResquestRequestGetInfosAllUserError(request, status, error) {
    $("#btnAddFreezer").prop('disabled', false);

    if (request.status == 570) {
        alert("Nom du frigo déjà utilisé");
    } else if (request.status == 550) {
        alert("Problème base de donnée");
    } else if (request.status == 520) {
        alert("Utilisateur inexistant");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
}
/*End get information*/

/* Begin switch droit user */

function RequestSwitchUserDroit( userIDSwitch, destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: `{"UserIdSwitch": "${userIDSwitch}"}`,
        asynch: true,
        success: function(response) {
            RequestSwitchUserDroitSuccess(response);
        },
        error: function(request, status, error) {
            RequestSwitchUserDroitError(request, status, error);
        }
    });
}

function RequestSwitchUserDroitSuccess(response) {
    window.location.reload(true); 
}

function RequestSwitchUserDroitError(request, status, error) {
    $("#btnAddFreezer").prop('disabled', false);

    if (request.status == 570) {
        alert("Nom du frigo déjà utilisé");
    } else if (request.status == 550) {
        alert("Problème base de donnée");
    } else if (request.status == 520) {
        alert("Utilisateur inexistant");
    } else if (request.status == 400) {
        alert("Bad format");
    } else {
        alert("Error");
    }
}

/* End switch droit user */

function VisualisationFoodUser(userID){
    $("#visualisationUserFood_" + userID).attr('disabled', 'true')

    alert("Id de l'utilisateur : " + userID)

}

function SwitchDroitUser(userIDSwitch){
    $("#SwitchDroitUserID_" + userIDSwitch).attr('disabled', 'true')

    alert("id de l'utilisateur switch = " + userIDSwitch)

    RequestSwitchUserDroit(userIDSwitch, sessionStorage.getItem("idUser") + "/switchDroitUser")
}


