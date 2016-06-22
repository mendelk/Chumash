import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView
} from 'react-native';
import { getVerse, getRashi, getRashisLength } from './../data/helpers';
import { Verse } from './../components/Verse';

export class VerseScene extends Component {
  constructor (props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let rashis = Array.from(Array(getRashisLength(props)), (_,i) => i)
    // Array.from(Array(20), (_,i) => i)
    // let rashis = getRashis(Object.assign({}, props, {lang: 'he'}));
    console.log(rashis);
    this.state = {
      dataSource: ds.cloneWithRows(rashis)
    }
    
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0}}>
          <Verse {...this.props} />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }
  _renderRow (rashi) {
    let rashiHe = getRashi(Object.assign({}, this.props, {lang: 'he', rashi}))
    let rashiEn = getRashi(Object.assign({}, this.props, {lang: 'en', rashi}))
    return (
      <View style={styles.verse}>
        <View style={styles.verseContainer}>
          <Text style={styles.verseEn}>
            {rashiEn.text}
          </Text>
        </View>
        <View style={styles.verseContainer}>
          <Text style={styles.rashiHe}>
            <Text style={styles.rashiHeTitle}>
              {rashiHe.title}
            </Text>
            <Text style={styles.rashiHeText}>
              {rashiHe.text}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rashiHe: {
    margin: 5,
    color: '#333333',
    textAlign: 'left',
  },
  rashiHeTitle: {
    fontFamily: 'TaameyFrankCLM-Bold',
    fontSize: 20,    
  },
  rashiHeText: {
    fontFamily: 'Mekorot-Rashi',
    fontSize: 15,
  },
  verse: {
    flex: 1,
    flexDirection: 'row',
  },
  verseEn: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 12,
    margin: 5,
    color: '#333333',
    textAlign: 'right',
  },
  verseContainer: {
    flex: 0.5,
    margin: 5,
  },
});