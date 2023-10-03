import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectorButton from './SelectorButton';
import Slider from '@react-native-community/slider';

interface Props {
  fileSize?: number;
  compressValue?: number;
  compressedPercentage?: number;
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
  onSliderChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

const EditorTools: FC<Props> = ({
  fileSize,
  compressValue,
  compressedPercentage,
  onSelectAnother,
  onCaptureAnother,
  onSliderChange,
  onSlidingStart,
  onSlidingComplete,
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
        <Text style={styles.label}>Compressed to: {compressedPercentage}%</Text>
        <Text style={styles.label}>Image size: {fileSize}KB</Text>
      </View>

      <Slider
        minimumValue={0.1}
        maximumValue={1}
        value={compressValue}
        style={styles.sliderContainer}
        minimumTrackTintColor="rgba(108, 154, 222, 0.8)"
        maximumTrackTintColor="rgb(108, 154, 222)"
        thumbTintColor="rgb(108, 154, 222)"
        onValueChange={onSliderChange}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
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
    fontSize: 16,
  },

  sliderContainer: {
    paddingVertical: 10,
  },
});

export default EditorTools;
