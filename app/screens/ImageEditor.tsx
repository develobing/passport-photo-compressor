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
import fsModule from '../modules/fsModule';
import {convertSizeInKb, takeReadAndWritePermissions} from '../utils/helper';
import BusyLoading from '../components/BusyLoading';
import DoneLottie from '../components/DoneLottie';
import PermissionWarning from '../components/PermissionWarning';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

let canGoBack = false;

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {imageUri} = route.params || {};
  const [showConfirmModal, setConfirmModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(imageUri);
  const [compressedImage, setCompressedImage] = useState<string>(imageUri);
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressValue, setCompressValue] = useState<number>(1);
  const [compressedPercentage, setCompressedPercentage] = useState<number>(100);
  const [compressionStarts, setCompressionStarts] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [processFinished, setProcessFinished] = useState<boolean>(false);
  const [permissionWarning, setPermissionWarning] = useState<boolean>(false);

  const resetActivity = (): void => {
    setCompressValue(1);
    setCompressedPercentage(100);
    setCompressedImage('');
  };

  const displayConfirmModal = (): void => setConfirmModal(true);
  const hideConfirmModal = (): void => setConfirmModal(false);

  const captureImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();

    if (error) {
      return console.log('error', error);
    }

    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const selectImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();

    if (error) {
      return console.log('error', error);
    }

    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const preventBack = (e: any) => {
    if (canGoBack) {
      return;
    }

    e.preventDefault();
    displayConfirmModal();
  };

  const getImageSize = async (imageUri: string): Promise<void> => {
    const uri = imageUri.split('file:///')[1];
    const size = await fsModule.getSize(uri);
    setFileSize(convertSizeInKb(size));
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', preventBack);

    return () => {
      navigation.removeListener('beforeRemove', preventBack);
      canGoBack = false;
    };
  }, []);

  useEffect(() => {
    if (imageUri && !selectedImage) {
      setSelectedImage(imageUri);
      getImageSize(imageUri);
    }
  }, [imageUri]);

  // Handling Back Press Manually
  const handleMoveToBackScreen = (): void => {
    canGoBack = true;
    hideConfirmModal();
    navigation.navigate('Home');
  };

  const handleImageCompress = async (value: number): Promise<void> => {
    if (!compressionStarts) {
      return;
    }

    setBusy(true);
    const compressPercent: number = Math.floor(value * 100);
    const uri = selectedImage.split('file:///')[1];
    const result = await fsModule.compressImage(uri, compressPercent);
    console.log('result', result);
    setBusy(false);

    setFileSize(convertSizeInKb(result.size));
    setCompressedImage('file:///' + result.uri);
    setCompressedPercentage(Math.round(value * 100));
  };

  const updateCompressValue = (value: number): void => {
    setCompressValue(value);
  };

  const handleImageSave = async (): Promise<void> => {
    try {
      const isGranted = await takeReadAndWritePermissions();

      if (!isGranted) {
        return setPermissionWarning(true);
      }

      const name = 'pp-' + Date.now();
      const uri: string = compressedImage.split('file:///')[1];
      const compressPercent: number = Math.floor(compressValue * 100);
      const result = await fsModule.saveImageToDevice(
        uri,
        name,
        compressPercent,
      );

      console.log('result', result);

      if (result === 'Done') {
        setProcessFinished(true);
      }
    } catch (error) {
      console.log('handleImageSave() - error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageEditorHeader onSavePress={handleImageSave} />
      <BackgroundImageEditor />

      <View style={styles.imageContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {(busy || processFinished) && (
            <>
              <BusyLoading visible={busy} />
              <DoneLottie
                visible={processFinished}
                onFinish={() => setProcessFinished(false)}
              />
            </>
          )}
        </SelectedImage>
      </View>

      <EditorTools
        fileSize={fileSize}
        compressValue={compressValue}
        compressedPercentage={compressedPercentage}
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
        onSliderChange={handleImageCompress}
        onSlidingStart={() => setCompressionStarts(true)}
        onSlidingComplete={updateCompressValue}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        message="Are you sure because this action will discard all your changes."
        primaryBtnTitle="Cancel"
        dangerBtnTitle="Discard"
        onPrimaryBtnPress={hideConfirmModal}
        onDangerBtnPress={handleMoveToBackScreen}
      />

      <PermissionWarning
        visible={permissionWarning}
        title="Required File Write Permission"
        message="This app needs the permission to save this file inside your device!"
        onClose={() => setPermissionWarning(false)}
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
