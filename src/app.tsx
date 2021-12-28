import React, { useEffect } from 'react';
import ConsoleScene from './components/ConsoleScene/console-scene';
import InputForm from './components/InputForm/input-form';
import OutputScene from './components/OutputScene/output-scene';
import { Caesar } from './functions/Caesar/caesar';
import Logger from './functions/logger';
import { MonoAlphabetic } from './functions/MonoAlphabetic/mono-alphabetic';
import PolyAlphabetic from './functions/PolyAlphabetic/poly-alphabetic';
import TinyDES from './functions/TinyDES/tiny-des';
import { setOutput } from './reducers/appReducer';
import { useAppDispatch, useAppSelector } from './store';
import './styles.css';

const App: React.FC = props => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.app.data);
  const logger = new Logger(dispatch);

  useEffect(() => {
    console.log(JSON.stringify(data));

    switch (data.algorithm) {
      case 'caesar':
        if (!data.isDecrypt) {
          logger.add('Caesar encrypt started');
          const caesar = new Caesar(data.content, +data.k, logger);
          const result = caesar.encrypt();
          logger.add('Caesar encrypt finished with result: ' + result);
          dispatch(setOutput(result));
        } else {
          logger.add('Caesar decrypt started');
          const caesar = new Caesar(data.content, +data.k, logger);
          const result = caesar.decrypt();
          logger.add('Caesar decrypt finished with result: ' + result);
          dispatch(setOutput(result));
        }
        break;
      case 'monoalphabetic':
        if (!data.isDecrypt) {
          logger.add('Monoalphabetic encrypt started');
          const mono = new MonoAlphabetic(data.content, data.k.toString(), logger);
          const result = mono.encrypt();
          logger.add('Monoalphabetic encrypt finished with result: ' + result);
          dispatch(setOutput(result));
        } else {
          logger.add('Monoalphabetic decrypt started');
          const mono = new MonoAlphabetic(data.content, data.k.toString(), logger);
          const result = mono.decrypt();
          logger.add('Monoalphabetic decrypt finished with result: ' + result);
          dispatch(setOutput(result));
        }
        break;
      case 'polyalphabetic':
        if (!data.isDecrypt) {
          logger.add('Poly-Alphabetic encrypt started');
          const poly = new PolyAlphabetic(data.content, data.k.toString(), logger);
          const result = poly.encrypt();
          logger.add('Poly-Alphabetic encrypt finished with result: ' + result);
          dispatch(setOutput(result));
        } else {
          logger.add('Poly-Alphabetic decrypt started');
          const poly = new PolyAlphabetic(data.content, data.k.toString(), logger);
          const result = poly.decrypt();
          logger.add('Poly-Alphabetic decrypt finished with result: ' + result);
          dispatch(setOutput(result));
        }
        break;
      case 'tinydes':
        logger.add('TinyDES encrypt started');
        const des = new TinyDES(logger);
        const result = des.encrypt(data.content, data.k.toString());
        logger.add('TinyDES encrypt finished with result: ' + result);
        dispatch(setOutput(result));
    }
  }, [data.algorithm, data.content, data.k, data.isDecrypt]);

  return (
    <>
      <div className="container" id="container">
        <div className="form-container">
          <InputForm />
          <OutputScene />
          <ConsoleScene />
        </div>
      </div>
    </>
  );
};

export default App;
