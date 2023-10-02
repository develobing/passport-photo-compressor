import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import UtilityButtons from './UtilityButtons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';

interface Props {}

const ImageEditorHeader: FC<Props> = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <UtilityButtons.Back onPress={() => navigation.navigate('Home')} />
      {/* <UtilityButtons.Back onPress={navigation.goBack} /> */}

      {/* Save button */}
      <UtilityButtons.Save />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ImageEditorHeader;
