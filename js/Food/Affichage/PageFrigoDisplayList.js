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
    requestFoods = JSON.parse(JSON.stringify(response));

    //Création des titres du tableau
    var corpsHTML = "";
    corpsHTML = corpsHTML
        +"<table class="+"\""+"table table-bordered table-dark centerPerso"+"\""+">"
        +"<thead>"
        +"<tr>"
        +"<th scope=col>Num</th>"
        +"<th scope=col>Nom</th>"
        +"<th scope=col>Date</th>"
        +"<th scope=col>Poids</th>"
        +"<th scope=col>Sup</th>"
        +"</tr>"
        +"</thead>"
        +"<tbody>";

    var cmpt = 0;
    for (var i = 0; i < requestFoods.length; i++) {
        cmpt++;
        var date = new Date(requestFoods[i].foo_date);
        let d = new Date(2010, 7, 5);
        let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date);
        let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);

        corpsHTML = corpsHTML 
                    +"<tr class=text-break>"
                    +"<th scope=row>"+ cmpt.toString() +"</th>"
                    +"<td>"+ requestFoods[i].foo_name +"</td>"
                    +"<td>"+ (`${da}-${mo}-${ye}`) +"</td>"
                    +"<td>"+ requestFoods[i].foo_weight +"</td>"
                    +"<td>"+ "<button type=button class=\"btn  btn-danger\" onclick=ClickImage(" + requestFoods[i].foo_id.toString() + ")>-</td>"
                    +"</tr>"
    }
    corpsHTML = corpsHTML 
            +"</tbody>"
            +"</table>"
    
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

 