import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/firebaseConfig';
import { useState } from 'react';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const onSignIn = () => {

        if(!email&&!password){
            ToastAndroid.show("Please Enter Email and password",ToastAndroid.BOTTOM)
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.replace('/homescreen')
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage, error)
                if(errorCode === 'auth/invalid-credential'){
                    ToastAndroid.show("Invalid Credentials",ToastAndroid.LONG)
                }
            });

    }

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="black" style={styles.backIcon}/>    
                </TouchableOpacity>
                <Text style={styles.title1}>Sign-In</Text>
            </View>
            <Text style={styles.title}>Let's Sign You In</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
            <Text style={styles.subtitle}>You've been missed</Text>
            
            {/* Email */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder="Enter Email" 
                    style={styles.input} 
                    placeholderTextColor={Colors.GRAY}
                    onChangeText={(value)=>setEmail(value)}
                />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    placeholder="Enter Password" 
                    style={styles.input} 
                    secureTextEntry={true}
                    placeholderTextColor={Colors.GRAY}
                    onChangeText={(value)=>setPassword(value)}
                />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.button} onPress={onSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity style={styles.button1} onPress={()=>router.replace('auth/Sign-up')}>
                <Text style={styles.buttonText1}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 40,
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    title1: {
        fontFamily: 'outFit-bold',
        fontSize: 30,
        color: Colors.PRIMARY,
        paddingLeft:80,
    },
    title: {
        fontFamily: 'outFit-bold',
        fontSize: 30,
        color: Colors.PRIMARY,
        paddingTop:30
    },
    subtitle: {
        fontFamily: 'outFit',
        fontSize: 30,
        color: Colors.GRAY,
        marginTop: 10
    },
    inputContainer: {
        marginTop: 30
    },
    label: {
        fontFamily: 'outFit',
        paddingBottom: 15,
        color: Colors.PRIMARY
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily: 'outFit',
        color: Colors.PRIMARY
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 50,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'outFit',
        fontSize: 17,
        color: Colors.WHITE
    },
    button1: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    buttonText1: {
        fontFamily: 'outFit',
        fontSize: 17,
        color: Colors.PRIMARY
    },
    backIcon: {
        paddingRight: 20
    },
});