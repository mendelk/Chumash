import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { getVerse, hasRashi } from './../data/helpers';

export class Verse extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <View style={[styles.verse, hasRashi(this.props) && styles.verseWithRashi]}>
        <View style={styles.verseContainer}>
          <Text
            onPress={this.props.onPress}
            style={styles.verseEn}>{getVerse(Object.assign({}, this.props, {lang: 'en'})).text}
          </Text>
        </View>
        <View style={styles.verseContainer}>
          <Text
            onPress={this.props.onPress}
            style={styles.verseHe}>{getVerse(this.props).text}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verse: {
    flex: 1,
    flexDirection: 'row',
  },
  verseWithRashi: {
    backgroundColor: '#F5FCFF'
  },
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
