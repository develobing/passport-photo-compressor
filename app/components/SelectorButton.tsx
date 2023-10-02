import React, {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  title: string;
  children?: ReactNode;
  onPress?: () => void;
}

const SelectorButton: FC<Props> = ({title, children, onPress}): JSX.Element => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {Children.map(children, child => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child, {
          ...child.props,
          style: {...styles.btnIcon, ...child.props.style},
        });
      })}

      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: 'white',
    elevation: 15,
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#6c9ade',
  },

  btnLabel: {
    color: 'white',
  },

  btnIcon: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default SelectorButton;
