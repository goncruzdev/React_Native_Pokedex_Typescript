import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  const navigation = useNavigation();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    }).then(colors => {
      if (!isMounted.current) {
        return;
      }

      if (colors.platform === 'android') {
        setBgColor(colors.dominant || 'grey');
      } else {
        setBgColor(colors.background || 'grey');
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainder}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -7,
    bottom: -5,
  },
  pokebolaContainder: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
