/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  BackAndroid
} from 'react-native';
import { BooksScene } from './scenes/BooksScene';
import { ParshahsScene } from './scenes/ParshahsScene';
import { ParshahScene } from './scenes/ParshahScene';
import { VerseScene } from './scenes/VerseScene';

var navigator; 

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});

class Chumash extends Component {
  render() {
    return (
      <Navigator  
        ref={(nav) => { navigator = nav; }}
        initialRoute={{id: 'BooksScene', passProps: {}}}
        renderScene={this.renderScene.bind(this)}
        configureScene={() => Navigator.SceneConfigs.FloatFromLeft}
      />
    );
  }
  renderScene(route, navigator) {
    let routeId = route.id;
    if (routeId === 'BooksScene') {
      return <BooksScene navigator={navigator} {...route.passProps} />;
    }
    if (routeId === 'ParshahsScene') {
      return <ParshahsScene navigator={navigator} {...route.passProps} />;
    }
    if (routeId === 'ParshahScene') {
      return <ParshahScene navigator={navigator} {...route.passProps} />;
    }
    if (routeId === 'VerseScene') {
      return <VerseScene navigator={navigator} {...route.passProps} />;
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Chumash', () => Chumash);
