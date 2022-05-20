import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { CryptorName } from './cryptor-factory';

export class MonoAlphabetic implements Cryptor {
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private logger: Logger) {}

  getName(): CryptorName {
    return 'monoalphabetic';
  }

  encrypt(data: string, key: string | number): string {
    let cipher = '';
    for (let i = 0; i < data.length; i++) {
      // the character to be encrypted
      const char = data.charAt(i);
      const index = this.alphabet.indexOf(char);
      if (index >= 0) {
        // the char at the index of the key
        cipher += key.toString().charAt(index);
      } else {
        cipher += char;
      }
    }
    return cipher;
  }

  decrypt(data: string, key: string | number): string {
    let plain = '';
    for (let i = 0; i < data.length; i++) {
      const char = data.charAt(i);
      const index = key.toString().indexOf(char);
      if (index >= 0) {
        plain += this.alphabet.charAt(index);
      } else {
        plain += char;
      }
    }
    return plain;
  }
}
