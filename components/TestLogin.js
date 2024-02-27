import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

function TestLogin({route}) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const {setUser, user} = route.params;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (i_user) => {
            if (initializing) setInitializing(false);
            if (i_user) {
                console.log(`Hi ${i_user.uid}`);
                setUser(i_user);
                setSignedIn(true);
            } else {
                console.log("User is signed out");
                setUser(null); // Set user to null when signed out
                setSignedIn(false);
            }
        });

        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
        } else {
            setInitializing(false);
        }

        // Cleanup function to unsubscribe from the listener
        return () => unsubscribe();
    }, []); // Empty dependency array ensures the effect runs only once

    const signUpButton = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setUser(userCredential.user);
        Alert.alert(`User Created with ${email} and ${password}`);
    }).catch((err)=> {
        console.log(err);
        if (err.code === 'auth/invalid-email') {
            Alert.alert("Your email is not formatted correctly (You need @gmail.com)");
        }
        if (err.code === 'auth/weak-password') {
            Alert.alert("Your password need to be at least 6 characters");
        }
        if (err.code === 'auth/email-already-in-use') {
            Alert.alert("That email already exists");
        }
    })
    }

    const signInButton = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setUser(userCredential.user);
        Alert.alert(`Signed in!`)
    }).catch((err) => {
        console.log(err);
        if (err.code == 'auth/invalid-credential') {
            Alert.alert("Your username or password is incorrect")
        }
    })
    }

    const signOutButton = () => {
        signOut(auth).then(() => {
            Alert.alert(`Signed out!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    if (initializing) return null;

    return (
        <>
            <Text>Email</Text>
            <TextInput editable={!signedIn} onChangeText={text => {setEmail(text);}} value={email}/>
            <Text>Password</Text>
            <TextInput editable={!signedIn} onChangeText={text => {setPassword(text);}} value={password}/>
            <Text>Welcome {email}</Text>
            <Button title={"Sign Up"} onPress={() => {
                console.log("pressed sign up");
                signUpButton();
            }} disabled={email == '' || password == ''}>
            </Button>
            <Button title="Sign in" onPress={() => {
                console.log("Pressed sign in");
                console.log(`User: ${user}`);
                signInButton();
            }} disabled={email == '' || password == ''}></Button>
            <Button title="Sign out" onPress={() => {
                console.log("Pressed sign out");
                signOutButton();
            }} disabled={!signedIn}></Button>
            <Text>Test</Text>
            {user ? <Text>{`Hi ${user.email}`}</Text> : <Text>Sad</Text>}
            <Button title={"Display stats"} onPress={() => {
                console.log(user);
            }}></Button>
        </>

    );
  }

  export default TestLogin;