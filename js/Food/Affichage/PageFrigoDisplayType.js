url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";

/* Begin Display Foods Type */
function DisplayType() {
    $("#btnDisplayListFood").prop('disabled', false);
    $("#btnDisplayTypeFood").prop('disabled', true);
    sessionStorage.setItem("VTpmDisplayFood", "Type");
    RequestFoodsThisFreezerDisplayType(sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("idFrigo") + "/food");
}

function ProcessDisplayType(){
    var corpsHTML = "";
    var tempTypeArray = [window.requestFoodsDisplayType[0].typ_id];
    var tempTypeNameArray = [window.requestFoodsDisplayType[0].typ_name];
    var tempTypeImgArray = [window.requestFoodsDisplayType[0].typ_img];
    var tempType = window.requestFoodsDisplayType[0].typ_id;
    
    for (var i = 0; i < window.requestFoodsDisplayType.length-1; i++) {
        if( tempType !== window.requestFoodsDisplayType[i+1].typ_id){
            tempTypeArray.push(window.requestFoodsDisplayType[i+1].typ_id);
            tempTypeNameArray.push(window.requestFoodsDisplayType[i+1].typ_name);
            tempTypeImgArray.push(window.requestFoodsDisplayType[i+1].typ_img);
            tempType = window.requestFoodsDisplayType[i+1].typ_id;
        }
    }
    
    var tempFoodArray;
    var corpsHTML = "";
    for(var i = tempTypeArray.length-1 ; i >= 0; i--){
        //Création de la partie image et de la partie titre
        corpsHTML = corpsHTML
            +"<div class="+"\""+"card centerPerso"+"\""+">"
            +"<div class=centerPerso>"
            +"<img src=../image/Type/"+ tempTypeImgArray[i] +" width=40% alt="+tempTypeNameArray[i]+"></img>"
            +"</div>"
            +"<div id=card-body>"
            +"<h3 class="+"\""+"card-title textBold textColorBlack"+"\""+"><u>"+ tempTypeNameArray[i] +"</u></h3></div>";

        //Création des titres du tableau
        corpsHTML = corpsHTML
            +"<table class="+"\""+"table table-bordered table-dark"+"\""+">"
            +"<thead>"
            +"<tr>"
            +"<th scope=col>N°</th>"
            +"<th scope=col>Nom</th>"
            +"<th scope=col>Date</th>"
            +"<th scope=col>Poids</th>"
            +"<th scope=col>Sup</th>"
            +"</tr>"
            +"</thead>"
            +"<tbody>";
        var cmpt = 0;
        for (var x = 0 ; x < window.requestFoodsDisplayType.length ; x++){
            if(tempTypeArray[i] == window.requestFoodsDisplayType[x].typ_id){
                var date = new Date(window.requestFoodsDisplayType[x].foo_date);
                let ye = new Intl.DateTimeFormat('fr', { year: '2-digit' }).format(date);
                let mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(date);
                let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);
                
                cmpt++;
                corpsHTML = corpsHTML 
                    +"<tr class=text-break>"
                    +"<th scope=row>"+ cmpt.toString() +"</th>"
                    +"<td>"+ window.requestFoodsDisplayType[x].foo_name +"</td>"
                    +"<td>"+ (`${da}-${mo}-${ye}`) +"</td>"
                    +"<td>"+ window.requestFoodsDisplayType[x].foo_weight +"</td>"
                    +"<td>"+ "<button type=button class=\"btn  btn-danger btnDeleteFood\" onclick=DeleteFood(" + requestFoodsDisplayType[x].foo_id.toString() + ")>-</button>"
                    +"</tr>"
            }
        }
        cmpt = 0;
        corpsHTML = corpsHTML 
            +"</tbody>"
            +"</table>"
            +"</div>"
            +"</div>"
            +"<div class=marginBot5></div>";
    }
    
    document.getElementById("GenerationFood").innerHTML = corpsHTML;
    return;
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