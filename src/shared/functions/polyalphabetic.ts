import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { CryptorName } from './cryptor-factory';

export class PolyAlphabetic implements Cryptor {
  constructor(private logger: Logger) {}

  getName(): CryptorName {
    return 'polyalphabetic';
  }

  private resolveKey(key: string | number, data: string): string {
    let currentKey = key.toString();
    let i = 0;
    while (currentKey.length < data.length) {
      if (currentKey.length === i) {
        i = 0;
      }
      currentKey += key[i % key.toString().length];
      i++;
    }
    return currentKey;
  }

  encrypt(data: string, key: string | number): string {
    // make sure key length is equal to data length by
    // looping add char to key until key length is equal to data length
    const newKey = this.resolveKey(key, data);
    let result = '';
    for (let i = 0; i < data.length; i++) {
      let char = (data.charCodeAt(i) + newKey.charCodeAt(i)) % 26;
      char += 'A'.charCodeAt(0);
      this.logger.log({
        type: 'info',
        message: `${i}: ${data[i]} + ${newKey[i]} = ${String.fromCharCode(char)}`,
      });
      result += String.fromCharCode(char);
    }
    return result;
  }

  decrypt(data: string, key: string | number): string {
    const newKey = this.resolveKey(key, data);
    let result = '';
    for (let i = 0; i < data.length; i++) {
      let char = (data.charCodeAt(i) - newKey.charCodeAt(i) + 26) % 26;
      char += 'A'.charCodeAt(0);
      this.logger.log({
        type: 'info',
        message: `${i}: ${data[i]} + ${newKey[i]} = ${String.fromCharCode(char)}`,
      });
      result += String.fromCharCode(char);
    }
    return result;
  }
}
