import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '../firebase'

export default class SignUp extends React.Component {
    userDatabase = firebase.database().ref('user');
    state = { name: '', email: '', password: '', errorMessage: null }
    
    componentDidMount(){

      this.userDatabase.on('value', user=> {
        const usersJSON = user.val();
        this.setState({ user: usersJSON === null ? {} : usersJSON});
      })
      
    }

    // create(userId,name,email){
    //   console.log(userId,name,email);
    //   if(userId == null || name == null || email){
    //     return;
    //   }
  
    //   this.userDatabase.push({userId: userId, name: name, email: email});
  
    // }
    
    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() =>
        console.log(firebase.auth()),
        // this.create(this.state.email, this.state.name,this.state.email),
        this.props.navigation.navigate('Register'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          {/* <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        /> */}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})