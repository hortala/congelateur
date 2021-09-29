url = sessionStorage.getItem("url");
port = "";

$(document).ready(() => {
    DisplayListeCoursePerso()
})

function DisplayListeCoursePerso(){
    RequesGetListeCourse(sessionStorage.getItem("idUser") + "/getListeCourse")
}

function DisplayListeCoursePartager(){

}

/* récupère toutes les informations des listes de course de l'utilisateur */
function RequesGetListeCourse(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestRequesGetListeCourseSucces(response);
        },
        error: function(request, status, error) {
            RequestRequesGetListeCourseError(request, status, error);
        }
    });
}

function RequestRequesGetListeCourseSucces(response) {
    response = JSON.parse(JSON.stringify(response));
    if(response == [] && data.lenght == 0){
        alert("Vous n'avez aucune liste de course paramétrée")
        return false
    }
    else{
        console.log(response)
        BuildListeCourse(response)
    }
    
}

function RequestRequesGetListeCourseError(request, status, error) {
    if (request.status == 510) {
        BuildTableDisplay(false, null, sessionStorage.getItem("idUser"), "Ma Liste")
    } else {
        alert("Error");
    }
    return false;
}

function BuildListeCourse(data){
    let tBodyListeCourse = $("<tbody>")
    data.forEach(element => {
        // Conception du header et du body 
        let divTitreListeCouse = $("<div>").html("<h2 id=titreListeID>"+element.ulc_name+"</h2>")
        let buttunDeleteListeCourse = $("<button>").addClass("btn  btn-danger").attr('id', 'buttonDeleteListeCourseID_' + element.ulc_id).attr('onClick', 'DeleteListeCourse('+element.ulc_id+')').html("Suprimer la liste de course")
        // mettre des imput hidden pour passer les infos
        let tableGetListeCourse = $("<table>").attr('id', 'tableListeCourseID_' + element.ulc_id).addClass("table table-bordered table-dark centerPerso")
        let tHeadGetListeCourse = $("<thead>")
        let trGetListeCourseHead = $("<tr>")
        let thListeID = $("<th>").attr('scope', 'col').attr('hidden', 'true').text("listeID")
        let thListeElementName = $("<th>").attr('scope', 'col').text("Nom")
        let thPoidsElement = $("<th>").attr('scope', 'col').text("Poids")
        let thDescriptionElement = $("<th>").attr('scope', 'col').text("Description")
        let thSupressionUser = $("<th>").attr('scope', 'col').html("<button type=button class=\"btn  btn-success btnAddElementCourse \" onclick=AddElementDisplayModal("+element.ulc_id+")>+</td>")
        trGetListeCourseHead.append(thListeID, thListeElementName, thPoidsElement, thDescriptionElement, thSupressionUser)
        tHeadGetListeCourse.append(trGetListeCourseHead)

        tableGetListeCourse.append(tHeadGetListeCourse, tBodyListeCourse)
        $("#displayListeCouseID").append(divTitreListeCouse, buttunDeleteListeCourse, tableGetListeCourse)
    });

    RequesGetListeCourseElement(sessionStorage.getItem("idUser") + "/getListeCourseElement")
}

/* Recupère les elements des liste de course */
function RequesGetListeCourseElement(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestRequesGetListeCourseElementSucces(response);
        },
        error: function(request, status, error) {
            RequestRequesGetListeCourseElementError(request, status, error);
        }
    });
}

function RequestRequesGetListeCourseElementSucces(response) {
    response = JSON.parse(JSON.stringify(response));
    console.log(response)
    if(response == [] && data.lenght == 0){
        return false
    }
    else{
        BuildListeCourseElement(response)
    }
    
}

function RequestRequesGetListeCourseElementError(request, status, error) {
    if (request.status == 510) {
        BuildTableDisplay(false, null, sessionStorage.getItem("idUser"), "Ma Liste")
    } else {
        alert("Error");
    }
    return false;
}

function BuildListeCourseElement(response){
    
    for(let i = 0 ; i < response.length ; i++){
        let trInfosGetListeCouseBody = $("<tr>")
        let tdListeID = $("<td>").attr('hidden', 'true').text(response[i].lis_id)
        let tdElementName = $("<td>").text(response[i].lis_name)
        let tdPoidsElement = $("<td>").text(response[i].lis_poids)
        let tdListDescription = $("<td>").html(response[i].lis_description)
        let tdSupressionUser = $("<td>").html("<button type=button class=\"btn  btn-danger btnDeleteElementListCourse\" id=DeleteElementListeCourseID_"+ response[i].lis_id +" onclick=DeleteElementListeCouse(" + response[i].lis_id + ")>-</td>")
        trInfosGetListeCouseBody.append(tdListeID, tdElementName, tdPoidsElement, tdListDescription, tdSupressionUser)
        $("#tableListeCourseID_" + response[i].ulc_id).append(trInfosGetListeCouseBody)
    }
}
