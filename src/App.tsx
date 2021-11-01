import React, {useEffect, useState} from 'react';
import './App.css';
import {getMessaging, getToken} from 'firebase/messaging';


// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7z_5E15KS40s8vfCK2reTjoKUmWYxluM",
    authDomain: "klaversjassen.firebaseapp.com",
    databaseURL: "https://klaversjassen-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "klaversjassen",
    storageBucket: "klaversjassen.appspot.com",
    messagingSenderId: "316752448211",
    appId: "1:316752448211:web:a00bcdc415d7aa780a6226",
    measurementId: "G-4WVZL2D5RB"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

function App() {

    const [isTokenFound, setTokenFound] = useState(false);

    useEffect(() => {
        createToken();
    }, [])

    const createToken = () => {

        console.log("createToken called");

        return getToken(messaging, {vapidKey: 'BDhWi470NaYSLRcdBf6HY-qXJjP-d5RGvxKOZE0mdGhqxjDj7cI9Zvmmhuo0gPY8peVCzNHAHON8ckMbgVjvnFI'}).then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: "' + currentToken + '"');
                setTokenFound(true);
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
    }


// inside the jsx being returned:

    return (
        <>
            <p>
                myapp
            </p>
            <div className="App">
                {
                    isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>
                }
                {
                    !isTokenFound && <h1> Need notification permission ❗️ </h1>
                }

            </div>
        </>
    );
}

export default App;
