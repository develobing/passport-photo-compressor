import LottieView from 'lottie-react-native';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  visible: boolean;
  onFinish?: () => void;
}

const DoneLottie: FC<Props> = ({visible, onFinish}): JSX.Element | null => {
  if (!visible) {
    return null;
  }

  return (
    <LottieView
      source={require('../source/done.json')}
      autoPlay
      loop={false}
      style={styles.container}
      onAnimationFinish={onFinish}
    />
  );
};

const styles = StyleSheet.create({
  container: {width: 200, height: 200},
});

export default DoneLottie;
