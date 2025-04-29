// Importar módulos desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Tus credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAxNJKdL46TuyWvjXXjlJil0Cn298y8rkM",
    authDomain: "notea-77986.firebaseapp.com",
    projectId: "notea-77986",
    storageBucket: "notea-77986.firebasestorage.app",
    messagingSenderId: "232572730880",
    appId: "1:232572730880:web:b1c008ed2b0fee3f49e2e5"
  };  

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notaInput = document.getElementById("noteInput");
const notasDiv = document.getElementById("notas");

// Guardar nota
async function guardarNota() {
  const texto = notaInput.value.trim();
  if (texto === "") return;

  await addDoc(collection(db, "notas"), {
    contenido: texto,
    fecha: new Date()
  });

  notaInput.value = "";
  mostrarNotas();
}

// Mostrar notas
async function mostrarNotas() {
  notasDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "notas"));
  querySnapshot.forEach((doc) => {
    const nota = document.createElement("div");
    nota.classList.add("nota");
    nota.innerText = doc.data().contenido;
    notasDiv.appendChild(nota);
  });
}

mostrarNotas();

window.guardarNota = guardarNota;
