import React, { Component } from 'react';
import { Button, Picker, View, Image, Text, StyleSheet, TextInput,TouchableOpacity, Alert, ScrollView} from 'react-native';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Modal from "react-native-modal";
import { FormLabel, FormInput } from 'react-native-elements';

import firebase from '../firebase';
import Head from '../components/Head';


var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class Register extends Component{

  static navigationOptions= ()=>({
    title: 'Registration',
    headerStyle: {
      backgroundColor: '#3a2995',
      
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  

  userDatabase = firebase.database().ref('users'); //userID?
  state = { loading: false, users: {}, selectedId: '', currentUser: null, uid: null, userId: null, sex: 'boy', done: false, colorVal:'black', pname:'', bname:'',relationship:''}

  isFormValid = () => {
    const {pname, bname, sex, relationship} = this.state
    if (pname!= '' && bname!='' && sex!=''&& relationship!=''){
      console.log('disable false');
      return false;
    }else{
      console.log('disable true');
      console.log(firebase.auth().currentUser.uid);
      return true;
    }
  }

  


  componentDidMount(){

    const { currentUser } = firebase.auth();
    const { uid } = firebase.auth().currentUser.uid;
    console.log("c:"+ currentUser);
    console.log("u:"+ uid);

    this.setState({ currentUser, uid});

    this.userDatabase.on('value', users=> {
      const usersJSON = users.val();
      this.setState({ users: usersJSON === null ? {} : usersJSON});
    })
    
  }

  create(pname, bname, sex, relationship){
    console.log(this.state.sex);
    console.log(this.state.currentUser);
    if(pname == "" || bname == "" || sex == "" || relationship == "" ){
      console.log("error");
      return;
    }

    this.userDatabase.push({userId: firebase.auth().currentUser.uid, email: this.state.currentUser.email, userName: this.state.pname, babyName: this.state.bname, sex: this.state.sex, relationship: this.state.relationship });

  }

  // checkDatabase(userData, state){
  //   console.log("userData:"+ userData);
  //   console.log("state"+ state);

  //   if(firebase.auth().currentUser.uid != u){
 
  //     this.todoDatabase.child(payload.todoId).update({done: true});
  //     this.setState({done: true})
  //     console.log("donefalse:"+ this.state.done);
  //   }else{
 
  //     this.todoDatabase.child(payload.todoId).update({done: false});
  //     this.setState({done: false})
  //     console.log("doneTrue:"+ this.state.done);
  //   }
  //     this.setState({selectedId: ''})
  // }


  render(){
    const { sex, currentUser} = this.state;
    
    
    return(
      <View style = {styles.container}>
          <Head />
          <ScrollView 
            style={styles.scrollContainer}
            keyboardShouldPersistTaps={'always'}
          >
      
            {
                
                
                    (Object.values(this.state.users).find(id => id.userId === firebase.auth().currentUser.uid))?(
                      <View style = {styles.container}>
                    <Head />
                    <ScrollView style={styles.scrollContainer}>
                      {/* <Text>
                        Hi {currentUser && currentUser.email}!
                      </Text> */}
                      <TouchableOpacity
                        style={styles.doneBtn}
                        onPress={() => this.props.navigation.navigate('Timer')}
                      >
                      
                        <Text style={styles.btnText}>Timer</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  
                </View>
                              
                   
                    ):(
                      <View>
                      

                      <Text style={{fontSize: 20}}> Hi
                        <Text style={{color:'#e93766', fontSize: 20}}> 
                          {currentUser && currentUser.email}!
                        </Text>
                      </Text>
                                  
                      <Text>Tell us a little bit about you and your baby.</Text>
                      <Text>Your Name</Text>
                      <TextInput
                              placeholder="Enter your first name"
                              style={styles.createListInput}
                              onChangeText={(pname) => this.setState({pname})}
                            
                              />
                      <Text>Baby Name</Text>
                      <TextInput
                        placeholder="Enter your baby's name"
                        style={styles.createListInput}
                        onChangeText={(bname) => this.setState({bname})}
                      
                      />
                      <Text>Sex</Text>
                      <View>
                        <RadioButton
                          value="boy"
                          status={sex === 'boy' ? 'checked' : 'unchecked'}
                          onPress={() => { this.setState({ sex: 'boy' }); }}
                        />
                        <RadioButton
                          value="girl"
                          status={sex === 'girl' ? 'checked' : 'unchecked'}
                          onPress={() => { this.setState({ sex: 'girl' }); }}
                        />
                      </View>

                      <Text>What is your relationship tp the baby?</Text>
                      <View>
                        {/* <Picker
                          selectedValue={this.state.relationship}
                          style={{height: 50, width: '100%'}}
                          onValueChange={(itemValue) =>
                            this.setState({relationship: itemValue})
                          }>
                          <Picker.Item label="Mother" value="mother" />
                          <Picker.Item label="Father" value="father" />
                          <Picker.Item label="Family Member" value="familyMember" />
                          <Picker.Item label="Nanny/Babysitter" value="nannyBabysitter" />
                          <Picker.Item label="other" value="other" />
                        </Picker> */}

                        <RNPickerSelect
                            selectedValue={this.state.relationship}
                            style={{height: 100, width: '100%', color: 'black'}}
                            onValueChange={(itemValue) =>
                              this.setState({relationship: itemValue})
                            }
                            items={[
                                { label: 'Mother', value: 'mother'},
                                { label: 'Father', value: 'father' },
                                { label: 'Family Member', value: 'familyMember' },
                                { label: 'Nanny/Babysitter', value: 'nannyBabysitter' },
                                { label: 'Other', value: 'other' },
                            ]}
                        />
                                      

                      <TouchableOpacity
                              style={styles.registerBtn}
                              activeOpacity={this.isFormValid ? 1 : 0.5}
                              disabled={this.isFormValid()}
                              onPress={() => this.create(this.state.pname,this.setState.cname,this.setState.sex,this.setState.relationship)}
                              underlayColor='#000'>
                              <Text style={styles.btnText}>Register</Text>
                      </TouchableOpacity>

                                
                    </View>
                    
              
                    </View>

                    )
                  
              }


             
           
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

    registerBtn:{
      marginTop: 30,
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
      // backgroundColor:'#3a2995',
      // borderRadius:10,
      // borderWidth: 1,
      // borderColor: '#fff'
    },
    btnText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    btnText:{
      color:'#fff',
      backgroundColor: 'blue',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
    }
});



