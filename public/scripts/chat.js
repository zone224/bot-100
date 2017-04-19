var isOpen = false;
function popupToggle(){
    var popup = document.getElementById("chat-popup");
    if(isOpen){
        popup.style.animationName = "popup_close";
        isOpen = false;
    }else{
        popup.style.animationName = "popup_open";
        isOpen = true;
    }
}