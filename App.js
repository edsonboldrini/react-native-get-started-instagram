/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native';



import Post from './src/components/Post';

const width = Dimensions.get('screen').width;

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
      .catch(e => {
        console.warn('Não foi possível carregar as fotos: ' + e);
        this.setState({ status: 'ERRO' })
      });
  }

  render() {
    console.log(this.state.fotos);

    return (
      <FlatList
        style={styles.container}
        data={this.state.fotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})