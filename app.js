const firebaseConfig = {
    apiKey: "AIzaSyAxNJKdL46TuyWvjXXjlJil0Cn298y8rkM",
    authDomain: "notea-77986.firebaseapp.com",
    projectId: "notea-77986",
    storageBucket: "notea-77986.firebasestorage.app",
    messagingSenderId: "232572730880",
    appId: "1:232572730880:web:b1c008ed2b0fee3f49e2e5"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Funciones comunes (login, registro)
  function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, pass)
      .then(() => window.location.href = "notas.html")
      .catch(e => alert("Error: " + e.message));
  }
  
  function register() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
  
    auth.createUserWithEmailAndPassword(email, pass)
      .then(() => window.location.href = "notas.html")
      .catch(e => alert("Error: " + e.message));
  }
  
  // Verifica si está logueado en notas.html
  auth.onAuthStateChanged(user => {
    if (window.location.pathname.includes("notas")) {
      if (user) {
        cargarNotas(user.uid);
      } else {
        window.location.href = "index.html";
      }
    }
  });
  
  function guardarNota() {
    const nota = document.getElementById("nota").value;
    const user = auth.currentUser;
  
    if (user) {
      db.collection("users").doc(user.uid).collection("notas").add({
        texto: nota,
        fecha: new Date()
      }).then(() => {
        alert("Nota guardada");
        document.getElementById("nota").value = "";
        cargarNotas(user.uid);
      });
    }
  }
  
  function cargarNotas(uid) {
    db.collection("users").doc(uid).collection("notas").orderBy("fecha", "desc")
      .get().then(snapshot => {
        let html = "";
        snapshot.forEach(doc => {
          html += `<p>${doc.data().texto}</p>`;
        });
        document.getElementById("notas").innerHTML = html;
      });
  }
  
  function logout() {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  }
  