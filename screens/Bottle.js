import React from 'react';
import { Button, Text, View, Modal, Alert } from 'react-native';
import styles from '../styles.js';

export default class Bottle extends React.Component {
  state = {
    modalPaymentVisible: false,
    modalPrintVisible: false,
  };

  setModalPaymentVisible(visible) {
    this.setState({modalPaymentVisible: visible});
  }
  setModalPrintVisible(visible) {
    this.setState({modalPrintVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Bottle</Text>
       
      </View>
    );
  }
}