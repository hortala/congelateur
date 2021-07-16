url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

$(document).ready(() => {
    Display()
})

/* Begin Display Foods */
function Display() {
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
    console.log("get ok")
    requestFoods = JSON.parse(JSON.stringify(response));

    console.log(requestFoods[0])

    let tableGetListeCourse = $("<table>").addClass("table table-bordered table-dark centerPerso")
    let tHeadGetListeCourse = $("<thead>")
    let trGetListeCourseHead = $("<tr>")
    let thListeID = $("<th>").attr('scope', 'col').attr('hidden', 'true').text("listeID")
    let thListeElementName = $("<th>").attr('scope', 'col').text("Nom")
    let thPoidsElement = $("<th>").attr('scope', 'col').text("Poids")
    let thDescriptionElement = $("<th>").attr('scope', 'col').text("Description")
    let thSupressionUser = $("<th>").attr('scope', 'col')
    trGetListeCourseHead.append(thListeID, thListeElementName, thPoidsElement, thDescriptionElement, thSupressionUser)
    tHeadGetListeCourse.append(trGetListeCourseHead)

    let tBodyListeCourse = $("<tbody>")

    for(let i = 0 ; i < response.length ; i++){
        let trInfosGetListeCouseBody = $("<tr>")
        let tdListeID = $("<td>").attr('hidden', 'true').text(response[i].lis_id)
        let tdElementName = $("<td>").text(response[i].lis_name)
        let tdPoidsElement = $("<td>").text(response[i].lis_poids)
        let tdListDescription = $("<td>").html(response[i].lis_description)
        let tdSupressionUser = $("<td>").html("<button type=button class=\"btn  btn-danger btnDeleteFood\" id=DeleteUserID_"+ response[i].use_id +" onclick=DeleteUser(" + response[i].use_id + ")>-</td>")
        trInfosGetListeCouseBody.append(tdListeID, tdElementName, tdPoidsElement, tdListDescription, tdSupressionUser)
        tBodyListeCourse.append(trInfosGetListeCouseBody)
    }

    tableGetListeCourse.append(tHeadGetListeCourse, tBodyListeCourse)
    $("#displayListeCouseID").append(tableGetListeCourse)
}

function RequestFoodsGetElementListeCourseError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}

/* End Display Foods */

 