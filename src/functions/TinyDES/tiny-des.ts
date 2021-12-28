import { RSA_X931_PADDING } from 'constants';
import { resolve6 } from 'dns';
import Logger from '../logger';

class KL {
  public l: string;
  public r: string;

  constructor(l: string, r: string) {
    this.l = l;
    this.r = r;
  }
}

export default class TinyDES {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Các quy ước hoán vị
  private readonly ruleExpand = [2, 3, 1, 2, 1, 0];
  private readonly rulePBox = [2, 0, 3, 1];
  private readonly ruleCompress = [5, 1, 3, 2, 7, 0];

  private readonly bitTrong = [
    '0000',
    '0001',
    '0010',
    '0011',
    '0100',
    '0101',
    '0110',
    '0111',
    '1000',
    '1001',
    '1010',
    '1011',
    '1100',
    '1101',
    '1110',
    '1111',
  ];
  private readonly bitNgoai = ['00', '01', '10', '11'];
  private readonly bang = [
    ['1110', '0100', '1101', '0001', '0010', '1111', '1011', '1000', '0011', '1010', '0110', '1100', '0101', '1001', '0000', '0111'],
    ['0000', '1111', '0111', '0100', '1110', '0010', '1101', '0001', '1010', '0110', '1100', '1011', '1001', '0101', '0011', '1000'],
    ['0100', '0001', '1110', '1000', '1101', '0110', '0010', '1011', '1111', '1100', '1001', '0111', '0011', '1010', '0101', '0000'],
    ['1111', '1100', '1000', '0010', '0100', '1001', '0001', '0111', '0101', '1011', '0011', '1110', '1010', '0000', '0110', '1101'],
  ];

  // Dịch trái vòng 1 số bit
  private shiftLeft(text: string, n: number): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const pos = (i + n + text.length) % text.length;
      result += text[pos];
    }
    return result;
  }

  // xor 2 chuổi nhị phân
  private xor(num1: string, num2: string): string {
    let result = '';
    for (let i = 0; i < num1.length; i++) {
      if (num1[i] === num2[i]) {
        result += '0';
      } else {
        result += '1';
      }
    }
    return result;
  }

  // Mở rọng 4 bit thanh 6 bit
  private expand(t: string): string {
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += t[this.ruleExpand[i]];
    }
    this.logger.add('expand: ' + result);
    return result;
  }

  // Convert 6 -> 4 bit
  private sBox(t: string): string {
    const result = this.bang[this.bitNgoai.indexOf(t[0] + t[5])][this.bitTrong.indexOf(t[1] + t[2] + t[3] + t[4])];
    this.logger.add('sBox: ' + result);
    return result;
  }

  // Hoán vị 4 bit
  private pBox(t: string): string {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += t[this.rulePBox[i]];
    }
    this.logger.add('pBox: ' + result);
    return result;
  }

  // Nén 8 -> 6 bit
  private compress(t: string): string {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += t[this.ruleCompress[i]];
    }
    this.logger.add('compress: ' + result);
    return result;
  }

  public encrypt(key: string, text: string): string {
    let mangLR = Array<KL>(new KL(text.substring(0, 4), text.substring(4, 4)), new KL('', ''), new KL('', ''), new KL('', ''));

    let mangKLR = Array<KL>(new KL(key.substring(0, 4), key.substring(4, 4)), new KL('', ''), new KL('', ''), new KL('', ''));

    for (let i = 1; i < 4; i++) {
      mangLR[i].l = mangLR[i - 1].r;
      const expandR = this.expand(mangLR[i - 1].r);

      mangKLR[i].l = this.shiftLeft(mangKLR[i - 1].l, ((i + 3) % 2) + 1);
      mangKLR[i].r = this.shiftLeft(mangKLR[i - 1].r, ((i + 3) % 2) + 1);

      const k = this.compress(mangKLR[i].l + mangKLR[i].r);
      const t = this.xor(expandR, k);
      const f = this.pBox(this.sBox(t));

      this.logger.add('f: ' + f);
      mangLR[i].r = this.xor(mangLR[i - 1].l, f);
    }
    return mangLR[3].l + mangLR[3].r;
  }
}
