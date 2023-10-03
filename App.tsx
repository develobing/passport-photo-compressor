import React, {FC, useEffect} from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import BootSplash from 'react-native-bootsplash';

interface Props {}

const App: FC<Props> = (): JSX.Element => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return <AppNavigator />;
};

export default App;
