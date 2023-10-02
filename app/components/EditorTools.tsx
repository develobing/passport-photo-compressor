import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectorButton from './SelectorButton';
import Slider from '@react-native-community/slider';

interface Props {
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
}

const EditorTools: FC<Props> = ({
  onSelectAnother,
  onCaptureAnother,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <SelectorButton title="Select Another" onPress={onSelectAnother}>
          <Icon name="folder-open" />
        </SelectorButton>

        <SelectorButton title="Capture Another" onPress={onCaptureAnother}>
          <Icon name="camera" />
        </SelectorButton>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Compressed to: 50%</Text>
        <Text style={styles.label}>Image size: 50KB</Text>
      </View>

      <Slider
        style={styles.sliderContainer}
        minimumTrackTintColor="rgba(108, 154, 222, 0.8)"
        maximumTrackTintColor="rgb(108, 154, 222)"
        thumbTintColor="rgb(108, 154, 222)"
      />
    </View>
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

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  label: {
    color: '#272727',
    fontSize: 18,
  },

  sliderContainer: {
    paddingVertical: 10,
  },
});

export default EditorTools;
