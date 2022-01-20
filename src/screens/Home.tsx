import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, TextInput, View} from 'react-native';
import Button from '../components/Button';
import {ListItem, RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  updateList: Function;
};

function Home({navigation, updateList}: Props) {
  const [text, setText] = useState('');

  const onChangeTextInput = (value: string) => {
    setText(value);
  };

  const handleClick = () => {
    console.log(text);
    updateList((list: Array<ListItem>) => [
      {
        id: Date.now(),
        title: text,
      },
      ...list,
    ]);
    navigation.navigate('List');
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeTextInput}
      />
      <Button title="Add Text" onPress={handleClick} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 300,
    borderColor: 'gray',
  },
});
