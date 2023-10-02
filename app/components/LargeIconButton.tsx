import React, {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  title?: string;
  children?: ReactNode;
  onPress?: () => void;
}

const LargeIconButton: FC<Props> = ({
  title,
  children,
  onPress,
}): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      {/* Capture Button */}

      <TouchableOpacity style={styles.button} onPress={onPress}>
        {Children.map(children, child => {
          if (!isValidElement(child)) {
            return null;
          }
          return cloneElement(child, {
            ...child.props,
            style: {...styles.icon, ...child.props.style},
          });
        })}
        {/* <Icon name={iconName} style={styles.icon} /> */}
      </TouchableOpacity>
      <Text style={styles.btnLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 25,
  },

  button: {
    width: '100%',
    height: '100%',
    borderColor: '#6c9ade',
    borderWidth: 4,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLabel: {
    textAlign: 'center',
    fontWeight: '500',
  },

  icon: {
    color: '#6c9ade',
    fontSize: 55,
  },
});

export default LargeIconButton;
