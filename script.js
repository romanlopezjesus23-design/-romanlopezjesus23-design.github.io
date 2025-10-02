// Obtener referencias a los elementos del DOM
const chatboxMessages = document.querySelector('.chatbox-messages');
const userInput = document.getElementById('userInput');

/**
 * Función para crear y añadir un nuevo elemento de mensaje al chat.
 * @param {string} messageText - El texto del mensaje.
 * @param {string} senderClass - Clase CSS para el remitente ('sent' o 'received').
 * @param {string} avatarCode - El código HTML del avatar del remitente.
 */
function appendMessage(messageText, senderClass, avatarCode) {
    // 1. Crear el elemento de fila del mensaje (message-row)
    const row = document.createElement('div');
    row.classList.add('message-row', `${senderClass}-row`);

    // 2. Obtener la hora actual para la marca de tiempo
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    // 3. Definir el contenido interno basado en si el mensaje es enviado o recibido
    // Los mensajes enviados tienen el avatar A LA DERECHA
    if (senderClass === 'sent') {
        row.innerHTML = `
            <div class="message ${senderClass}">
                <p>${messageText}</p>
                <span class="timestamp">${timeString}</span>
            </div>
            ${avatarCode}
        `;
    } else {
        // Los mensajes recibidos tienen el avatar A LA IZQUIERDA
        row.innerHTML = `
            ${avatarCode}
            <div class="message ${senderClass}">
                <p>${messageText}</p>
                <span class="timestamp">${timeString}</span>
            </div>
        `;
    }

    // 4. Añadir la nueva fila al contenedor de mensajes
    chatboxMessages.appendChild(row);

    // 5. Scroll automático hasta el último mensaje
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

/**
 * Función principal para enviar el mensaje del usuario.
 * Esta función es llamada por el evento 'onclick' en el botón.
 */
function sendMessage() {
    const text = userInput.value.trim();

    // No enviar mensajes vacíos
    if (text === '') {
        return;
    }

    // Define el avatar del usuario (U) que está enviando el mensaje
    const userAvatar = '<img src="https://static.wikia.nocookie.net/doblaje/images/c/c0/KS_MOVIE_-_Miko_Iino.png/revision/latest?cb=20230403145818&path-prefix=es" alt="Usuario Avatar" class="avatar">';
    
    // 1. Añade el mensaje del usuario
    appendMessage(text, 'sent', userAvatar);

    // 2. Limpia el input
    userInput.value = '';
}


// Opcional: Permitir enviar mensaje al presionar la tecla Enter
userInput.addEventListener('keydown', (event) => {
    // Verifica si la tecla presionada es 'Enter' y no está presionada la tecla 'Shift' (para permitir saltos de línea)
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Evita el salto de línea por defecto
        sendMessage();
    }
});