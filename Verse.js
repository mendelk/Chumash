import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

export class Verse extends Component {
  render () {
    return <Text style={styles.verse}>{this.props.text}</Text>;
  }
}

const styles = StyleSheet.create({
  verse: {
    fontFamily: 'TaameyFrankCLM-Medium',
    fontSize: 20,
    margin: 5,
    color: '#333333',
  },
});
