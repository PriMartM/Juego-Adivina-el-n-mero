let numeroMaximo = 10; // Número máximo que se puede adivinar
let intentos = 0; // Contador de intentos actuales
let maxIntentos = 5; // Número máximo de intentos permitidos
let numeroSecreto; // Número secreto generado
let listaNumerosSorteados = []; // Lista de números ya sorteados

// Actualiza el texto de un elemento del DOM
function asignarTextoElemento(elemento, texto) {
    document.querySelector(elemento).innerHTML = texto;
}

// Maneja la lógica del final del juego (ganar o perder)
function finalizarJuego(mensaje) {
    asignarTextoElemento('p', mensaje);
    document.getElementById('reiniciar').removeAttribute('disabled');
}

// Verifica el número ingresado por el usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Por favor, ingresa un número válido.');
        limpiarCaja();
        return;
    }

    intentos++; // Incrementa el contador de intentos

    if (numeroDeUsuario === numeroSecreto) {
        finalizarJuego(`¡Ganaste!♥, acertaste el número en ${intentos} intento${intentos > 1 ? 's' : ''}.`);
        return;
    }

    // Lógica para guiar al usuario si el número es mayor o menor
    if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento('p', '❗Guía: El número secreto es menor. Intenta de nuevo.');
    } else {
        asignarTextoElemento('p', '❗Guía: El número secreto es mayor. Intenta de nuevo.');
    }

    // Verificar si alcanzó el máximo de intentos
    if (intentos >= maxIntentos) {
        finalizarJuego(`Perdiste😔, llegaste al máximo de ${maxIntentos} intentos. El número secreto era ${numeroSecreto}.`);
    }

    limpiarCaja();
}

// Limpia la caja de texto del usuario
function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

// Genera un número secreto no repetido
function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

// Establece las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', '🕹️Adivina el número');
    asignarTextoElemento('p', `Elije un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0; // Reinicia los intentos
    console.log(`Número secreto: ${numeroSecreto}`); // Depuración
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

// Reinicia el juego a su estado inicial
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
}

// Inicializa el juego
condicionesIniciales();
