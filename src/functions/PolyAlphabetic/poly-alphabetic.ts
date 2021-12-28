import Logger from '../logger';

export default class PolyAlphabetic {
  str: string;
  key: string;
  logger: Logger;

  constructor(str: string, key: string, logger: Logger) {
    this.str = str;
    this.key = key;
    this.logger = logger;
  }

  updateKey() {
    let currentKey = this.key;

    let i = 0;
    while (currentKey.length < this.str.length) {
      if (this.key.length === i) {
        i = 0;
      }
      currentKey += this.key[i];
      this.logger.add(`Key: ${currentKey}`);
      i++;
    }

    this.key = currentKey;
  }

  encrypt() {
    this.updateKey();

    let cipher = '';

    for (let i = 0; i < this.str.length; i++) {
      let char = (this.str[i].charCodeAt(0) + this.key[i].charCodeAt(0)) % 26;
      char += 'A'.charCodeAt(0);
      this.logger.add(`${i}: ${this.str[i]} + ${this.key[i]} = ${String.fromCharCode(char)}`);
      cipher += String.fromCharCode(char);
    }
    return cipher;
  }

  decrypt() {
    this.updateKey();

    let plain = '';

    for (let i = 0; i < this.str.length; i++) {
      let char = (this.str[i].charCodeAt(0) - this.key[i].charCodeAt(0) + 26) % 26;
      char += 'A'.charCodeAt(0);
      this.logger.add(`${i}: ${this.str[i]} - ${this.key[i]} = ${String.fromCharCode(char)}`);
      plain += String.fromCharCode(char);
    }
    return plain;
  }
}
