import React, { Component } from 'react';
import {
  View,
  ListView
} from 'react-native';
import { HebrewTitle } from './HebrewTitle'

export class ParshahsScene extends Component {
  constructor (props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.heTitle !== r2.heTitle});
    this.state = {
      dataSource: ds.cloneWithRows(props.parshahs)
    }
  }
  render () {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }
  _renderRow (parshah) {
    return <HebrewTitle text={parshah.heTitle} onPress={this._handleRowPress.bind(this, parshah)} />;
  }
  _handleRowPress (parshah) {
    return this.props.navigator.push({id: 'ParshahScreen', passProps: parshah});
  }
}