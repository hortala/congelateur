function SelectionAffichage(typeAffichage){
    if(typeAffichage == "List"){
        DisplayList();
    }
    else if(typeAffichage == "Type"){
        DisplayType();
    }
    else{
        alert("Erreur mode d'affichage");
    }
    return;
}
