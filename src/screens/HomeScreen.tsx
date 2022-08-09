import React from 'react';
import {Text, Image, FlatList, ActivityIndicator, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import {styles} from '../theme/appTheme';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemons, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('./../assets/pokebola.png')}
        style={styles.pokebola}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simplePokemons}
          keyExtractor={pokemon => pokemon.id}
          numColumns={2}
          //header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //infiniteScroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};

export default HomeScreen;
