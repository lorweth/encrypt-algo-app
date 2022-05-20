import { Cryptor } from '../models/cryptor';
import { Logger } from '../models/log';
import { CryptorName } from './cryptor-factory';

export class RC4 implements Cryptor {
  private table = 'ABCDEFGH';

  constructor(private logger: Logger) {}

  getName(): CryptorName {
    return 'rc4';
  }

  private init(s: number[], t: number[], k: string) {
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
  }

  encrypt(data: string, key: string | number): string {
    throw new Error('Method not implemented.');
  }
  decrypt(data: string, key: string | number): string {
    throw new Error('Method not implemented.');
  }
}
