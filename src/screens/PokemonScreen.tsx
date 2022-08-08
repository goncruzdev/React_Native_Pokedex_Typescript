import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;

  return (
    <View>
      <Text style={{color}}>
        {simplePokemon.name} - {color}
      </Text>
    </View>
  );
};

export default PokemonScreen;
