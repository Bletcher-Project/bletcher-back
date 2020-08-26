export default {
  getNand: (digit: number) => JSON.stringify(Math.round(Math.random() * (10 ** digit))),
  getExtension: (filename: string) => {
    const { length } = filename;
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? 'png' : filename.substring(lastDot + 1, length);
  },
};
