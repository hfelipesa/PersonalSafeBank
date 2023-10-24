let containerForm=document.querySelector(".containerForm")
let containerRegistro=document.querySelector(".containerRegistro")
let containerItems=document.querySelector(".containerItems")
let usuariosRegistrados = [];
let transaccionesUsuario = [];
let registro=document.getElementById("registro")

  
function registrarme(){
    const nuevoUsuario = document.getElementById("nuevoUsuario").value;
    const nuevaContrasena = document.getElementById("nuevaContrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;
    const monto =parseInt( document.getElementById("monto").value)
    
        if (nuevoUsuario === '' || nuevaContrasena === '' || confirmarContrasena === '' || monto === '') {
        alert("Todos los campos son obligatorios. Por favor, llénelos.");
        return;
    }
    
        if (nuevaContrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        if (parseInt(monto) < 100000) {
            alert("El monto debe ser de al menos 100,000.");
            return;
        }
        usuariosRegistrados.push({
            usuario: nuevoUsuario,
            contrasena: nuevaContrasena,
            confirmar: confirmarContrasena,
            monto: monto
        });
        containerRegistro.style.display="none"
        containerForm.style.display="block"
        alert("Cuenta creada con éxito.");
} 

function crearCuenta(){
     containerForm.style.display="none"
     containerRegistro.style.display="block" 
}         

let intentosIngreso = 0;
let cuentaBloqueada = false;
function iniciarSesion(){
    
    if (cuentaBloqueada) {
        alert("Tu cuenta está bloqueada. Contacta nuestro soporte.");
        return;
    }
    
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario && user.contrasena === contrasena);
    
    if(usuario=== "" || contrasena=== ""){
        alert("Por favor ingrese sus credenciales");
        return;
    } 

    if (usuarioRegistrado) {
        containerForm.style.display = "none";
        containerItems.style.display = "flex";
        alert("Inicio de sesión exitoso. Redirigiendo nuestro portal.");
    } else {
        intentosIngreso++;
        if (intentosIngreso >= 3) {
            cuentaBloqueada = true;
            alert("Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacta al soporte.");
        } else {
            alert("Credenciales incorrectas. Intento " + intentosIngreso + " de 3.");
        }
    }
}

function consultarSaldo(){
    const usuario = document.getElementById("usuario").value;
    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);

    if (usuarioRegistrado) {
        alert("Saldo actual: $" + usuarioRegistrado.monto);
    } else {
        alert("Usuario no encontrado.");
    }
}

function retirar(){
    const usuario = document.getElementById("usuario").value;
    const cantidadRetiro = parseInt(document.getElementById("cantidadRetiro").value);
    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);
    const montoMinimo=10000

    if (usuarioRegistrado) {
        if (cantidadRetiro >0 && cantidadRetiro <= usuarioRegistrado.monto && montoMinimo) {
            usuarioRegistrado.monto -= cantidadRetiro;
            alert("Retiro exitoso. Saldo restante: $" + usuarioRegistrado.monto);
        } else {
            alert("Cantidad de retiro no válida o saldo insuficiente.");
        }
    } else {
        alert("Usuario no encontrado.");
    }
}    
function tranferir(){
    const usuario = document.getElementById("usuario").value;
            const destinatario = document.getElementById("destinatario").value;
            const cantidadTransferencia = parseInt(document.getElementById("cantidadTransferencia").value);

            const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);
            const destinatarioRegistrado = usuariosRegistrados.find(user => user.usuario === destinatario);

            if (usuarioRegistrado && destinatarioRegistrado) {
                if (cantidadTransferencia > 0 && cantidadTransferencia <= usuarioRegistrado.monto) {
                    usuarioRegistrado.monto -= cantidadTransferencia;
                    destinatarioRegistrado.monto += cantidadTransferencia;
                    alert("Transferencia exitosa. Saldo restante: $" + usuarioRegistrado.monto);
                    let comprobante=document.createElement("div")
                    let origen=document.createElement("p")
                            
                } else {
                    alert("Cantidad de transferencia no válida o saldo insuficiente.");
                }
            } else {
                alert("Usuario o destinatario no encontrado.");
            }
}
function ahorar(){
    const usuario = document.getElementById("usuario").value;
    const cantidadDeposito = parseFloat(document.getElementById("montoDeposito").value);

    if (!isNaN(cantidadDeposito) && cantidadDeposito > 0) {
        const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);

        if (usuarioRegistrado) {
            usuarioRegistrado.monto += cantidadDeposito;
            alert("Depósito exitoso. Saldo actual: $" + usuarioRegistrado.monto);
        } else {
            alert("Usuario no encontrado.");
        }
    } else {
        alert("Ingrese una cantidad válida para el depósito.");
    }
}

function cerrarSesion(){
    let resumen = "Resumen de transacciones:\n";

    for (const transaccion of transaccionesUsuario) {
        if (transaccion.tipo === "Depósito") {
            resumen += `Depósito: $${transaccion.cantidad}\n`;
        } else if (transaccion.tipo === "Retiro") {
            resumen += `Retiro: $${transaccion.cantidad}\n`;
        } else if (transaccion.tipo === "Transferencia") {
            resumen += `Transferencia a ${transaccion.destinatario}: $${transaccion.cantidad}\n`;
        }
    } 
    const usuario = document.getElementById("usuario").value;
    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);
    resumen += `Saldo final: $${usuarioRegistrado.monto}`;

    alert(resumen);
    transaccionesUsuario = [];
    containerForm.style.display="block"
    containerItems.style.display="none"
}
  



