import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Button from '../components/Button';
import SwipeableRow from '../components/SwipeableRow';
import {ListItem, UndoListItem} from '../types';

type Props = {
  list: Array<ListItem>;
  deleteItem: (id: number) => void;
  undo: () => void;
  setUndoable: Function;
  showUndoOption: boolean;
  setShowUndoOption: Function;
};

function List({
  list,
  deleteItem,
  undo,
  setUndoable,
  showUndoOption,
  setShowUndoOption,
}: Props) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View>
        {showUndoOption && <Button title="Undo" onPress={undo} />}
        <Text>List...</Text>
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <SwipeableRow
              item={item}
              index={index}
              setShowUndoOption={setShowUndoOption}
              deleteItem={deleteItem}
              setUndoable={setUndoable}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 2,
              }}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </GestureHandlerRootView>
  );
}

export default List;
