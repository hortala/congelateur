url = "http://@localhost";
port = ":5000/";

/* Begin Display Foods */
function DisplayList() {
    RequestFoodsThisFreezerDisplayList(sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("idFrigo") + "/food");
}

function RequestFoodsThisFreezerDisplayList(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestFoodsThisFreezerDisplayListSucces(response);
        },
        error: function(request, status, error) {
            RequestFoodsThisFreezerDisplayListError(request, status, error);
        }
    });
}

function RequestFoodsThisFreezerDisplayListSucces(response) {
    window.requestFoods = JSON.parse(JSON.stringify(response));
    var corpsHTML = "";
    for (var i = 0; i < window.requestFoods.length; i++) {

        corpsHTML =
            corpsHTML +
            "<p align=center class=textColorBlack>" + requestFoods[i].foo_name +
            " | "+ requestFoods[i].foo_date +
            " | "+ requestFoods[i].foo_weight +
            "g"+" | "+ requestFoods[i].typ_name +
            " <img src=../image/Type/"+ requestFoods[i].typ_img + " width=4%>" +
            " | "+ "  "  + "<img src=../image/Supression.jpg onclick=ClickImage(" + i + ") width=5%>"
            "</p>" 
    }
    document.getElementById("GenerationFood").innerHTML = corpsHTML;
}

function RequestFoodsThisFreezerDisplayListError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}
/* End Display Foods */

DisplayList();
 