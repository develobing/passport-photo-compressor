import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BackgroundImageEditor from '../components/BackgroundImageEditor';
import EditorTools from '../components/EditorTools';
import ImageEditorHeader from '../components/ImageEditorHeader';
import SelectedImage from '../components/SelectedImage';
import {RootStackParamList} from '../navigation/AppNavigator';
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from '../utils/imageSelector';
import ConfirmModal from '../components/ConfirmModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

let canGoBack = false;

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {imageUri} = route.params || {};
  const [showConfirmModal, setConfirmModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const displayConfirmModal = (): void => setConfirmModal(true);
  const hideConfirmModal = (): void => setConfirmModal(false);

  const captureImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();

    if (error) {
      return console.log('error', error);
    }

    setSelectedImage(path);
  };

  const selectImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();

    if (error) {
      return console.log('error', error);
    }

    setSelectedImage(path);
  };

  const preventBack = (e: any) => {
    if (canGoBack) {
      return;
    }

    e.preventDefault();
    displayConfirmModal();
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', preventBack);
    return () => {
      navigation.removeListener('beforeRemove', preventBack);
      canGoBack = false;
    };
  }, []);

  // Handling Back Press Manually
  const handleMoveToBackScreen = (): void => {
    canGoBack = true;
    hideConfirmModal();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageEditorHeader />
      <BackgroundImageEditor />

      <View style={styles.imageContainer}>
        <SelectedImage uri={selectedImage || imageUri} />
      </View>

      <EditorTools
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        message="Are you sure because this action will discard all your changes."
        onCancelPress={hideConfirmModal}
        onDiscardPress={handleMoveToBackScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageEditor;
