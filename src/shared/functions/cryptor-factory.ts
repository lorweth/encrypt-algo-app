import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { Caesar } from './caesar';
import { CryptorName } from './cryptor-list';
import { MonoAlphabetic } from './monoalphabetic';

export class CryptorFactory {

  constructor(private logger: Logger) { }

  getCryptor(cryptorName: CryptorName): Cryptor {
    switch (cryptorName) {
      case 'caesar':
        return new Caesar(this.logger);
      case 'monoalphabetic':
        return new MonoAlphabetic(this.logger);
      default:
        throw new Error('Cryptor not found');
    }
  }
}
