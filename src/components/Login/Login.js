import React, { useContext } from 'react';
//firebase
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    console.log(location.state);
    const { from } = location.state || { form: { pathname: "/" } }
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email } = user;
                const signedUser = { name: displayName, email };
                setLoggedInUser(signedUser);
                history.replace(from);
                console.log('handleGoogleSignIn in LogIn', user);
            }).catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <div className="App">
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}><VpnKeyIcon></VpnKeyIcon></button>
        </div>
    );
};

export default Login;