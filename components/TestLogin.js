import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

function TestLogin() {
  // Set an initializing state whilst Firebase connects
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signUpTest = () => {
        auth().createUserWithEmailAndPassword(email, password).then(() => {
            Alert.alert(`User Created with ${email} and ${password}`);
        }).catch((err)=> {
            console.log(err);
        })
    }

    return (
        <>
            <Text>Email</Text>
            <TextInput editable onChangeText={text => {setEmail(text);}} value={email}/>
            <Text>Password</Text>
            <TextInput editable onChangeText={text => {setPassword(text);}} value={password}/>
            <Text>Welcome {email}</Text>
            <Button title={"Login"} onPress={() => {
                console.log("Test");
                Alert.alert("YAY");
                signUpTest();
            }}>
            </Button>
        </>

    );
}

export default TestLogin;