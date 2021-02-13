url = "https://congelateur.herokuapp.com/";
port = "";
//port = ":5000/";

/* Begin Display Foods Type */
function DisplayType() {
    RequestFoodsThisFreezerDisplayType(sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("idFrigo") + "/food");
}

function ProcessDisplayType(){
    var corpsHTML = "";
    var tempTypeArray = [window.requestFoodsDisplayType[0].typ_id];
    var tempTypeNameArray = [window.requestFoodsDisplayType[0].typ_name];
    var tempType = window.requestFoodsDisplayType[0].typ_id;
    //alert("taille entré" + window.requestFoodsDisplayType.length);
    
    for (var i = 0; i < window.requestFoodsDisplayType.length-1; i++) {
        if( tempType !== window.requestFoodsDisplayType[i+1].typ_id){
            tempTypeArray.push(window.requestFoodsDisplayType[i+1].typ_id);
            tempTypeNameArray.push(window.requestFoodsDisplayType[i+1].typ_name);
            tempType = window.requestFoodsDisplayType[i+1].typ_id;
        }
    }
    //alert(tempTypeNameArray[1]);

    
    var tempFoodArray;
    var corpsHTML = "";
    for(var i = 0 ; i < tempTypeArray.length; i++){
        corpsHTML = corpsHTML
            + "<h2 class=centerPerso>"+ tempTypeNameArray[i] +"</h2>"
        for (var x = 0 ; x < window.requestFoodsDisplayType.length ; x++){
            if(tempTypeArray[i] == window.requestFoodsDisplayType[x].typ_id){
                corpsHTML = corpsHTML +
                    "<p align=center class=textColorBlack>" + window.requestFoodsDisplayType[x].foo_name +
                    " | "+ window.requestFoodsDisplayType[x].foo_date +
                    " | "+ window.requestFoodsDisplayType[x].foo_weight +
                    "g"+" | "+ window.requestFoodsDisplayType[x].typ_name +
                    " | "+ "  "  + "<img src=../image/Supression.jpg onclick=ClickImage(" + window.requestFoodsDisplayType[x].typ_id + ") width=5%>"
                    "</p>"
            }
        }
    }
    
    document.getElementById("GenerationFood").innerHTML = corpsHTML;
    
}

function RequestFoodsThisFreezerDisplayType(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestFoodsThisFreezerDisplayTypeSucces(response);
        },
        error: function(request, status, error) {
            RequestFoodsThisFreezerDisplayTypeError(request, status, error);
        }
    });
}

function RequestFoodsThisFreezerDisplayTypeSucces(response) {
    window.requestFoodsDisplayType = JSON.parse(JSON.stringify(response));
    ProcessDisplayType();
}

function RequestFoodsThisFreezerDisplayTypeError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'alliment");
    } else {
        alert("Error");
    }
    return false;
}
/* End Display Foods Type*/