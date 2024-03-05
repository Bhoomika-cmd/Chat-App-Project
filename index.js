const bhoomiSelectorBtn=document.querySelector("#bhoomi-selector");
const nehaSelectorBtn=document.querySelector(`#neha-selector`);
const chatHeader =document.querySelector(`.chat-header`);
const chatMessage = document.querySelector(`.chat-messages`);
const chatInputForm = document.querySelector(`.chat-input-form`);
const chatInput = document.querySelector(`.chat-input`);
const clearChatBtn = document.querySelector(`.clear-chat-button`);
const messages = JSON.parse(localStorage.getItem('messages')) || []

const createchatMessageElement = (message) =>`<div class="message ${message.sender === `Bhoomi` ? `blue-bg` : `gray-bg`} ">
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.msg}</div>
                <div class="message-timestamp">${message.timeStamp}</div>
            </div>` 
              
            window.onload = ()=>{
    if (messages) {
        messages.forEach((message) =>
         {
          chatMessage.innerHTML += createchatMessageElement(message);
        });
    }
}
let messageSender = `Bhoomi`;
const updateMessageSender = (name) =>{
messageSender = name; 
chatHeader.innerText= `${messageSender} chatting...`
chatInput.placeholder= `Type Here, ${messageSender}...`

if(name === `Bhoomi` && messageSender === `Bhoomi`){
    bhoomiSelectorBtn.classList.add(`active-person`);
    nehaSelectorBtn.classList.remove(`active-person`);    

}
if(name === `Neha` && messageSender === `Neha`){

    nehaSelectorBtn.classList.add(`active-person`);
    bhoomiSelectorBtn.classList.remove(`active-person`);
}
chatInput.focus();
}
bhoomiSelectorBtn.onclick=() => updateMessageSender(`Bhoomi`);
nehaSelectorBtn.onclick= ()=>updateMessageSender(`Neha`);


const sendMessage= (e) =>{
    e.preventDefault();
    const timeStamp= new Date().toLocaleString(`en-US`,{hour: `numeric`,minute : `numeric`,hour12:true});
    const message = 
    {
       sender : messageSender,
       msg : chatInput.value ,
       timeStamp :timeStamp
    }

    messages.push(message)
    localStorage.setItem(`messages`,JSON.stringify(messages));     
    chatMessage.innerHTML +=createchatMessageElement(message);

    chatInputForm.reset();
    chatMessage.scrollTop= chatMessage.scrollHeight;    
    
}

     chatInputForm.addEventListener(`submit`,sendMessage);
    clearChatBtn.addEventListener(`click`,()=>{
        localStorage.clear();
        chatMessage.innerHTML='';
    })
 

    