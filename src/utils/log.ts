import { multiline } from '@utils/string';

export const watermark = `
      _               _ _       _ _    _     _
   __| | _____   ____| (_) __ _(_) | _(_) __| |  _ __ _   _
  / _\` |/ _ \\ \\ / / _\` | |/ _\` | | |/ / |/ _\` | | '__| | | |
 | (_| |  __/\\ V / (_| | | (_| | |   <| | (_| |_| |  | |_| |
  \\__,_|\\___| \\_(_)__,_|_|\\__, |_|_|\\_\\_|\\__,_(_)_|   \\__,_|
                          |___/
`;

export const print = (messages: string[], addWatermark = false): void => {
  const result = messages.reduce((acc, message) => `${acc}\n${multiline(message, 100)}`, addWatermark ? watermark : '');

  console.log(result);
};
