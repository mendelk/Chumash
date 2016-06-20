import React, { Component } from 'react';
import {
  ListView,
  Text
} from 'react-native';
import { Verse } from './Verse'

export class Chapter extends Component {
  constructor (props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.verses)
    }
  }
  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Verse text={rowData} />}
      />
    );
  }
}
