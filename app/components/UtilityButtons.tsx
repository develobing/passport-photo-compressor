import React, {FC} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress?: () => void;
}

type ButtonComponent = FC<Props>;

const Back: ButtonComponent = ({onPress}): JSX.Element => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon name="arrow-left" style={styles.icon} />
    </Pressable>
  );
};

const Save: ButtonComponent = ({onPress}): JSX.Element => {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name="file-download" style={styles.icon} />
      </Pressable>

      <Text style={styles.btnTitle}>Save</Text>
    </View>
  );
};

const UtilityButtons: {Back: ButtonComponent; Save: ButtonComponent} = {
  Save,
  Back,
};

const buttonDim = 45;
const styles = StyleSheet.create({
  button: {
    height: buttonDim,
    width: buttonDim,
    backgroundColor: 'white',
    borderRadius: buttonDim / 2,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
    color: '#6c9ade',
  },

  btnTitle: {
    color: '#6c9ade',
    alignSelf: 'center',
  },
});

export default UtilityButtons;
