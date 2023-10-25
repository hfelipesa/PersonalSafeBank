const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const nuevoUsuario = document.getElementById("nuevoUsuario")
const nuevaContrasena = document.getElementById("nuevaContrasena")
const confirmarContrasena = document.getElementById("confirmarContrasena")
const cantidadRetiro = document.getElementById("cantidadRetiro")
const destinatario = document.getElementById("destinatario")
const cantidadTransferencia = document.getElementById("cantidadTransferencia")
const montoDeposito = document.getElementById("montoDeposito")


const validarCampos = (e) => {
  const campo = e.target
  const valorCampo = e.target.value.trim()
  if (valorCampo.length === 0) {
    campo.classList.add("invalido")
    campo.nextElementSibling.classList.add("error")
    campo.nextElementSibling.innerText ='Este campo es requerido';
  } else {
    campo.classList.remove("invalido")
    campo.nextElementSibling.classList.remove("error")
    campo.nextElementSibling.innerText = ""
  }
}

const validarFormatoUsuario = e => {
  const campo = e.target
  const valorCampo = e.target.value
  const regex = new RegExp(/^[a-zA-Z0-9]{4,15}$/)
  if ( !regex.test(valorCampo)) {
    campo.classList.add("invalido")
    campo.nextElementSibling.classList.add("error")
    campo.nextElementSibling.innerText ='Revise el formato requerido';
  } else {
    campo.classList.remove("invalido")
    campo.nextElementSibling.classList.remove("error")
    campo.nextElementSibling.innerText = ""
  }
}

const validarFormatoNumero = e => {
  const campo = e.target
  const valorCampo = e.target.value
  const regexnumero = new RegExp(/^[0-9]{0,10}$/)
  if ( !regexnumero.test(valorCampo)) {
    campo.classList.add("invalido")
    campo.nextElementSibling.classList.add("error")
    campo.nextElementSibling.innerText ='El formato requerido es solo números';
  } else {
    campo.classList.remove("invalido")
    campo.nextElementSibling.classList.remove("error")
    campo.nextElementSibling.innerText = ""
  }
}



usuario.addEventListener("blur", validarCampos)
contrasena.addEventListener("blur", validarCampos)
nuevoUsuario.addEventListener("blur", validarCampos)
nuevaContrasena.addEventListener("blur", validarCampos)
confirmarContrasena.addEventListener("blur", validarCampos)
monto.addEventListener("blur", validarCampos)
cantidadRetiro.addEventListener("blur", validarCampos)
destinatario.addEventListener("blur", validarCampos)
cantidadTransferencia.addEventListener("blur", validarCampos)
montoDeposito.addEventListener("blur", validarCampos)




usuario.addEventListener("input", validarFormatoUsuario)
nuevoUsuario.addEventListener("input", validarFormatoUsuario)
contrasena.addEventListener("input", validarFormatoUsuario)
nuevaContrasena.addEventListener("input", validarFormatoUsuario)
confirmarContrasena.addEventListener("input", validarFormatoUsuario)
destinatario.addEventListener("input", validarFormatoUsuario)

monto.addEventListener("input", validarFormatoNumero)
cantidadRetiro.addEventListener("input", validarFormatoNumero)
cantidadTransferencia.addEventListener("input",validarFormatoNumero)
montoDeposito.addEventListener("input", validarFormatoNumero)