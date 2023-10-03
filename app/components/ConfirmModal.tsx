import React, {FC} from 'react';
import {View, StyleSheet, Modal, Text, Pressable} from 'react-native';

interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
  primaryBtnTitle: string;
  dangerBtnTitle: string;
  onPrimaryBtnPress?: () => void;
  onDangerBtnPress?: () => void;
}
const ConfirmModal: FC<Props> = ({
  visible,
  title,
  message,
  primaryBtnTitle,
  dangerBtnTitle,
  onPrimaryBtnPress,
  onDangerBtnPress,
}): JSX.Element => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalTitle}>{title}</Text>

            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.btnContainer}>
            <Pressable
              style={[styles.commonBtnStyle, styles.cancel]}
              onPress={onPrimaryBtnPress}>
              <Text>{primaryBtnTitle}</Text>
            </Pressable>

            <Pressable
              style={[styles.commonBtnStyle, styles.discard]}
              onPress={onDangerBtnPress}>
              <Text style={styles.discardText}>{dangerBtnTitle}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  modal: {
    width: '85%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 7,
  },

  modalTitle: {
    color: '#6c9ade',
    fontSize: 16,
    fontWeight: '500',
  },

  message: {
    color: '#272727',
    opacity: 0.8,
    lineHeight: 20,
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  commonBtnStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  cancel: {
    borderWidth: 1.5,
    borderColor: '#6c9ade',
  },

  discard: {
    backgroundColor: '#d53649',
    marginLeft: 15,
  },

  discardText: {
    color: 'white',
  },
});

export default ConfirmModal;
