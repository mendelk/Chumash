import React, { Component } from 'react';
import {
  View,
  ListView
} from 'react-native';
import { getBooks } from './../data/helpers'
import { HebrewTitle } from './../components/HebrewTitle'

export class BooksScene extends Component {
  constructor (props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});
    let books = getBooks();
    this.state = {
      dataSource: ds.cloneWithRows(books)
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
    return <HebrewTitle text={book.title} onPress={this._handleRowPress.bind(this, book)} />;
  }
  _handleRowPress (book) {
    return this.props.navigator.push({id: 'ParshahsScene', passProps: { book: book.index }});
  }
}
