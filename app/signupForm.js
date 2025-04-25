import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { ShowMessage } from "./showMessage.js"

const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener('submit', async (e) => {
 e.preventDefault()

 const email = signupForm['signup-email'].value
 const password = signupForm['signup-password'].value

 console.log(email, password)

 try {
 const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
 console.log(userCredentials)

 //cerrar la ventana de registro
 const signupModal = document.querySelector("#signupModal")
 const Modal = bootstrap.Modal.getInstance(signupModal)
 Modal.hide()

   ShowMessage("Bienvenido " + userCredentials.user.email)

 } catch (error) {
 if (error.code === "auth/email-already-in-use") {
    ShowMessage("Correo actualmente en uso", "error")
 } else if (error.code === "auth/invalid-email") {
    ShowMessage("Correo Invalido (falta @ o .com)", "error")
 } else if (error.code === "auth/weak-password") {
    ShowMessage("Contraseña demasiado corta", "error")
 } else if (error.code) {
    ShowMessage("Algo salio mal", "error")
 }

 }

})