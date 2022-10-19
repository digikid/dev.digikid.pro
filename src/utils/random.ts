export const id = (): string => {
  const chr4 = () => Math.random().toString(16).slice(-4);

  return `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
};

export const number = (min: number, max: number, excluded: number[] = []): number => {
  const num = Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));

  return (excluded.includes(num)) ? number(min, max, excluded) : num;
};

export const sample = <T>(arr: T[]): () => T => {
  let copy = [...arr];

  return function () {
    if (!copy.length) {
      copy = [...arr];
    }

    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];

    copy.splice(index, 1);

    return item;
  };
};
