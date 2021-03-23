url = sessionStorage.getItem("url");
port = "";
sessionStorage.setItem("StateDisplay", "List");
//port = ":5000/";


/* Begin Display Foods */
function DisplayList() {
    sessionStorage.setItem("VTpmDisplayFood", "List");
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
        var date = new Date(window.requestFoods[i].foo_date);
        let d = new Date(2010, 7, 5);
        let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date);
        let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);

        corpsHTML =
            corpsHTML +
            "<p align=center class=textColorBlack>" + requestFoods[i].foo_name +
            " | "+ (`${da}-${mo}-${ye}`) +
            " | "+ requestFoods[i].foo_weight +
            "g"+" | "+ requestFoods[i].typ_name +
            " <img src=../image/Type/"+ requestFoods[i].typ_img + " width=4%>" +
            " | "+ "  "  + "<img src=../image/Supression.jpg onclick=ClickImage(" + requestFoods[i].foo_id.toString() + ") width=5%>"
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

 