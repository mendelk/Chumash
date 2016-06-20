import React, { Component } from 'react';
import {
  View,
  ListView
} from 'react-native';
import { HebrewTitle } from './HebrewTitle'

export class BooksScene extends Component {
  constructor (props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.heTitle !== r2.heTitle});
    this.state = {
      dataSource: ds.cloneWithRows(props.books)
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
  _renderRow (book) {
    return <HebrewTitle text={book.heTitle} onPress={this._handleRowPress.bind(this, book)} />;
  }
  _handleRowPress (book) {
    return this.props.navigator.push({id: 'ParshahsScene', passProps: {parshahs: book.parshahs}});
  }
}
