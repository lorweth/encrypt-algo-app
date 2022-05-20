import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { CryptorName } from './cryptor-list';

export class Caesar implements Cryptor {
  constructor(private logger: Logger) {}

  getName(): CryptorName {
    return 'caesar';
  }

  encrypt(data: string, key: string | number): string {
    let cipher = '';
    for (let i = 0; i < data.length; i++) {
      this.logger.log({ type: 'info', message: `Encrypting char ${data[i]}` });

      // 65 is the ASCII code for 'A'
      // 26 is the number of letters in the alphabet
      const code = data.charCodeAt(i);
      // +key is ensures that the key is always a number
      const newPos = ((code - 65 + +key) % 26) + 65;
      const encrypted = String.fromCharCode(newPos);

      this.logger.log({ type: 'info', message: `Encrypted with char ${encrypted}` });
      cipher += encrypted;
    }
    return cipher;
  }

  decrypt(data: string, key: string | number): string {
    let plain = '';
    for (let i = 0; i < data.length; i++) {
      this.logger.log({ type: 'info', message: `Decrypting char ${data[i]}` });
      const pos = ((data.charCodeAt(i) - +key - 65 + 26) % 26) + 65;
      const decrypted = String.fromCharCode(pos);
      this.logger.log({ type: 'info', message: `Decrypted with char ${decrypted}` });
      plain += decrypted;
    }
    return plain;
  }
}
