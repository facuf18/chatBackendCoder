let socket = io(); 
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;

/*ALERT DE IDENTIFICACIÓN*/
Swal.fire({
    title: "Ingrese su nombre",
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && '¡Debe ingresar su nombre!';
    }
}).then(result=>{
    user = result.value;
})

chatBox.addEventListener('keyup',e=>{
    if(e.key==="Enter"){
        if(chatBox.value.trim().length>0){//Por lo menos se ha enviado un caracter
            socket.emit('message',{user: user, message: chatBox.value.trim()});
            chatBox.value = "";
        }
    }
})
/*SOCKETS DE EVENTO*/
socket.on('log', data=>{
    let messages = "";
    data.forEach(log => {
        messages = messages + `${log.user}: ${log.message}</br>`;
    }
    );
    log.innerHTML = messages;
});