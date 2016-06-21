import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

export function HebrewTitle ({ onPress, text}) {
  return <Text onPress={onPress} style={styles.title}>{text}</Text>;
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
