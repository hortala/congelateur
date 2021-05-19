url = sessionStorage.getItem("url");
port = "";
//port = ":5000/";


//Ouverture du modal pour renseigner l'aliments a crée
function HistorisationSupressionFood(){
    DisplayModalHistorisationSupressionFood();
}

/* Begin Modal */

function DisplayModalHistorisationSupressionFood() {
    var modal = document.getElementById("modalHistorisationAliments"); // Get the modal

    HostorisationSupression()
    

    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload(false);
        }
    }
}

function HostorisationSupression(){
    RequestHystorisationFood(sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") + "/historisation");
}

function RequestHystorisationFood(destination) {
    $.ajax({
        type: "GET",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestHystorisationFoodSucces(response);
        },
        error: function(request, status, error) {
            RequestHystorisationFoodError(request, status, error);
        }
    });
}

function RequestHystorisationFoodSucces(response) {
    data = JSON.parse(JSON.stringify(response));


    var corpsHTML = "";
    corpsHTML = corpsHTML
        +"<table class="+"\""+"table table-bordered table-dark centerPerso"+"\""+">"
        +"<thead>"
        +"<tr>"
        +"<th scope=col>Num</th>"
        +"<th scope=col>Nom</th>"
        +"<th scope=col>Date</th>"
        +"<th scope=col>Poids</th>"
        +"<th scope=col>Restaurer</th>"
        +"</tr>"
        +"</thead>"
        +"<tbody>";

    var cmpt = 0;
    for (var i = 0; i < data.length; i++) {
        cmpt++;
        var date = new Date(data[i].hsf_date);
        let d = new Date(2010, 7, 5);
        let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date);
        let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);

        corpsHTML = corpsHTML 
                    +"<tr class=text-break>"
                    +"<th scope=row>"+ cmpt.toString() +"</th>"
                    +"<td>"+ data[i].hsf_name +"</td>"
                    +"<td>"+ (`${da}-${mo}-${ye}`) +"</td>"
                    +"<td>"+ data[i].hsf_weight +"</td>"
                    +"<td>"+ "<button type=button class=\"btn  btn-primary btnRestaurationFood\" onclick=RestaurationFood(" + data[i].hsf_id.toString() + ")>+</td>"
                    +"</tr>"
    }
    corpsHTML = corpsHTML 
            +"</tbody>"
            +"</table>"

    document.getElementById("AffichageHistorisationFood").innerHTML = corpsHTML;
    return true;
}

function RequestHystorisationFoodError(request, status, error) {
    if (request.status == 520) {
        alert("Pas d'aliment suprimé");
    } else {
        alert("Error");
    }
    return false;
}
/* End Modal */

function RestaurationFood(idHsf){
    $(".btnRestaurationFood").prop('disabled', true);
    RequestRestaurationFood(sessionStorage.getItem("idUser") +"/"+ sessionStorage.getItem("idFrigo") +"/"+ idHsf + "/restauration")
}

function RequestRestaurationFood(destination) {
    $.ajax({
        type: "POST",
        url: url + port + destination,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        asynch: false,
        success: function(response) {
            RequestRestaurationFoodSucces(response);
        },
        error: function(request, status, error) {
            RequestRestaurationFoodError(request, status, error);
        }
    });
}

function RequestRestaurationFoodSucces(response) {
    $(".btnRestaurationFood").prop('disabled', false);
    alert("Aliment restauré")
}

function RequestRestaurationFoodError(request, status, error) {
    $(".btnRestaurationFood").prop('disabled', false);
    
    if (request.status == 520) {
        alert("Pas d'aliment suprimé");
    } else {
        alert("Error");
    }
    return false;
}