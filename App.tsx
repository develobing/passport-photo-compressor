import React, {FC} from 'react';
import AppNavigator from './app/navigation/AppNavigator';

interface Props {}

const App: FC<Props> = (): JSX.Element => {
  return <AppNavigator />;
};

export default App;
