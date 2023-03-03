/* eslint-disable @typescript-eslint/no-explicit-any */

import { SERVER_URL } from './endpoints';
import { MESSAGES, MESSAGE_CODES } from './messages';
import { ResponseMessage } from './types/api.types';
import { AnyFun, GenericRecord, OmitKey } from './types/types';

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
 * @param {V} obj Object you want to extract the exist key value.
 * @returns {{existKeysValues:Partial<V>,count:number}} The object that include the exist keysValues and count how many exist.
 */
export function getObjExistKeysValues<V extends GenericRecord<any>>(
  obj: V
): { existKeysValues: Partial<V>; count: number } {
  const existKeysValues = {} as Partial<V>;
  let count = 0;

  Object.entries(obj).forEach(([key, value]) => {
    if (key && value) {
      (existKeysValues[key as keyof V] = value), count++;
    }
  });
  return {
    existKeysValues,
    count
  };
}

/**
 *
 * @param {T} obj The URL queries string.
 * @param {string} keyValueDelimiter The delimiter the connect between the  key and its value. default "=".
 * @param {string} objFieldDelimiter The delimiter the connect between each key.. default "=". default "&".
 * @returns {string} The string form the objs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const covertObjToString = <T extends GenericRecord<any>>(
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
  const paramsURL = covertObjToString(params, keyValueDelimiter, objFieldDelimiter);
  return `${resourcesURL}?${paramsURL}`;
};

export const delayFun = (cb: AnyFun, delay: number) =>
  new Promise((res) =>
    setTimeout(async () => {
      res(await cb());
    }, delay)
  );

/**
 *
 * @param {string} url URL of the request.
 * @param {OmitKey<RequestInit, 'body'> & { body?: Req } | undefined} request Request Object with generic body object
 * @returns {Promise<Res | undefined>} Result data of the mutation fetch.
 */
export async function fetchUtil<
  Req extends GenericRecord<any> | undefined,
  Res extends GenericRecord<any>
>(url: string, request?: OmitKey<RequestInit, 'body'> & { body?: Req }): Promise<Res | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const headers = request?.headers;
  const headerBody = request?.body
    ? {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.body)
      }
    : {};

  try {
    const data = await fetch(url, {
      method: request?.method,
      ...headers,
      ...headerBody
    });
    return await data.json();
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
/**
 *
 * @param {KeyCode} keyCode The key of the name of the message.
 * @returns {ResponseMessage} Object of response message.
 */
export const getResMessage = <KeyCode extends keyof typeof MESSAGE_CODES>(
  keyCode: KeyCode
): ResponseMessage => {
  const code = MESSAGE_CODES[keyCode];
  return {
    message: MESSAGES[code],
    code: code
  };
};
export const fetchSWR = (url: string) => fetch(url).then((res) => res.json());

export const createScannerURL = (endpoint: string, userID?: string) =>
  createURL([SERVER_URL, endpoint, userID || '']);

export const createLocalDate = (date?: Date) => {
  const createdAtDate = new Date(date || '');
  const createLocalTimeDate = createdAtDate.toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem'
  });
  return createLocalTimeDate;
};

export const convertDateToValidInputFormat = (date?: Date) => {
  return (date instanceof Date ? date : new Date()).toISOString().slice(0, 10) as string;
};
