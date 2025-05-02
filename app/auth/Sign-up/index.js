import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../configs/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
    const navigation = useNavigation();
        const router = useRouter();

        const [email,setEmail]=useState();
        const [password,setPassword]=useState();
        const [fullName,setFullName]=useState();



        useEffect(() => {
            navigation.setOptions({
                headerShown: false
            });
        }, []);

        const OnCreateAccount= () => {
            if(!email&&!password&&!fullName){
                ToastAndroid.show('Please enter all details',ToastAndroid.BOTTOM)
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    router.replace('/homescreen');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("", errorCode, errorMessage);
                    // ..
                });
  }
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" style={styles.backIcon}/>    
        </TouchableOpacity>
        <Text style={styles.title}>Sign-Up</Text>
      </View>


        {/* Full Name */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
                placeholder="Enter Full Name" 
                style={styles.input} 
                placeholderTextColor={Colors.GRAY}
                onChangeText={(value)=>setFullName(value)}
            />
        </View>

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
        <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button1} onPress={()=>router.replace('auth/Sign-in')}>
            <Text style={styles.buttonText1}>Sign In</Text>
        </TouchableOpacity>


    </View>
  )
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
    title: {
        fontFamily: 'outFit-bold',
        fontSize: 30,
        color: Colors.PRIMARY,
        paddingLeft:80,
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
        color: Colors.PRIMARY,
        borderColor: Colors.PRIMARY
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