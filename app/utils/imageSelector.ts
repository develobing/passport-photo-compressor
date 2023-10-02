import {Alert, PermissionsAndroid} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

export const requestCameraPermission = async (): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'You have to accept the permission to use the camera. Only then you will be able to capture the image.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    const {NEVER_ASK_AGAIN, DENIDED} = PermissionsAndroid.RESULTS;
    if (granted === NEVER_ASK_AGAIN) {
      return Alert.alert(
        'Failed to open camera',
        "It looks like you have denied the camera permission. You can't capture the image without camera permission.",
      );
    } else if (granted === DENIDED) {
      return Alert.alert(
        'Failed to open camera',
        "It looks like you have denied the camera permission. You can't capture the image without camera permission.",
      );
    }
  } catch (error) {
    console.log('requestCameraPermission() - error', error);
  }
};

type ImageResultType = {path: string; error: unknown | null};

export const selectAndCropImageFromCamera = async (
  width: number = 413,
  height: number = 531,
): Promise<ImageResultType> => {
  try {
    await requestCameraPermission();

    const imageInfo = await ImageCropPicker.openCamera({
      width,
      height,
      cropping: true,
    });
    const {path} = imageInfo;
    console.log('imageInfo', imageInfo);

    return {path, error: null};
  } catch (error) {
    console.log('handleImageCapture() - error', error);
    return {path: '', error};
  }
};

export const selectAndCropImageFromDevice = async (
  width: number = 413,
  height: number = 531,
): Promise<ImageResultType> => {
  try {
    await requestCameraPermission();

    const imageInfo = await ImageCropPicker.openPicker({
      width,
      height,
      cropping: true,
    });
    const {path} = imageInfo;
    console.log('imageInfo', imageInfo);

    return {path, error: null};
  } catch (error) {
    console.log('handleImageCapture() - error', error);
    return {path: '', error};
  }
};
