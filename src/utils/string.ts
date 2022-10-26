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

export const multiline = (str: string, limit = Infinity) => {
  if (str.length <= limit) {
    return str;
  }

  const parts: string[] = [];

  str.split(' ').forEach((word) => {
    const lastIndex = parts.lastIndexOf('\n') + 1;
    const total = [...parts].slice(lastIndex).reduce((acc, word) => acc + word.length, 0);

    if ((total + word.length) > limit) {
      parts.push('\n');
    }

    parts.push(`${word} `);
  });

  return parts.join('');
};
