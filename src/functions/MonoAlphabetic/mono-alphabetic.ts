import { throws } from 'assert';
import Logger from '../logger';

export class MonoAlphabetic {
  private logger: Logger;
  private str: string;
  private key: string;
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(str: string, key: string, logger: Logger) {
    this.logger = logger;
    this.str = str;
    this.key = key;
  }

  encrypt(): string {
    let cipher = '';
    for (let i = 0; i < this.str.length; i++) {
      let char = this.str.charAt(i); // kí tự cần mã hóa
      let index = this.alphabet.indexOf(char); // vị trí mới của kí tự trong chuổi key
      if (index >= 0) {
        cipher += this.key.charAt(index);
        this.logger.add(`${i}: ${char} -> ${this.key.charAt(index)}`);
      } else {
        cipher += char;
        this.logger.add("Can't find character in key");
      }
    }
    return cipher;
  }

  decrypt(): string {
    let plain = '';
    for (let i = 0; i < this.str.length; i++) {
      let char = this.str.charAt(i);
      let index = this.key.indexOf(char);
      if (index >= 0) {
        plain += this.alphabet.charAt(index);
        this.logger.add(`${i}: ${char} -> ${this.alphabet.charAt(index)}`);
      } else {
        plain += char;
        this.logger.add("Can't find character in key");
      }
    }
    return plain;
  }
}
