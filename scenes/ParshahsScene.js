import React, { Component } from 'react';
import {
  View,
  ListView
} from 'react-native';
import { getParshahs } from './../data/helpers'
import { HebrewTitle } from './../components/HebrewTitle'

export class ParshahsScene extends Component {
  constructor (props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});
    let parshahs = getParshahs({ book: props.book });
    this.state = {
      dataSource: ds.cloneWithRows(parshahs)
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
    return <HebrewTitle text={parshah.title} onPress={this._handleRowPress.bind(this, parshah)} />;
  }
  _handleRowPress (parshah) {
    return this.props.navigator.push({id: 'ParshahScene', passProps: { book: parshah.book, parshah: parshah.index }});
  }
}