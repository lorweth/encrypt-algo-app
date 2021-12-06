import React, { useEffect } from 'react';
import TerminalDisplay from './components/terminal-display';
import { encrypt } from './functions/RC4_encrypt/RC4';
import { setContent } from './reducers/terminalReducer';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import CipherForm from './components/cipher-form';
import OutputDisplay from './components/output-display';
import { setLog, setOutput } from './reducers/appReducer';
import './styles.css';
import Footer from './components/footer';

const funlog =
  'Hacking Nasa ............... 0%<br>Hacking Nasa ............... 30%<br>Hacking Nasa ............... 50%<br>Hacking Nasa ............... 60%<br>Hacking Nasa ............... 95%<br>Hacking Nasa ............... 100%';

const funoutput = 'Hacked Nasa';

const table = 'ABCDEFG';

const App: React.FC = props => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.app.data);

  useEffect(() => {
    dispatch(setLog(funlog));
    dispatch(setOutput(funoutput));
  }, []);

  useEffect(() => {
    if (data.plaintext != '' && data.k != '') {
      const { plaintext, k } = data;
      dispatch(setLog(''));
      const ciphertext = encrypt(table, plaintext, k, dispatch);

      dispatch(setOutput(ciphertext));
    }
  }, [data.plaintext, data.k]);

  return (
    <>
      <h1 className="title">Ứng dụng Mã hóa/Giải mã bằng các thuật toán cô dạy</h1>
      <div className="container" id="container">
        <div className="form-container">
          <CipherForm />
        </div>
        <div className="form-container overlay-container">
          <div className="overlay">
            <div className="overlay-panel">
              <OutputDisplay />
              <TerminalDisplay />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
