$( document ).ready(function() {
    LoadAdminOption()
});

function LoadAdminOption(){
    if(sessionStorage.getItem("droitSuperUser") == 'true'){
        let buttonPanneauAdmin = $("<a>").addClass("btn btn-secondary").attr('id', 'buttonPanneauAdminID').attr('type', 'submit').attr('href', 'Admin/PanneauAdministration.html').html("Panneau administrateur")
        $(".divBoutonAdministrateur").append(buttonPanneauAdmin)
        console.log("Boutton admin activé")
    }
}



