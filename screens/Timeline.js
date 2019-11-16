import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TextInput,TouchableOpacity, Alert, ScrollView} from 'react-native';
import firebase from '../firebase';
import Head from '../components/Head';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class Timeline extends Component{

  static navigationOptions = ()=>({
    title: 'Hi Miho!',
    headerStyle: {
      backgroundColor: '#3a2995',
      
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  

  
  
  render(){
    return(
      <View style = {styles.container}>
          <Head />
          <ScrollView style={styles.scrollContainer}>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => this.props.navigation.navigate('Timer')}
            >
            
              <Text style={styles.btnText}>Timer</Text>
            </TouchableOpacity>
          </ScrollView>
        
      </View>
    )
  }
 }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
    scrollContainer:{
        height: -100,
        width: '100%',
    },

    textInput: {
        backgroundColor: '#ddca6c',
        height: 30,
        width: '100%',
    },
    bottomContainer:{
      backgroundColor: '#93c8f2',
      borderStyle: "solid",
      height: 85,
      width: width,
      alignItems: 'center',
    },
    createListInput: {
        backgroundColor: '#fff',
        borderStyle: "solid",
        borderColor: '#3a2995',
        height: 50,
        width: width - 100,
        paddingLeft: 10,     
    },
    todoText: {
        textAlignVertical: 'center',
    },
    box: {
        width: '100%',
        height: 30,
        backgroundColor: '#ddca6c',
        top: 0
    },
    listBox: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight:10,   
    },
    checkList:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      position: 'absolute',
      bottom: 20,
      backgroundColor: '#3a2995',
      tintColor: '#fff',
      flex: 1, 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listInline:{
      color: '#fff',
    },
    btnContainer:{
      marginTop: 5,
      marginBottom: 5,
      alignItems: 'center',
    },

    deleteBtn:{
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#d81b60',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    doneBtn:{
      marginBottom: 5,
      paddingTop:10,
      paddingBottom:10,
      width: 100,
      height: 50,
      // backgroundColor:'#3a2995',
      // borderRadius:10,
      // borderWidth: 1,
      // borderColor: '#fff'
    },
    btnText:{
      color:'#fff',
      backgroundColor: 'blue',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
    }
});



