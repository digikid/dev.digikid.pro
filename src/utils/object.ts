export const findDeep = <T extends Record<string, any>>(obj: T, cb: (obj: T) => boolean): T[] => {
  const keys = (Object.keys(obj) as (keyof typeof obj)[]) || [];

  let result: T[] = [];

  if (cb(obj)) {
    result = [...result, obj];
  }

  for (let i = 0; i < keys.length; i++) {
    const value = obj[keys[i]];

    if (typeof value === 'object' && value != null) {
      const o = findDeep(value as any, cb);

      if (o != null && Array.isArray(o)) {
        result = [...result, ...o];
      }
    }
  }

  return result;
};

export const swap = <T extends string, K extends string>(obj: Record<T, K>): Record<K, T> => {
  const result = {} as Record<K, T>;

  (Object.entries(obj)).forEach(([key, value]) => {
    result[value as K] = key as T;
  });

  return result;
};
