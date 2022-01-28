import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { Input } from 'react-native-elements';

export default function Recipes() {
  
  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState([]);
  
  const search = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + text)
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.search}>
        <Input
          value={text}
          placeholder="Search by ingredient..."
          leftIcon={{ name: 'search' }}
          onChangeText={input => setText(input)}
        />
        <Button onPress={search} title="search" />
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) =>
        <View>
          <Text style={{fontSize:18, fontWeight: "bold"}}>
            {item.strMeal}
          </Text>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: item.strMealThumb
            }}
          />
          </View>}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  search: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10
  },
});
