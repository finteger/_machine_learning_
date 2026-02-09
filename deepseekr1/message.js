let abortController = null;
let isGenerating = false;

async function sendMessage(){

    //setup elements
    const inputBox = document.getElementById('input-box');
    const chatBox = document.getElementById('chat-box');
    const stopBtn = document.getElementById('stop-btn');
    const prompt = inputBox.value.trim();

    //return out if no prompt
    if(!prompt) return;

    //stop generating if already generating
    if(isGenerating){
        stopGeneration();
        return;
    }

    //grab the user's prompt and display it
    chatBox.innerHTML += `<div class="user-message>You: ${prompt}</div>`;
    inputBox.value = '';
    stopBtn.disabled = false;
    isGenerating = true;

    try{
       //instantiate a new abort controller for this generation
        abortController = new AbortController();

        //send the prompt to the server and stream the response
        //uses the signal from the abort controller to allow cancellation of the request
        const response = await fetch('http://localhost:8080/api/chat-stream', {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({prompt}),
            signal: abortController.signal
        });


        //create a div element to append the output from the DeepSeek model as it streams in
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = 'Bot: ';
        chatBox.appendChild(botDiv);

        const reader = response.body.getReader();

    } catch(error){

    } finally{


    }





}