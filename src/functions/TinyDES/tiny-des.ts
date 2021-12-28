import { RSA_X931_PADDING } from 'constants';
import { resolve6 } from 'dns';
import Logger from '../logger';

export default class TinyDES {
  private readonly logger: Logger;

  // Quy ước hoán vị expand
  private readonly eStr = [2, 3, 1, 2, 1, 0];

  private readonly sVertical = [0, 5];
  private readonly sHorizontal = [1, 2, 3, 4];

  private readonly pStr = [2, 0, 3, 1];

  private readonly sBoxTable = [
    ['1110', '0100', '1101', '0001', '0010', '1111', '1011', '1000', '0011', '1010', '0110', '1100', '0101', '1001', '0000', '0111'],
    ['0000', '1111', '0111', '0100', '1110', '0010', '1101', '0001', '1010', '0110', '1100', '1011', '1001', '0101', '0011', '1000'],
    ['0100', '0001', '1110', '1000', '1101', '0110', '0010', '1011', '1111', '1100', '1001', '0111', '0011', '1010', '0101', '0000'],
    ['1111', '1100', '1000', '0010', '0100', '1001', '0001', '0111', '0101', '1011', '0011', '1110', '1010', '0000', '0110', '1101'],
  ];

  constructor(logger: Logger) {
    this.logger = logger;
  }

  private BinToDec(num: string): number {
    return parseInt(num, 2);
  }

  private HexToBin(num: number): string {
    let result = num.toString(16);
    while (result.length < 4) {
      result = '0' + result;
    }
    return result;
  }

  private BinaryShiftLeft(bin: string, n: number): string {
    let result = '';
    const len = bin.length;
    let i = n;
    while (result.length < len) {
      result += bin[i];
      i = (i + 1) % len;
    }
    return result;
  }

  private expandKey(r4: string): string {
    let r6 = '';
    for (let i = 0; i < 6; i++) {
      r6 += r4[this.eStr[i]];
    }
    return r6;
  }

  private sBox(r6: string): string {
    const ver = r6[0] + r6[5];
    const hor = r6[1] + r6[2] + r6[3] + r6[4];
    const row = this.BinToDec(ver);
    const col = this.BinToDec(hor);
    return this.sBoxTable[row][col];
  }

  private pBox(r4: string): string {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += r4[this.pStr[i]];
    }
    return result;
  }

  /**
   *
   * @param text là 2 kí tự hệ hexa
   * @param key khóa chứ mẹ gì
   */
  // public encrypt(text: string, key: string): string {
  //   let kl0 = key.substr(0, 4);
  //   let kr0 = key.substr(4, 4);

  //   let plainArray = [];
  //   plainArray.push(text.substr(0, 4));
  //   plainArray.push(text.substr(4, 4));

  //   // circle 1
  //   let l1 = plainArray[0];
  //   let r0 = plainArray[0];
  //   let expand = this.expandKey(r0);
  //   this.logger.add(`expand: ${expand}`);
  //   let kl1 = this.BinaryShiftLeft(kl0, 1);
  //   this.logger.add(`kl1: ${kl1}`);
  //   let kr1 = this.BinaryShiftLeft(kr0, 1);
  //   this.logger.add(`kr1: ${kr1}`);
  //   let k1 =
  // }
}
