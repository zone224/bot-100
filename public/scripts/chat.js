//var isOpen = false;
//function popupToggle(){
//    var popup = document.getElementById("chat-popup");
//    if(isOpen){
//        popup.style.animationName = "popup_close";
//        isOpen = false;
//    }else{
//        popup.style.animationName = "popup_open";
//        isOpen = true;
//    }
//}

$(document).ready(function () {
    var isOpen = false;
    $('.chat-header').click(function () {
        if (isOpen) {
            $('.chat-popup').css({
                "animation-name": "popup_close"
            });
            isOpen = false;
        }
        else {
            isOpen = true;
            $('.chat-popup').css({
                "animation-name": "popup_open"
            });
        }
    });
});