import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Fontisto, MaterialIcons } from '@expo/vector-icons';  

import Recipes from './components/Recipes';
import Currency from './components/Currency';

const screenOptions = ({ route }) => ({
  tabBarIcon: () => {
    if (route.name === 'Recipes') {
      return <MaterialCommunityIcons name="food-variant" size={24} color="black" />;
    } else if (route.name === 'Currency') {
      //return <Fontisto name="money-symbol" size={24} color="black" />
      return <MaterialIcons name="attach-money" size={24} color="black" />
    }
  }
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Recipes" component={Recipes} />
        <Tab.Screen name="Currency" component={Currency} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
