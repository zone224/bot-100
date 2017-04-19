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
            isOpen = false;
            $('.chat-popup').css({
                "animation-name": "popup_close"
            });
            $('.chat-body').animate({opacity:0});
            $('.chat-body').css({"display":"none"});
        }
        else {
            isOpen = true;
            $('.chat-popup').css({
                "animation-name": "popup_open"
            });
            $('.chat-body').css({"animation-name":"show_chat"});
//            $('.chat-body').css({"display":"block"});
        }
    });
});