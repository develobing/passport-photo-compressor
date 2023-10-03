import React, {FC} from 'react';
import {Linking, StyleSheet} from 'react-native';
import ConfirmModal from './ConfirmModal';

interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
}
const PermissionWarning: FC<Props> = ({
  visible,
  title,
  message,
  onClose,
}): JSX.Element => {
  const handleOpenSettings = (): void => {
    Linking.openSettings();

    if (onClose) {
      onClose();
    }
  };

  return (
    <ConfirmModal
      visible={visible}
      title={title}
      message={message}
      primaryBtnTitle="Open Settings"
      dangerBtnTitle="I will not!"
      onPrimaryBtnPress={handleOpenSettings}
      onDangerBtnPress={onClose}
    />
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

export default PermissionWarning;
