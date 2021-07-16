url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

$(document).ready(() => {
    DisplayListeCoursePerso()
    DisplayListeCoursePartager()
})

/* Begin Display Element */
function DisplayListeCoursePerso() {
    RequestFoodsGetElementListeCourse(sessionStorage.getItem("idUser") + "/getElementListeCourse");
}

function RequestFoodsGetElementListeCourse(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestFoodsGetElementListeCourseSucces(response);
        },
        error: function(request, status, error) {
            RequestFoodsGetElementListeCourseError(request, status, error);
        }
    });
}

function RequestFoodsGetElementListeCourseSucces(response) {
    response = JSON.parse(JSON.stringify(response));
    BuildTableDisplay(true, response, sessionStorage.getItem("idUser"), "Ma Liste")
}

function RequestFoodsGetElementListeCourseError(request, status, error) {
    if (request.status == 510) {
        BuildTableDisplay(false, null, sessionStorage.getItem("idUser"), "Ma Liste")
    } else {
        alert("Error");
    }
    return false;
}

function BuildTableDisplay(buildAll, response, idUserAddElement, TitreTable){
    if(buildAll == true){
        // Conception du header et du body 
        let divTitreListeCouse = $("<div>").html("<h2>"+TitreTable+"</h2>")
        let tableGetListeCourse = $("<table>").addClass("table table-bordered table-dark centerPerso")
        let tHeadGetListeCourse = $("<thead>")
        let trGetListeCourseHead = $("<tr>")
        let thListeID = $("<th>").attr('scope', 'col').attr('hidden', 'true').text("listeID")
        let thListeElementName = $("<th>").attr('scope', 'col').text("Nom")
        let thPoidsElement = $("<th>").attr('scope', 'col').text("Poids")
        let thDescriptionElement = $("<th>").attr('scope', 'col').text("Description")
        let thSupressionUser = $("<th>").attr('scope', 'col').html("<button type=button class=\"btn  btn-success btnAddElementCourse\" onclick=AddElementDisplayModal("+idUserAddElement+")>+</td>")
        trGetListeCourseHead.append(thListeID, thListeElementName, thPoidsElement, thDescriptionElement, thSupressionUser)
        tHeadGetListeCourse.append(trGetListeCourseHead)

        let tBodyListeCourse = $("<tbody>")
        for(let i = 0 ; i < response.length ; i++){
            let trInfosGetListeCouseBody = $("<tr>")
            let tdListeID = $("<td>").attr('hidden', 'true').text(response[i].lis_id)
            let tdElementName = $("<td>").text(response[i].lis_name)
            let tdPoidsElement = $("<td>").text(response[i].lis_poids)
            let tdListDescription = $("<td>").html(response[i].lis_description)
            let tdSupressionUser = $("<td>").html("<button type=button class=\"btn  btn-danger btnDeleteElementListCourse\" id=DeleteElementListeCourseID_"+ response[i].lis_id +" onclick=DeleteElementListeCouse(" + response[i].lis_id + ")>-</td>")
            trInfosGetListeCouseBody.append(tdListeID, tdElementName, tdPoidsElement, tdListDescription, tdSupressionUser)
            tBodyListeCourse.append(trInfosGetListeCouseBody)
        }
    
        tableGetListeCourse.append(tHeadGetListeCourse, tBodyListeCourse)
        $("#displayListeCouseID").append(divTitreListeCouse, tableGetListeCourse)
    }
    else{
        // Conception du Header seulement
        alert("Pas d'element");
        let tableGetListeCourse = $("<table>").addClass("table table-bordered table-dark centerPerso")
        let tHeadGetListeCourse = $("<thead>")
        let trGetListeCourseHead = $("<tr>")
        let thListeID = $("<th>").attr('scope', 'col').attr('hidden', 'true').text("listeID")
        let thListeElementName = $("<th>").attr('scope', 'col').text("Nom")
        let thPoidsElement = $("<th>").attr('scope', 'col').text("Poids")
        let thDescriptionElement = $("<th>").attr('scope', 'col').text("Description")
        let thSupressionUser = $("<th>").attr('scope', 'col').html("<button type=button class=\"btn  btn-success btnAddElementCourse\" onclick=AddElementDisplayModal("+idUserAddElement+")>+</td>")
        trGetListeCourseHead.append(thListeID, thListeElementName, thPoidsElement, thDescriptionElement, thSupressionUser)
        tHeadGetListeCourse.append(trGetListeCourseHead)

        tableGetListeCourse.append(tHeadGetListeCourse)
        $("#displayListeCouseID").append(tableGetListeCourse)
    }
}

function DisplayListeCoursePartager(){

}

/* End Display Element */

 