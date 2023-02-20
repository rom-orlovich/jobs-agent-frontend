/**
 *
 * @param {(string|undefined)[]} classes an array of classes as string if they exist or undefined if they don't.
 * @returns {string} literal string that contains all the classes with spaces between them.
 */
export const classNameGenerator = (...classes: (string | undefined)[]) => {
  return `${classes.filter((el) => el).join(' ')}`;
};

export const spreadSet = <T>(set: Set<T>) => {
  const newArr: T[] = [];
  for (const value of set.values()) {
    newArr.push(value);
  }
  return newArr;
};

// /**
//  *
//  * @param {Array| any} value The value  is needed to check.
//  * @returns The value
//  */
// Export const checkValueIsArray = <V>(value: V | V[]) => (Array.isArray(value) ? value[0] : value);
