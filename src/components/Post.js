import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foto: { ...this.props.foto, likers: [{}], comentarios: [{ id: 1, login: 'meuUsuario', texto: 'Que bela foto' }] },
      valorComentario: ''
    }
  }

  carregaIcone(likeada) {
    return likeada ?
      require('../../resources/img/s2-checked.png') :
      require('../../resources/img/s2.png')
  }

  like() {
    const { foto } = this.state;

    let novaLista = []

    if (!foto.likeada) {
      novaLista = [...foto.likers, { login: 'meuUsuario' }]
    }
    else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    this.setState({ foto: fotoAtualizada })
  }

  exibeLikes(likers) {

    if (likers.length <= 0) {
      return null;
    }

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : ' curtida'}
      </Text>
    );
  }

  exibeLegenda(foto) {
    if (foto.comentario.length <= 0) {
      return null;
    }

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  adicionaComentario() {

    if (this.state.valorComentario == '') {
      console.warn('Comentário vazio');
    }
    else {
      const { foto } = this.state;

      let novaLista = []

      novaLista = [...foto.comentarios, { id: foto.comentarios.length + 1, login: 'meuUsuario', texto: this.state.valorComentario }]

      const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
      }

      this.setState({ foto: fotoAtualizada, valorComentario: '' })
      this.inputComentario.clear();
    }
  }

  render() {
    const { foto } = this.state;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image
            source={{ uri: foto.urlPerfil }}
            style={styles.fotoPerfil}
          />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image
          source={{ uri: foto.urlFoto }}
          style={styles.fotoPost}
        />
        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image
              source={this.carregaIcone(foto.likeada)}
              style={styles.botaoLike}
            />
          </TouchableOpacity>

          {this.exibeLikes(foto.likers)}
          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <View style={styles.novoComentario}>
            <TextInput
              style={styles.input}
              placeholder='Adicione um comentário...'
              ref={input => this.inputComentario = input}
              onChangeText={texto => this.setState({ valorComentario: texto })}
            />

            <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
              <Image
                style={styles.icone}
                source={require('../../resources/img/send.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoPerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  fotoPost: {
    width: width,
    height: width
  },
  botaoLike: {
    marginBottom: 10,
    height: 40,
    width: 40
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  input: {
    flex: 1,
    height: 40
  },
  icone: {
    height: 30,
    width: 30
  }
})