// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdwEYhGaiNbjerjGW-tj4-3nonWpi3pZ8",
  authDomain: "auth-b72c5.firebaseapp.com",
  projectId: "auth-b72c5",
  storageBucket: "auth-b72c5.appspot.com",
  messagingSenderId: "618163586054",
  appId: "1:618163586054:web:07687b90b38147b808ef87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleSignIn = document.getElementById("googleSignInBtn");
const googleSignOut = document.getElementById("googleSignOutBtn");
const message = document.getElementById("message");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhoto = document.getElementById("photoUrl");

googleSignOut.style.display = "none";
message.style.display = "none";
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully");
    })
    .catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    googleSignOut.style.display = "block";
    message.style.display = "block";

    userPhoto.src = user.photoURL;
    userName.innerHTML = user.displayName;
    userEmail.innerHTML = user.email;
    console.log(user);
  } else {
    googleSignOut.style.display = "none";
    message.style.display = "none";
  }
});

googleSignIn.addEventListener("click", userSignIn);
googleSignOut.addEventListener("click", userSignOut);

// googleSignIn.addEventListener("click", () => {
//   signInWithPopup(auth, provider);
// });
