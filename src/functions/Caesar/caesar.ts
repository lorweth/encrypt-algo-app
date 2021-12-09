import { Logger } from '../logger';

export class Caesar {
  content: string;
  k: number;
  logger: Logger;

  constructor(content: string, k: number, logger: Logger) {
    this.content = content;
    this.k = k;
    this.logger = logger;
  }

  encrypt(): string {
    let cipher = '';
    for (let i = 0; i < this.content.length; i++) {
      const pos = ((this.content[i].charCodeAt(0) + this.k - 65) % 26) + 65; // 65 is the ASCII code for A
      const encrypted = String.fromCharCode(pos);
      this.logger.add(`i: ${i}, ${this.content[i]} -> ${encrypted}`);
      cipher += encrypted;
    }
    return cipher;
  }

  decrypt(): string {
    let plain = '';
    for (let i = 0; i < this.content.length; i++) {
      const pos = ((this.content[i].charCodeAt(0) - this.k - 65 + 26) % 26) + 65; // 65 is the ASCII code for A, 26 is the number of letters in the alphabet
      const decrypted = String.fromCharCode(pos);
      this.logger.add(`i: ${i}, ${this.content[i]} -> ${decrypted}`);
      plain += decrypted;
    }
    return plain;
  }
}
