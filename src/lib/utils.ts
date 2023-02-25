import { AnyFun, GenericRecord } from './types/types';

/**
 *
 * @param {(string|undefined)[]} classes an array of classes as string if they exist or undefined if they don't.
 * @returns {string} literal string that contains all the classes with spaces between them.
 */
export const classNameGenerator = (...classes: (string | undefined)[]) => {
  return `${classes.filter((el) => el).join(' ')}`;
};

/**
 * @param {string} words Words to capital their first letter.
 * @returns {string | undefined|null} Each words with capital first letter or undefined.
 */
export function capitalFirstLetter(words?: string | null): string | undefined | null {
  return words
    ? words
        ?.split(' ')
        .map((words) => words[0].toUpperCase() + words.slice(1))
        .join(' ')
    : words;
}

export const fetchData = async <D>(url: string) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data as D;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
/**
 *
 * @param {T} obj The URL queries string.
 * @param {string} keyValueDelimiter The delimiter the connect between the  key and its value. default "=".
 * @param {string} objFieldDelimiter The delimiter the connect between each key.. default "=". default "&".
 * @returns {string} The string form the objs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const covertObjsToString = <T extends GenericRecord<any>>(
  obj: T,
  keyValueDelimiter = '=',
  objFieldDelimiter = '&'
): string => {
  const query: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (key && value) query.push(`${key}${keyValueDelimiter}${value}`);
  });
  return query.join(objFieldDelimiter);
};

/**
 * @param {string[]} resources The given string array of the resources.
 * @returns {string} The URL recourses join by "/".
 */
export const convertResourceToURL = (resources: string[]) => {
  return resources.join('/');
};

/**
 *
 * @param resources The given string array of the resources.
 * @param params The given params obj of the resources.
 * @param keyValueDelimiter keyValueDelimiter The delimiter the connect between the query's keys and its value. default "=".
 * @param objFieldDelimiter  The delimiter the connect between each query's keys. default "=". default "&".
 * @returns The value of the url.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createURL = <T extends GenericRecord<any>>(
  resources: string[],
  params?: T,
  keyValueDelimiter = '=',
  objFieldDelimiter = '&'
) => {
  const resourcesURL = convertResourceToURL(resources);
  if (!params) return `${resourcesURL}`;
  const paramsURL = covertObjsToString(params, keyValueDelimiter, objFieldDelimiter);
  return `${resourcesURL}?${paramsURL}`;
};

export const delayFun = (cb: AnyFun, delay: number) =>
  new Promise((res) =>
    setTimeout(async () => {
      res(await cb());
    }, delay)
  );
