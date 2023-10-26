let containerForm=document.querySelector(".containerForm")
let containerRegistro=document.querySelector(".containerRegistro")
let containerItems=document.querySelector(".containerItems")
let usuariosRegistrados = [];
let transaccionesUsuario = [];
let registro=document.getElementById("registro")
let contadorDepositos = 0;
let contadorRetiros = 0;
let contadorTransferencias = 0;
  
function registrarme(){
    const nuevoUsuario = document.getElementById("nuevoUsuario").value;
    const nuevaContrasena = document.getElementById("nuevaContrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;
    const monto =parseInt( document.getElementById("monto").value)
    
        if (nuevoUsuario === '' || nuevaContrasena === '' || confirmarContrasena === '' || monto === '') {
        /* alert("Todos los campos son obligatorios. Por favor, llénelos."); */
        swal.fire({
            title:"Todos los campos son obligatorios. Por favor, ingrese los datos.",
            icon: 'error',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        return;
    }
    
        if (nuevaContrasena !== confirmarContrasena) {
            /* alert("Las contraseñas no coinciden.");  */
            swal.fire({
                title:"Las contraseña ingresada no coinciden.",
                icon: 'error',
                confirmButtonColor: '#0A0101',
                timer:5000
            })
            return;
        }
        if (parseInt(monto) < 100000) {
           /*  alert("El monto debe ser de al menos 100,000."); */
           swal.fire({
            title:"El monto minimo para abrir cuenta es 100,000.",
            icon: 'error',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
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
       /*  alert("Cuenta creada con éxito.") */
       swal.fire({
        title:"Cuenta creada con éxito gracias por confiar en nosotros.",
        icon: 'success',
        confirmButtonColor: '#0A0101',
        timer:5000
    })
} 

function crearCuenta(){
     containerForm.style.display="none"
     containerRegistro.style.display="block" 
}         

let intentosIngreso = 0;
let cuentaBloqueada = false;
function iniciarSesion(){
    
    if (cuentaBloqueada) {
        swal.fire({
            title:"Tu cuenta está bloqueada por seguridad. Contacta nuestro soporte.",
            icon: 'warning',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        return;
    }
    
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario && user.contrasena === contrasena);
    
    if(usuario=== "" || contrasena=== ""){
        /* alert("Por favor ingrese sus credenciales"); */
        swal.fire({
            title:"Por favor ingrese sus credenciales",
            icon: 'error',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        return;
    } 

    if (usuarioRegistrado) {
        containerForm.style.display = "none";
        containerItems.style.display = "flex";
       /*  alert("Inicio de sesión exitoso. Redirigiendo nuestro portal."); */
       swal.fire({
        title:"Inicio de sesión exitoso. Redirigiendo a nuestro portal.",
        icon: 'success',
        confirmButtonColor: '#0A0101',
        timer:5000
    })
    } else {
        intentosIngreso++;
        if (intentosIngreso >= 3) {
            cuentaBloqueada = true;
            /* alert("Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacta al soporte.");
             */
            swal.fire({
                title:"Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacta al soporte.",
                icon: 'warning',
                confirmButtonColor: '#0A0101',
                timer:5000
            })
        } else {
           /*  alert("Credenciales incorrectas. Intento " + intentosIngreso + " de 3."); */
           swal.fire({
            title:"Credenciales incorrectas. Intento " + intentosIngreso + " de 3.",
            icon: 'warning',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        }
    }
}

function consultarSaldo(){
    const usuario = document.getElementById("usuario").value;
    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);

    if (usuarioRegistrado) {
        /* alert("Saldo actual: $" + usuarioRegistrado.monto); */
        swal.fire({
            title:"Saldo actual : $" + usuarioRegistrado.monto+"",
            icon: 'success',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
    } else {
        /* alert("Usuario no encontrado."); */
        swal.fire({
            title:"Usuario no encontrado en nuestro sistema.",
            icon: 'warning',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
    }
}

function retirar(){
    const usuario = document.getElementById("usuario").value;
    const cantidadRetiro = parseInt(document.getElementById("cantidadRetiro").value);
    const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);
    
    if (usuarioRegistrado.monto - cantidadRetiro < 10000) {
        /* alert("El saldo mínimo permitido en cuenta es $10,000. No se puede realizar el retiro."); */
        swal.fire({
            title:"Lo sentimo no podemos realizar la operacion ya que tu cuenta no puede quedar con menos de 10.000",
            icon: 'warning',
            confirmButtonColor: '#0A0101',
            timer:5000
        }) 
        return;
    }
    if (usuarioRegistrado) {
        if (cantidadRetiro >0 && cantidadRetiro <= usuarioRegistrado.monto) {
            usuarioRegistrado.monto -= cantidadRetiro;
           /*  alert("Retiro exitoso. Saldo restante: $" + usuarioRegistrado.monto); */
           swal.fire({
            title:"Retiro exitoso. Saldo restante: $" + usuarioRegistrado.monto+"",
            icon: 'success',
            confirmButtonColor: '#0A0101',
            timer:5000
        })   
        } else {
           /*  alert("Cantidad de retiro no válida o saldo insuficiente."); */
           swal.fire({
            title:"Cantidad de retiro no válida o saldo insuficiente.",
            icon: 'warning',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        }        
    } else {
       /*  alert("Usuario no encontrado.") */;
       swal.fire({
        title:"Usuario no encontrado en nuestro sistema.",
        icon: 'warning',
        confirmButtonColor: '#0A0101',
        timer:5000
    })
    }
    transaccionesUsuario.push({ tipo: "Retiro", cantidad: cantidadRetiro });
    contadorRetiros++
}        
function tranferir(){
    const usuario = document.getElementById("usuario").value;
    const destinatario = document.getElementById("destinatario").value;
    const cantidadTransferencia = parseInt(document.getElementById("cantidadTransferencia").value);

            const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);
            const destinatarioRegistrado = usuariosRegistrados.find(user => user.usuario === destinatario);

            if(usuarioRegistrado == destinatarioRegistrado){
                // alert("no se puede ")
                swal.fire({
                    title:"no se puede transferir a si mismo ",
                    icon: 'error',
                    confirmButtonColor: '#0A0101',
                    timer:5000
                })
                return
            }

            if (usuarioRegistrado && destinatarioRegistrado) {
                if (cantidadTransferencia > 0 && cantidadTransferencia <= usuarioRegistrado.monto) {
                    usuarioRegistrado.monto -= cantidadTransferencia;
                    destinatarioRegistrado.monto += cantidadTransferencia;
                    /* alert("Transferencia exitosa. Saldo restante: $" + usuarioRegistrado.monto); */
                    swal.fire({
                        title:"Transferencia exitosa. Saldo restante: $" + usuarioRegistrado.monto+"",
                        Text:"Cuenta destino: " + destinatario+ "",
                        icon: 'success',
                        confirmButtonColor: '#0A0101',
                        timer:7000
                    })
                            
                } else {
                    /* alert("Cantidad de transferencia no válida o saldo insuficiente."); */
                    swal.fire({
                        title:"Cantidad de transferencia no válida o saldo insuficiente.",
                        icon: 'warning',
                        confirmButtonColor: '#0A0101',
                        timer:5000
                    })
                }
            } else {
                /* alert("Usuario o destinatario no encontrado."); */
                swal.fire({
                    title:"Usuario o destinatario no encontrado.",
                    icon: 'warning',
                    confirmButtonColor: '#0A0101',
                    timer:5000
                })
            }
            transaccionesUsuario.push({ tipo: "Transferencia", destinatario: destinatario, cantidad: cantidadTransferencia });
            contadorTransferencias++
}
function ahorar(){
    const usuario = document.getElementById("usuario").value;
    const cantidadDeposito = parseFloat(document.getElementById("montoDeposito").value);

    if (!isNaN(cantidadDeposito) && cantidadDeposito > 10000) {
        const usuarioRegistrado = usuariosRegistrados.find(user => user.usuario === usuario);

        if (usuarioRegistrado) {
            usuarioRegistrado.monto += cantidadDeposito;
           /*  alert("Depósito exitoso. Saldo actual: $" + usuarioRegistrado.monto); */
           swal.fire({
            title:"Depósito exitoso. Saldo actual: $" + usuarioRegistrado.monto+"",
            icon: 'success',
            confirmButtonColor: '#0A0101',
            timer:5000
        })
        } else {
            /* alert("Usuario no encontrado."); */
            swal.fire({
                title:"Usuario no encontrado. en nuestro sistema",
                icon: 'warning',
                confirmButtonColor: '#0A0101',
                timer:5000
            })
        }
    } else {
       /*  alert("Ingrese una cantidad válida para el depósito."); */
       swal.fire({
        title:"El deposito minimo para consignar es 10.000.",
        icon: 'warning',
        confirmButtonColor: '#0A0101',
        timer:5000
    })
    }
    transaccionesUsuario.push({ tipo: "Depósito", cantidad: cantidadDeposito });
    contadorDepositos++
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

  /*   alert(resumen); */
  swal.fire({
    title:resumen,
    icon: 'success',
    confirmButtonColor: '#0A0101',
    timer:5000
})
    transaccionesUsuario = [];
    containerForm.style.display="block"
    containerItems.style.display="none"
}
  



