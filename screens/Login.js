import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import styles from '../styles.js';
export default class Login extends React.Component {
 
  render() {
    return (
        <Container>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input autoCapitalize="none" autoCorrect={false} />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    />
                </Item>
                <Button full rounded success>
                    <Text>Login</Text>
                </Button>
                <View>
                    <Text> Create a new account? <Text onPress = {() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
                </View>
            </Form>
        </Container>
    )
  }
}