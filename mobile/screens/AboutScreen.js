/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * https://github.com/vonovak/react-navigation-header-buttons
 * Don't use WebView inside other View in render(). Otherwise it will not work.
 */

 import React from 'react';
 import { View, StyleSheet, WebView, StatusBar } from 'react-native';

 import Config from '../config/Settings';
 import { Platform } from 'expo-core';

 export default class AboutScreen extends React.Component {
  state = {
    url: ""
  }

  static navigationOptions = {
    title: Config.aboutScreenTitle,
  }

  componentDidMount(){
    /**
     * If Apple Store webpage provide, and user open the app in iOS
     * the apple webpage will be shown.
     * Same goes for Google Play.
     * If no Apple Store page or Google Play page but normal webpage only then normal web page will be open.
     */
    if (Platform.OS === 'ios') {
      if (Config.aboutiOSURL !== ""){
        this.setState({url: Config.aboutiOSURL});
      }
      else if (Config.aboutWebPage !== ""){
        this.setState({url: Config.aboutWebPage});
      }
    }
    else if (Platform.OS === 'android'){
      if (Config.aboutGooglePlayURL !== ""){
        this.setState({url: Config.aboutGooglePlayURL});
      }
      else if (Config.aboutWebPage !== ""){
        this.setState({url: Config.aboutWebPage});
      }
    }
  }

  render(){
    //console.log(this.state.url);
    return (
      <WebView styles={styles.container}
        originWhitelist={['*']}
        source={{uri: this.state.url}}
        useWebKit={true}  //iOS
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
      />
    )
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})