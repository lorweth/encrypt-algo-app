export const CryptorList = {
  caesar: 'Caesar',
  monoalphabetic: 'Monoalphabetic',
  // polyalphabetic: 'Polyalphabetic',
  // rc4: 'RC4',
  // tinydes: 'TinyDES',
};

export type CryptorName = keyof typeof CryptorList;
