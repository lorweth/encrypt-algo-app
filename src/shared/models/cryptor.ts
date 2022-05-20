import { CryptorName } from '../functions/cryptor-list';

type KeyType = string | number;

export interface Cryptor {
  getName(): CryptorName;
  encrypt(data: string, key: KeyType): string;
  decrypt(data: string, key: KeyType): string;
}
