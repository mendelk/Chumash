import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

export function HebrewTitle (props) {
  return <Text onPress={props.onPress} style={styles.title}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'TaameyFrankCLM-Bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    color: '#333333',
  },
});
