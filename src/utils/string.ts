export const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const truncate = (str = '', limit = 120, ellipsis = '...') => {
  const start = 0;
  const size = (limit - ellipsis.length);
  const subString = str.substring(start, size);
  const lastWord = subString.substring(start, subString.lastIndexOf(' '));

  if (str.length <= size) {
    return str;
  }

  return `${(str ? lastWord : subString)}${ellipsis}`;
};
