import getStore from 'src/configs/store';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import { ChakraProvider } from '@chakra-ui/react';

// Get store
const store = getStore();

// Render UI
render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
