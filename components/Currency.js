import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { Input } from 'react-native-elements';

export default function Currency() {
  //cc0d6e4a96439fc929c398db4c2c210e
  const [rates, setRates] = useState([]);
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState("USD");
  const [result, setResult] = useState("0");

  const fetchRates = () => {
    fetch("http://api.exchangeratesapi.io/latest?access_key=cc0d6e4a96439fc929c398db4c2c210e")
    .then(response => response.json())
    .then(data => setRates(data.rates))
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchRates();
  }, [])

  const convert = () => {
    if (number == "") {
      setResult(0);
    } else {
      setResult((parseInt(number)/rates[selected]).toFixed(2));
    }
    setNumber("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={{
          uri: "https://pixnio.com/free-images/2017/03/21/2017-03-21-08-49-05.jpg"
          //https://cdn.pixabay.com/photo/2018/04/23/15/35/coins-3344603_960_720.png
        }}
      />
      <Text style={{ fontSize: 22, marginBottom: "5%"}} >
        {result}€
      </Text>
      <View style={styles.row}>
        <Input
          style={styles.input}
          value={number}
          placeholder="0"
          keyboardType='numeric'
          onChangeText={input => setNumber(input)}
        />
        <Picker
          style={{width: 101}} //doesn't work on android without the weight attribute
          mode="dropdown"
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) =>
            setSelected(itemValue)
          }>
          {Object.keys(rates).map((key) => 
            <Picker.Item
              label={key}
              value={key}
              key={key}
            />)}
        </Picker>
      </View>
      <Button onPress={convert} title="Convert" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "30%"
  },
  image: {
    width: 200,
    height: 160,
    marginBottom: 35,
  },
  input: {
    marginTop: 25,
    paddingLeft: 4,
    textAlign: "center"
  }
});