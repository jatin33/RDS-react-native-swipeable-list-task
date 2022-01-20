// import Swipeable from 'react-native-swipeable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useRef} from 'react';
import {Animated, LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import {ListItem} from '../types';

type Props = {
  item: ListItem;
  index: number;
  deleteItem: (id: number) => void;
  setShowUndoOption: Function;
  setUndoable: Function;
};

const AnimatedView = Animated.createAnimatedComponent(View);

function SwipeableRow({
  item,
  deleteItem,
  setUndoable,
  setShowUndoOption,
  index,
}: Props) {
  const ref = useRef(null);

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <AnimatedView style={[styles.delete, {opacity}]}>
        <Text style={styles.deleteText}>Delete</Text>
      </AnimatedView>
    );
  };

  const handleOnSwipeableRightOpen = () => {
    setShowUndoOption((s: boolean) => !s);
    setUndoable({
      index,
      id: item.id,
      title: item.title,
    });
    setTimeout(() => {
      setShowUndoOption(false);
      setUndoable(undefined);
    }, 3000);
    deleteItem(item.id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  return (
    <>
      <Swipeable
        ref={ref}
        friction={2}
        rightThreshold={120}
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={handleOnSwipeableRightOpen}>
        <View style={styles.container}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </Swipeable>
    </>
  );
}

export default SwipeableRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#99A799',
    height: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  delete: {
    backgroundColor: '#DD4A48',
    height: 70,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
  },
  deleteText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
