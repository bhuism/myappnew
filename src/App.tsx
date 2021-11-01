import React, {useEffect, useState} from 'react';
import './App.css';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';


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

    const [isTokenFound, setTokenFound] = useState<string>();

    const [message, setMessage] = useState<string>("[default]");

    useEffect(() => {
        createToken();
    }, [])

    const createToken = () => {

        console.log("createToken called");

        return getToken(messaging, {vapidKey: 'BDhWi470NaYSLRcdBf6HY-qXJjP-d5RGvxKOZE0mdGhqxjDj7cI9Zvmmhuo0gPY8peVCzNHAHON8ckMbgVjvnFI'}).then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: "' + currentToken + '"');
                setTokenFound('current token for client: "' + currentToken + '"');
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound('No registration token available. Request permission to generate one.');
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            setTokenFound('An error occurred while retrieving token. ' + JSON.stringify(err));
            // catch error while creating client token
        });
    }

    useEffect(() => {
        if (isTokenFound) {
            setMessage("[registered]");
            return onMessage(messaging, (payload) => {
                console.log("got message");
//                console.log({payload: payload});
                setMessage(JSON.stringify(payload));
            })
        }
    }, [isTokenFound])


// inside the jsx being returned:

    return (
        <>
            <p>
                myapp4
            </p>
            <div className="App">
                {
                    isTokenFound && <p> Notification permission enabled 👍🏻 </p>
                }
                {
                    isTokenFound === undefined ? <p> Need notification permission ❗️ </p> : <p>{isTokenFound}</p>
                }

                {
                    <p>
                        last message: {message}
                    </p>
                }
            </div>
        </>
    );
}

export default App;
