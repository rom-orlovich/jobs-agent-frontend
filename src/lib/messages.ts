export const MESSAGE_CODES = {
  SCANNER_SUCCESS: 1000,
  ENTER_VALID_QUERY: 1001,
  SEARCH_IS_IN_PROCESS: 1002,
  NOT_JOB_IS_FOUND: 1003,
  USER_IS_FOUND: 2000,
  USER_NOT_FOUND: 2001,
  USER_ID_NOT_VALID: 2002,
  USER_ID_UPDATED: 2003,
  FOUNDED: 8000,
  SOMETHING_WRONG: 10000
};

export const MESSAGES = {
  [MESSAGE_CODES.SCANNER_SUCCESS]: 'החיפוש בוצע בהצלחה',
  [MESSAGE_CODES.ENTER_VALID_QUERY]: 'אנא הכנס ערכים חוקיים.',
  [MESSAGE_CODES.SEARCH_IS_IN_PROCESS]: 'החיפוש מתבצע אנא המתן לתוצאות...',
  [MESSAGE_CODES.NOT_JOB_IS_FOUND]: 'אף משרה לא נמצאה, אנא בצע חיפוש נוסף.',
  [MESSAGE_CODES.USER_IS_FOUND]: 'המשתמש נמצא בהצלחה!',
  [MESSAGE_CODES.USER_NOT_FOUND]: ':( לא הצלחנו למצוא את המשתמש',
  [MESSAGE_CODES.USER_ID_UPDATED]: 'המשתמש עודכן בהצלחה!',
  [MESSAGE_CODES.USER_ID_NOT_VALID]: 'מזהה המשתמש אינו קיים!',
  [MESSAGE_CODES.FOUNDED]: 'נמצא!',
  [MESSAGE_CODES.SOMETHING_WRONG]: '.השירות לא זמין כרגע. אנא נסה שנית מאוחר יותר.'
};
