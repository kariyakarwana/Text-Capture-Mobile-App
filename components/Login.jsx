import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors' 
import { useRouter } from 'expo-router'

export default function Login() {

    const router=useRouter();


  return (
    <View>
      <Image source={require('./../assets/images/login.jpg')} style={{height:440,width:'100%' }} />
      <View style={styles.container}>
        <Text style={{fontSize:30,fontFamily:'outFit-bold',textAlign:'center',marginTop:10}}>Capture Text Mobile</Text>
        <Text style={{fontSize:17,fontFamily:'outFit', textAlign:'center',color:Colors.GRAY,marginTop:20}}>Capture Text helps you save notes quickly. Add a title, write your thoughts, and access them anytime in the "Captured" section. Start organizing your ideas now—tap "Get Start" to begin! 📝</Text>

        <TouchableOpacity style={styles.button}  onPress={()=>router.push('auth/Sign-in')}>
            <Text style={{color:Colors.WHITE,textAlign:'center',fontFamily:'outFit',fontSize:17}}>Get Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height:'100%',
        padding: 50,
        borderColor: Colors.PRIMARY,
        elevation: 2,
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
    },
    button:{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: '20%',
    }
})