//sessionStorage.setItem("url", "http://@localhost:5000/");
sessionStorage.setItem("url", "https://congelateur.herokuapp.com/");

/*
$(document).ready(function(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }    
})*/


/**
 * Créé les notifications en focntion de la liste
 * @param List<AppNotification> notifListJSON: Liste des notifications.
 */
/*
 function RiseNotification(notifListJSON) {
    // Si des notifs sont présentes
    if (notifListJSON != null && notifListJSON.length > 0) {
        notifListJSON.forEach(function (element) {
            switch (element.Type) {
                case "success":
                    toastr.success(element.Message)
                    break;
                case "info":
                    toastr.info(element.Message)
                    break;
                case "error":
                    toastr.error(element.Message)
                    break;
                case "warning":
                    toastr.warning(element.Message)
                    break;
                default:
                    toastr.info(element.Message)
            }
        });
    }
}
*/

