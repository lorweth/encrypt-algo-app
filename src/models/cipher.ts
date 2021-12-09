export const AlgorithmContants = {
  caesar: 'caesar',
  monoalphabetic: 'monoalphabetic',
  polyalphabetic: 'polyalphabetic',
  tinyrc4: 'tinyrc4',
  tinydes: 'tinydes',
};

export type AlgorithmType = keyof typeof AlgorithmContants;

export type CipherType = {
  algorithm: AlgorithmType;
  content: string;
  k: string | number;
  isDecrypt: boolean;
};
