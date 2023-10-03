import {PermissionsAndroid} from 'react-native';

export const convertSizeInKb = (size: number): number => {
  return parseFloat((size / 1024).toFixed(2));
};

// checking for the permission
export const checkCameraPermission = async (): Promise<boolean> => {
  return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
};

export const takeReadAndWritePermissions = async (): Promise<boolean> => {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ]);

  console.log('result', result);

  const filePermission = result['android.permission.READ_MEDIA_IMAGES'];
  if (filePermission !== 'granted') {
    return false;
  }

  // const writePermission = result['android.permission.WRITE_EXTERNAL_STORAGE'];
  // const readPermission = result['android.permission.READ_EXTERNAL_STORAGE'];

  // if (writePermission !== 'granted' || readPermission !== 'granted') {
  //   return false;
  // }

  return true;
};
