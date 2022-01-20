/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import type {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListItem, RootStackParamList, UndoListItem} from './src/types';
import List from './src/screens/List';
import Home from './src/screens/Home';
import {LayoutAnimation} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: () => ReactNode = () => {
  // adding state list and callback to update the state list
  const [list, setList] = useState<Array<ListItem>>([]);
  const [undoable, setUndoable] = useState<UndoListItem>();
  const [showUndoOption, setShowUndoOption] = useState(false);

  const deleteItem = useCallback(
    (id: number) => {
      setList(list.filter((item: ListItem) => item.id !== id));
    },
    [list.length],
  );

  const undo = useCallback(() => {
    // needs to add index
    // setList(list.filter((item: ListItem) => item.id !== id));
    if (!undoable) {
      return;
    }
    const position = undoable.index;
    const copy = [...list];
    copy.splice(position, 0, {
      id: undoable.id,
      title: undoable.title,
    });
    setList(copy);
    setShowUndoOption(false);
  }, [list.length]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="List"
          component={props => (
            <List
              list={list}
              undo={undo}
              deleteItem={deleteItem}
              setUndoable={setUndoable}
              setShowUndoOption={setShowUndoOption}
              showUndoOption={showUndoOption}
              {...props}
            />
          )}
        />
        <Stack.Screen
          name="Home"
          component={props => <Home updateList={setList} {...props} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
