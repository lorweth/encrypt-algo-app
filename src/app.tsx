import React, { useEffect } from 'react';
import ConsoleScene from './components/ConsoleScene/console-scene';
import Footer from './components/footer';
import InputForm from './components/InputForm/input-form';
import OutputScene from './components/OutputScene/output-scene';
import { Caesar } from './functions/Caesar/caesar';
import { Logger } from './functions/logger';
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
      <Footer />
    </>
  );
};

export default App;
