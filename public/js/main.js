var socket = io()

const enviar = document.getElementById('enviar');
const guardar = document.getElementById('guardar');
const verde = document.getElementById('verde');
guardar.addEventListener('click',() =>{
    var name = document.getElementById('nombre').value
});
enviar.addEventListener('click', ()=>{
    var mensaje = document.getElementById('mensaje');
    var name = document.getElementById('nombre').value
    
    var objMss = {
        mensaje : mensaje.value, name

    }

    if(mensaje.value != ''){
        socket.emit('nuevo mensaje', objMss);
        mensaje.value = '';
    }else{
        alert('No puede enviar un mensaje vacio');
    }
})

socket.on('nuevo mensaje servidor', data => {
    var lista_mensajes = document.getElementById('nuevo_mensaje');
    var html = `<strong>${data.name}:</strong> ${data.mensaje}`;
    var div = document.createElement("div");
    div.classList.add("card-panel")
    div.classList.add("mensaje")
    div.classList.add("text-blue")
    div.classList.add("bg-dark")
    div.classList.add("mb-3")
    div.innerHTML = html
    lista_mensajes.appendChild(div)
})
