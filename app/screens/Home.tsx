import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LargeIconButton from '../components/LargeIconButton';
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from '../utils/imageSelector';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {checkCameraPermission} from '../utils/helper';
import PermissionWarning from '../components/PermissionWarning';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Home: FC<Props> = ({navigation}): JSX.Element => {
  const [showPermissionInfoAlert, setShowPermissionInfoAlert] =
    useState<boolean>(false);

  const navigateToImageEditor = (uri: string): void => {
    navigation.navigate('ImageEditor', {imageUri: uri});
  };

  const handleImageCapture = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();

    if (error) {
      const isGranted = await checkCameraPermission();
      if (!isGranted) {
        return setShowPermissionInfoAlert(true);
      }
    }

    if (path) {
      navigateToImageEditor(path);
    }
  };

  const handleImageSelection = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();

    if (error) {
      return console.log('error', error);
    }

    if (path) {
      navigateToImageEditor(path);
    }
  };

  return (
    <View style={styles.container}>
      {/* App Titles */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose your Image</Text>
        <Text style={styles.secondaryText}>
          You can select your image using one of these option which you want to
          convert to password size.
        </Text>
      </View>

      {/* Capture Button */}
      <LargeIconButton title="Capture" onPress={handleImageCapture}>
        <Icon name="camera" />
      </LargeIconButton>

      {/* Image Select Button */}
      <LargeIconButton title="Capture" onPress={handleImageSelection}>
        <Icon name="folder-open" />
      </LargeIconButton>

      <PermissionWarning
        visible={showPermissionInfoAlert}
        title="Required Camera Permission"
        message="This app is heavily based on camera, so you need to grant camera permission to use this app."
        onClose={() => setShowPermissionInfoAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  title: {
    fontSize: 25,
    color: '#272727',
    fontWeight: '500',
    textAlign: 'center',
  },

  secondaryText: {
    textAlign: 'center',
    color: '#272727',
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 5,
  },
});

export default Home;
