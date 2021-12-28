import { addLog } from '../../reducers/appReducer';
import { AppDispatch } from '../../store';
import { convertDecToBin, indexOf, swap } from '../data-utils';

/**
 * Mã hóa dự liệu bằng thuật toán RC4
 * @param table danh sách vị trí các kí tự
 * @param plaintext chuỗi kí tự cần mã hóa
 * @param k khóa mã hóa
 * @returns chuỗi kí tự đã được mã hóa
 */
const encrypt = (table: string, plaintext: string, k: string, dispatch: AppDispatch): string => {
  let s = Array(8).fill(0);
  let t = Array(8).fill(0);
  dispatch(addLog('s: ' + s + '<br>'));
  dispatch(addLog('t: ' + t + '<br>'));
  console.log('s: ' + s);
  console.log('t: ' + t);

  init(s, t, k);
  dispatch(addLog('Init s, t complete: <br>'));
  dispatch(addLog('s: ' + s + '<br>'));
  dispatch(addLog('t: ' + t + '<br>'));
  console.log('s: ' + s);
  console.log('t: ' + t);

  const key = generateKey(s, plaintext.length);
  dispatch(addLog('Key generated <br>'));
  dispatch(addLog('Key: ' + key + '<br>'));
  console.log('key: ' + key);

  let cipher = [];
  for (let i = 0; i < key.length; i++) {
    cipher.push(key[i] ^ indexOf(table, plaintext.charAt(i)));
  }
  dispatch(addLog('Cipher generated <br>'));
  dispatch(addLog('Cipher: ' + cipher + '<br>'));
  console.log('result: ' + cipher);

  let result = '';
  for (let i = 0; i < cipher.length; i++) {
    result += table.charAt(cipher[i]);
  }
  return result;
};

const decrypt = () => {};

const init = (s: number[], t: number[], k: string) => {
  // Khởi tạo mảng s và t
  for (let i = 0; i < 8; i++) {
    s[i] = i;
    t[i] = +k.charAt(i % k.length);
  }
  // Hoán vị dãy s
  let j = 0;
  for (let i = 0; i < 8; i++) {
    j = (j + s[i] + t[i]) % 8;
    swap(s, i, j);
  }
};

const generateKey = (s: number[], len: number) => {
  let i = 0;
  let j = 0;
  let key = [];

  while (len > 0) {
    i = (i + 1) % 8;
    j = (j + s[i]) % 8;
    console.log(`i: ${i}, j: ${j}`);
    swap(s, i, j);
    console.log(`s: ${s}`);
    const t = (s[i] + s[j]) % 8;
    key.push(s[t]);
    len--;
  }
  return key;
};

export { encrypt, decrypt };
