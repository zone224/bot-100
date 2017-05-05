var params = {},
    watson = 'Watson',
    context;


var lat;
var long;
getLocation();


function userMessage(message) {
    
    params.text = message;
    if (context) {
        params.context = context;    
    }
    var xhr = new XMLHttpRequest();
    var uri = '/api/watson';
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        // Verify if there is a success code response and some text was sent
        if (xhr.status === 200 && xhr.responseText) {
            var response = JSON.parse(xhr.responseText);
            text = response.output.text; // Only display the first response
            context = response.context; // Store the context for next round of questions
            console.log("Got response from Ana: ", JSON.stringify(response));
           
            if(response['context']['map']){
                displayMaps(watson);
                delete response['context']['map'];
                console.log("Mapa");
            }
            
            if (response['context']['uri'] && response['context']['uri'].length > 0) {
                displaySpotify(response['context']['uri'], watson);
                delete response['context']['musica'];
                delete response['context']['uri'];
                
            }
            
            
            
            for (var txt in text) {
                displayMessage(text[txt], watson);
            }

        }
        else {
            console.error('Server error for Conversation. Return status of: ', xhr.statusText);
            displayMessage("Putz, deu um tilt aqui. Você pode tentar novamente.", watson);
        }
    };
    xhr.onerror = function () {
        console.error('Network error trying to send message!');
        displayMessage("Ops, acho que meu cérebro está offline. Espera um minutinho para continuarmos por favor.", watson);
    };
    console.log(JSON.stringify(params));
    xhr.send(JSON.stringify(params));
}

function newEvent(event) {
    // Only check for a return/enter press - Event 13
    if (event.which === 13 || event.keyCode === 13) {
        var userInput = document.getElementById('chatInput');
        text = userInput.value; // Using text as a recurring variable through functions
        text = text.replace(/(\r\n|\n|\r)/gm, ""); // Remove erroneous characters
        // If there is any input then check if this is a claim step
        // Some claim steps are handled in newEvent and others are handled in userMessage
        if (text) {
            // Display the user's text in the chat box and null out input box
            //            userMessage(text);
            displayMessage(text, 'user');
            userInput.value = '';
            userMessage(text);
        }
        else {
            // Blank user message. Do nothing.
            console.error("No message.");
            userInput.value = '';
            return false;
        }
    }
}

function displayMessage(text, user) {
    var chat_body = document.getElementById('chat-body');
    var bubble = document.createElement('div');
    bubble.setAttribute("class", "bubble");
    if (user == "user") {
        bubble.className += " user";
    }
    else {
        bubble.className += " watson";
    }
    bubble.innerHTML = text;
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight;
}

function displayMaps(watson) {
    var chat_body = document.getElementById('chat-body');
    var bubble = document.createElement('div');
        bubble.innerHTML += '<iframe width = "350px" height = "170px" frameborder = "0" style="border:0;" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzFkRQ3y5QUWILwMttySU7MFGS-mWakOw&q=UFABC&zoom=12" allowfullscreen></iframe>';
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight; // Move chat down to the last message displayed
    document.getElementById('chatInput').focus();
}



function displaySpotify(uri, watson) {
    uri = uri.replace(new RegExp('\\"', "g"), "");
    var chat_body = document.getElementById('chat-body');
    var bubble = document.createElement('div');
    var main = document.getElementById('main');
    bubble.innerHTML += '<iframe src="https://embed.spotify.com/?uri=' + uri + '" width="270" height="80" frameborder="0" allowtransparency="true"></iframe>';
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight; // Move chat down to the last message displayed
    document.getElementById('chatInput').focus();
}


function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
    lat = navigator.latitude;
    long = navigator.longitude;
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}



context = {
    "timezone": "America/Sao_Paulo"
  };
userMessage('');
