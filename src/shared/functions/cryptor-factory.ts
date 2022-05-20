import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { Caesar } from './caesar';
import { MonoAlphabetic } from './monoalphabetic';
import { PolyAlphabetic } from './polyalphabetic';

export const CryptorList = {
  caesar: 'Caesar',
  monoalphabetic: 'Monoalphabetic',
  polyalphabetic: 'Polyalphabetic',
  rc4: 'RC4',
  tinydes: 'TinyDES',
};

export type CryptorName = keyof typeof CryptorList;

export class CryptorFactory {
  constructor(private logger: Logger) {}

  getCryptor(cryptorName: CryptorName): Cryptor {
    switch (cryptorName) {
      case 'caesar':
        return new Caesar(this.logger);
      case 'monoalphabetic':
        return new MonoAlphabetic(this.logger);
      case 'polyalphabetic':
        return new PolyAlphabetic(this.logger);
      // add more case here
      default:
        throw new Error('Cryptor not found');
    }
  }
}
