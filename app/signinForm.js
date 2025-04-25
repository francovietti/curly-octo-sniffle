import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import { auth } from "./firebase.js"
import {ShowMessage } from "./showMessage.js"

const signInForm = document.querySelector("#signin-form")

signInForm.addEventListener("submit" , async e => {
    e.preventDefault()
    
  const email = signInForm["login-email"].value
  const password = signInForm["login-password"].value

    try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(credentials)

    const modal = bootstrap.Modal.getInstance(document.querySelector("#signinModal"))
    modal.hide()

    ShowMessage("Bienvenido "+ credentials.user.email)

    } catch (error) {
    console.error(error)

    if (error.code === "auth/wrong-password") {
        ShowMessage("Contraseña Incorrecta", "error")
    } else if (error.code === "auth/user-not-found") {
        ShowMessage("Usuario Incorrecto", "error")
    } else if (error.code === "auth/invalid-credential") {
        ShowMessage("Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.", "error")
    } else {
        ShowMessage(error.message, "error")
    }
}
})