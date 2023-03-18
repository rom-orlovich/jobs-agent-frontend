/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';

import { MESSAGES, MESSAGE_CODES } from './messages';
import { KeyCode, ResponseMessage } from './types/api.types';
import { AnyFun, GenericRecord } from './types/types';

//////////////////////////////////////////////////////////////////////////////////////////
/**
 * Dates utils.
 */
//////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param date A date value.
 * @returns {string} convert the date to local string.
 */
export const createLocalDate = (date?: Date) => {
  const curDate = new Date(date || '');
  const createLocalTimeDate = curDate.toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
    dateStyle: 'long',
    timeStyle: 'short'
  });
  return createLocalTimeDate;
};

export const convertDateToValidInputFormat = (date?: Date) => {
  return (date instanceof Date ? date : new Date()).toISOString().slice(0, 10) as string;
};

//////////////////////////////////////////////////////////////////////////////////////////
/**
 * Classnames utils.
 */
//////////////////////////////////////////////////////////////////////////////////////////

export const classIsOn = (isON: boolean, className: string, classNameElse = '') =>
  isON ? className : classNameElse;

/**
 *
 * @param {(string|undefined)[]} classes an array of classes as string if they exist or undefined if they don't.
 * @returns {string} literal string that contains all the classes with spaces between them.
 */
export const classNameGenerator = (...classes: (string | undefined)[]) => {
  return `${classes.filter((el) => el).join(' ')}`;
};

//////////////////////////////////////////////////////////////////////////////////////////
/**
 * URL utils function
 */
//////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {T} obj The URL queries string.
 * @param {string} keyValueDelimiter The delimiter the connect between the  key and its value. default "=".
 * @param {string} objFieldDelimiter The delimiter the connect between each key.. default "=". default "&".
 * @returns {string} The string form the objs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const covertQueryParamsToString = <T extends GenericRecord<any>>(
  obj: T,
  keyValueDelimiter = '=',
  objFieldDelimiter = '&'
): string => {
  const query: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (key && value) query.push(`${key}${keyValueDelimiter}${encodeURIComponent(value)}`);
  });
  return query.join(objFieldDelimiter);
};

/**
 * @param {string[]} resources The given string array of the resources.
 * @returns {string} The URL recourses join by "/".
 */
export const createURLPath = (resources: (string | undefined)[]) => {
  return resources.filter((el) => el).join('/');
};

/**
 *
 * @param resources The given string array of the resources.
 * @param params The given params obj of the resources.
 * @param keyValueDelimiter keyValueDelimiter The delimiter the connect between the query's keys and its value. default "=".
 * @param objFieldDelimiter  The delimiter the connect between each query's keys. default "=". default "&".
 * @returns The value of the url.
 */
export const createURL = <T extends GenericRecord<any>>(
  resources: (string | undefined)[],
  params?: T,
  keyValueDelimiter = '=',
  objFieldDelimiter = '&'
) => {
  const resourcesURL = createURLPath(resources);

  if (!params) return `${resourcesURL}`;
  const paramsURL = covertQueryParamsToString(params, keyValueDelimiter, objFieldDelimiter);

  return `${resourcesURL}?${paramsURL}`;
};

//////////////////////////////////////////////////////////////////////////////////////////
/**
 * Toast message utils.
 */
//////////////////////////////////////////////////////////////////////////////////////////

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

/**
 * @param {T} data The data to check if it is exist. And if it does to return.
 * @param {KeyCode} keyCode  Key of message.
 * @returns An object that contain a toast callback to execute and the data itself.
 */
export function createToastCBWithData<D>(data: D, keyCode: KeyCode): { cb: AnyFun; data?: D } {
  const messageObj = getResMessage(keyCode);
  return {
    cb: () => {
      toast(messageObj.message, {
        toastId: 'message'
      });
    },
    data
  };
}
export type CreateToastCBWithDataFun = typeof createToastCBWithData;
export type ReturnCreateToastCBWithData<T> = ReturnType<typeof createToastCBWithData<T>>;

/**
 * @param {string} messageOnSuccuss The message if the data is exist.
 * @param {string}  messageOnError The message if the data is not exist
 * @param {T} data The data itself.
 * @returns An object that contain a toast callback to execute and the data itself.
 */
export function createToastsByDataIfExist<D>(
  messageOnSuccuss: KeyCode,
  messageOnError: KeyCode,
  data?: D
) {
  if (!data) return createToastCBWithData(undefined, messageOnError);
  if (Array.isArray(data) && !data?.length) return createToastCBWithData(undefined, messageOnError);

  return createToastCBWithData(data, messageOnSuccuss);
}

//////////////////////////////////////////////////////////////////////////////////////////
/**
 *  Misc utils.
 */
//////////////////////////////////////////////////////////////////////////////////////////
export const delayFun = (cb: AnyFun, delay: number) =>
  new Promise((res) =>
    setTimeout(async () => {
      res(await cb());
    }, delay)
  );
/**
 * @param {string} words Words to capital their first letter.
 * @returns {string} Each words with capital first letter or undefined.
 */
export function capitalFirstLetter(words?: string | null): string {
  return words
    ? words
        ?.split(' ')
        .map((words) => words[0].toUpperCase() + words.slice(1))
        .join(' ')
    : words || '';
}

//////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
//////////////////////////////////////////////////////////////////////////////////////////
