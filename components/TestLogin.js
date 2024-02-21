import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

function TestLogin() {
  // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
 
    const signUpTest = () => {
        auth().createUserWithEmailAndPassword(email, password).then(() => {
            Alert.alert(`User Created with ${email} and ${password}`);
        }).catch((err)=> {
            console.log(err);
            if (error.code == 'auth/invalid-email') {
                console.log("Your email is not formatted correctly (You need @gmail.com)")
            }
            if (error.code == 'auth/weak-password') {
                console.log("Your password need to be at least 6 characters")
            }
        })
    }

    const signIn = () => {
        auth().signInWithEmailAndPassword(email, password).then(() => {
            Alert.alert(`Signed in!`)
        }).catch((err) => {
            console.log(err);
            if (error.code == 'auth/invalid-credential') {
                console.log("Your username or password is incorrect")
            }
        })
    }

    const signOut = () => {
        auth().signOut().then(() => {
            Alert.alert(`Signed out!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
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
                signUpTest();
            }} disabled={email == '' || password == ''}>
            </Button>
            <Button title="Sign in" onPress={() => {
                console.log("Pressed sign in");
                console.log(`User: ${user}`);
                signIn();
            }} disabled={email == '' || password == ''}></Button>
            <Button title="Sign out" onPress={() => {
                console.log("Pressed sign out");
                signOut();
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