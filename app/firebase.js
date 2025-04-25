        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyDNfSvxCDYVgVnOur9ZrzRSn9zPgILHjao",
          authDomain: "tomas-alva-edison.firebaseapp.com",
          projectId: "tomas-alva-edison",
          storageBucket: "tomas-alva-edison.firebasestorage.app",
          messagingSenderId: "605744506589",
          appId: "1:605744506589:web:a4307735dab6a681f01d34"
        };
      
        // Initialize Firebase
        export const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app)