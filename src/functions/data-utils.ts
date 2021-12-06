/**
 * Convert a dec to binary with value less than 8
 * @param num
 * @returns string binary
 */
const convertDecToBin = (num: number) => {
  const bin = num.toString(2);
  return bin;
};

/**
 * Convert a binary to dec with value less than 8
 * @param bin binary string
 * @returns decimal number
 */
const convertBinToDec = (bin: string) => {
  return parseInt(bin, 2);
};

/**
 * Đổi chổ 2 phần tử i, j trong mảng
 * @param arr Mảng cần đổi
 * @param i vị trí cẩn đổi chổ
 * @param j vị trí cần đổi chổ
 */
const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * Tìm vị trí của kí tự trong chuổi
 * @param str Chuổi
 * @param c kí tự cần tìm
 * @returns vị trí kí tự cần tìm
 */
const indexOf = (str: string, c: string) => {
  return str.indexOf(c);
};

export { convertDecToBin, convertBinToDec, swap, indexOf };
