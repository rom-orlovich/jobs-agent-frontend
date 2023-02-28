export const MESSAGE_CODES = {
  SCANNER_SUCCESS: '1000',
  ENTER_VALID_QUERY: '1001',
  SEARCH_IS_IN_PROCESS: '1002',
  NOT_JOB_IS_FOUND: '1003',
  USER_IS_FOUND: '2000',
  USER_NOT_FOUND: '2001',
  USER_ID_NOT_VALID: '2002',
  USER_ID_UPDATED: '2003',
  TRACK_JOB_IS_FOUND: '3000',
  TRACK_JOB_NOT_FOUND: '3001',
  TRACK_JOB_CREATED: '3002',
  TRACK_JOB_NOT_CREATED: '3003',
  TRACK_JOB_DELETED: '3004',
  TRACK_JOB_NOT_DELETED: '3005',
  FOUNDED: '8000',
  SOMETHING_WRONG: '10000'
} as const;
export const MESSAGES = {
  //SCANNER
  [MESSAGE_CODES.SCANNER_SUCCESS]: 'החיפוש בוצע בהצלחה',
  [MESSAGE_CODES.ENTER_VALID_QUERY]: 'אנא הכנס ערכים חוקיים.',
  [MESSAGE_CODES.SEARCH_IS_IN_PROCESS]: 'החיפוש מתבצע אנא המתן לתוצאות...',
  [MESSAGE_CODES.NOT_JOB_IS_FOUND]: 'אף משרה לא נמצאה, אנא בצע חיפוש נוסף.',
  //USERS
  [MESSAGE_CODES.USER_IS_FOUND]: 'המשתמש נמצא בהצלחה!',
  [MESSAGE_CODES.USER_NOT_FOUND]: ':( לא הצלחנו למצוא את המשתמש',
  [MESSAGE_CODES.USER_ID_UPDATED]: 'המשתמש עודכן בהצלחה!',
  [MESSAGE_CODES.USER_ID_NOT_VALID]: 'מזהה המשתמש אינו קיים!',
  //TRACK JOBS
  [MESSAGE_CODES.TRACK_JOB_IS_FOUND]: 'המשרה נמצאה!',
  [MESSAGE_CODES.TRACK_JOB_NOT_FOUND]: 'המשרה לא נמצאה',
  [MESSAGE_CODES.TRACK_JOB_CREATED]: 'המשרה נוספה למעקב!',
  [MESSAGE_CODES.TRACK_JOB_NOT_CREATED]: 'שגיאה ביצירת המעקב!',
  [MESSAGE_CODES.TRACK_JOB_DELETED]: 'המשרה הוסרה מהמעקב!',
  [MESSAGE_CODES.TRACK_JOB_NOT_DELETED]: 'שגיאה בהסרת המעקב!',
  //GENERAL
  [MESSAGE_CODES.FOUNDED]: 'נמצא!',
  [MESSAGE_CODES.SOMETHING_WRONG]: '.השירות לא זמין כרגע. אנא נסה שנית מאוחר יותר.'
} as const;
