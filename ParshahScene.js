import React, { Component } from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';
import { Verse } from './Verse'

const ALIYA_SECTION_HEADERS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];
const ROW_IDENTITY_SPLITTER = ":";

export class ParshahScene extends Component {
  constructor (props) {
    super(props);
    let ds = new ListView.DataSource({
      getRowData: (props, sectionIdentity, rowIdentity) => {
        [aliyaIndex, verseIndex] = rowIdentity.split(ROW_IDENTITY_SPLITTER);
        return props.aliyos[aliyaIndex][verseIndex];
      },
      getSectionHeaderData: (props, sectionIdentity) => ALIYA_SECTION_HEADERS[sectionIdentity],
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    let sectionIdentities = [0,1,2,3,4,5,6];
    let rowIdentities = [];
    sectionIdentities.forEach((sectionIdentity, index) => {
      rowIdentities[index] = [];
      props.aliyos[index].forEach((verse, verseIndex) => {
        rowIdentities[index].push(`${index}${ROW_IDENTITY_SPLITTER}${verseIndex}`)
      });
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props, sectionIdentities, rowIdentities)
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
    return <Verse text={verse} />;
  }
  _renderSectionHeader (title) {
    return (
      <View>
        <Text>{title}</Text>
      </View>      
    );
  }
}