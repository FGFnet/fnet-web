import React from 'react';

import { PaperProvider, NavigationProvider } from './providers';
import { Provider as ReduxProvider } from 'react-redux';
import { makeStore } from './store/makeStore';

const App = () => {
  const store = makeStore()

  return (
    <PaperProvider>
      <ReduxProvider store={store}>
        <NavigationProvider/>
      </ReduxProvider>
    </PaperProvider>
  )
}

export default App;
