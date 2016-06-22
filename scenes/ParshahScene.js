import React, { Component } from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';
import { getParshah, expandRef } from './../data/helpers'
import { Verse } from './../components/Verse'

const ALIYA_SECTION_HEADERS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];
const ROW_IDENTITY_SPLITTER = ":";

export class ParshahScene extends Component {
  constructor (props) {
    super(props);
    let parshah = getParshah(props);
    let sectionIDs = [];
    let rowIDs = [];
    parshah.aliyaRefs.forEach((ref, index) => {
      sectionIDs.push(index);
      rowIDs[index] = [];
      expandRef({ref: ref, book: props.book}).forEach((verseRef, verseIndex) => {
        // verse is the "human" verse index within it's Chapter
        // verseIndex is the index of the verse within it's Aliya
        let [chapter, verse] = verseRef;
        rowIDs[index].push(`${chapter-1}${ROW_IDENTITY_SPLITTER}${verse-1}`)
      });
    });
    let ds = new ListView.DataSource({
      getRowData: (props, sectionID, rowID) => {
        let [chapter, verse] = rowID.split(ROW_IDENTITY_SPLITTER);
        return {book: props.book, chapter: parseInt(chapter), verse: parseInt(verse)};
      },
      getSectionHeaderData: (props, sectionID) => ALIYA_SECTION_HEADERS[sectionID],
      rowHasChanged: (r1, r2) => false,
      sectionHeaderHasChanged: (s1, s2) => false
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props, sectionIDs, rowIDs)
    }
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }
  _renderRow (verse) {
    return <Verse onPress={this._handleVersePress.bind(this, verse)} {...verse} />;
  }
  _renderSectionHeader (title) {
    return <Text>{title}</Text>;
  }
  _handleVersePress (verse) {
    return this.props.navigator.push({id: 'VerseScene', passProps: verse});
  }
}