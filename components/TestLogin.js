import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

function TestLogin() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (initializing) setInitializing(false);
        if (user) {
            console.log(`Hi ${user.uid}`);
            setUser(user);
        } else {
            console.log("User is signed out");
            setUser(user);
        }
    });
    const signUpButton = () => {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
        Alert.alert(`User Created with ${email} and ${password}`);
    }).catch((err)=> {
        console.log(err);
        if (err.code === 'auth/invalid-email') {
            Alert.alert("Your email is not formatted correctly (You need @gmail.com)")
        }
        if (err.code === 'auth/weak-password') {
            Alert.alert("Your password need to be at least 6 characters")
        }
    })
    }

    const signInButton = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
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
            <TextInput editable onChangeText={text => {setEmail(text);}} value={email}/>
            <Text>Password</Text>
            <TextInput editable onChangeText={text => {setPassword(text);}} value={password}/>
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
            }} disabled={!user}></Button>
            <Text>Test</Text>
            {user ? <Text>{`Hi ${user.email}`}</Text> : <Text>Sad</Text>}
            <Button title={"Display stats"} onPress={() => {
                console.log(user);
            }}></Button>
        </>

    );
  }

  export default TestLogin;