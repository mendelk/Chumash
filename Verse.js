import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { getVerse } from './data/helpers';

export function Verse ({book, chapter, verse}) {
  return (
    <View style={{ flex: 1, flexDirection:'row' }}>
      <View style={styles.verseContainer}>
        <Text style={styles.verseEn}>{getVerse({book, chapter, verse, lang: 'en'}).text}</Text>
      </View>
      <View style={styles.verseContainer}>
        <Text style={styles.verseHe}>{getVerse({book, chapter, verse}).text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verseHe: {
    fontFamily: 'TaameyFrankCLM-Medium',
    fontSize: 20,
    margin: 5,
    color: '#333333',
    textAlign: 'left',
  },
  verseEn: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 15,
    margin: 5,
    color: '#333333',
    textAlign: 'right',
  },
  verseContainer: {
    flex: 0.5
  },
});
