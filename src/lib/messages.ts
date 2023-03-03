export const MESSAGE_CODES = {
  SCANNER_SUCCESS: '1000',
  ENTER_VALID_QUERY: '1001',
  SEARCH_IS_IN_PROCESS: '1002',
  JOBS_ARE_NOT_FOUND: '1003',
  JOB_IS_FOUND: '1004',
  JOB_IS_NOT_FOUND: '1005',
  USER_IS_FOUND: '2000',
  USER_NOT_FOUND: '2001',
  USER_ID_NOT_VALID: '2002',
  USER_IS_UPDATED: '2003',
  USER_QUERY_DELETED: '2004',
  TRACKING_JOB_IS_FOUND: '3000',
  TRACKING_JOB_NOT_FOUND: '3001',
  TRACKING_JOB_CREATED: '3002',
  TRACKING_JOB_NOT_CREATED: '3003',
  TRACKING_JOB_DELETED: '3004',
  TRACKING_JOB_NOT_DELETED: '3005',
  TRACKING_JOB_UPDATED: '3006',
  TRACKING_JOB_NOT_UPDATED: '3007',
  SEARCH_HISTORY_FOUND: '4000',
  SEARCH_HISTORY_NOT_FOUND: '4001',
  FOUNDED: '8000',
  FOUNDED_BUT_NOT_MODIFIED: '8001',
  SOMETHING_WRONG: '10000'
} as const;

export const MESSAGES = {
  //SCANNER
  [MESSAGE_CODES.SCANNER_SUCCESS]: 'החיפוש בוצע בהצלחה',
  [MESSAGE_CODES.ENTER_VALID_QUERY]: 'אנא הכנס ערכים חוקיים.',
  [MESSAGE_CODES.SEARCH_IS_IN_PROCESS]: 'החיפוש מתבצע אנא המתן לתוצאות...',
  [MESSAGE_CODES.JOBS_ARE_NOT_FOUND]: 'אף משרה לא נמצאה, אנא בצע חיפוש נוסף.',
  [MESSAGE_CODES.JOB_IS_FOUND]: 'המשרה נמצאה בהצלחה!.',
  [MESSAGE_CODES.JOB_IS_NOT_FOUND]: 'המשרה לא קיימת יותר,אנא הוסף משרה חדשה.',
  //USERS
  [MESSAGE_CODES.USER_IS_FOUND]: 'המשתמש נמצא בהצלחה!',
  [MESSAGE_CODES.USER_NOT_FOUND]: ':( לא הצלחנו למצוא את המשתמש',
  [MESSAGE_CODES.USER_IS_UPDATED]: 'המשתמש עודכן בהצלחה!',
  [MESSAGE_CODES.USER_QUERY_DELETED]: 'החיפוש נמחק בהצלחה!',
  [MESSAGE_CODES.USER_ID_NOT_VALID]: 'מזהה המשתמש אינו קיים!',
  //TRACKING JOBS
  [MESSAGE_CODES.TRACKING_JOB_IS_FOUND]: 'המשרה נמצאה!',
  [MESSAGE_CODES.TRACKING_JOB_NOT_FOUND]: 'המשרה לא נמצאה',
  [MESSAGE_CODES.TRACKING_JOB_CREATED]: 'המשרה נוספה למעקב!',
  [MESSAGE_CODES.TRACKING_JOB_NOT_CREATED]: 'שגיאה ביצירת מעקב המשרה!',
  [MESSAGE_CODES.TRACKING_JOB_UPDATED]: 'מעקב המשרה עודכן בהצלחה!',
  [MESSAGE_CODES.TRACKING_JOB_NOT_UPDATED]: 'שגיאה בעדכון המשרה!',
  [MESSAGE_CODES.TRACKING_JOB_DELETED]: 'המשרה הוסרה מהמעקב!',
  [MESSAGE_CODES.TRACKING_JOB_NOT_DELETED]: 'שגיאה בהסרת המעקב!',
  //SEARCH HISTORY
  [MESSAGE_CODES.SEARCH_HISTORY_FOUND]: 'היסטוריה החיפושים נמצאה!',
  [MESSAGE_CODES.SEARCH_HISTORY_NOT_FOUND]: 'לא נמצאו חיפושים אחרונים!',
  //GENERAL
  [MESSAGE_CODES.FOUNDED]: 'נמצא!',
  [MESSAGE_CODES.FOUNDED_BUT_NOT_MODIFIED]: 'המשאב נמצא אך לא עודכן.',
  [MESSAGE_CODES.SOMETHING_WRONG]: '.השירות לא זמין כרגע. אנא נסה שנית מאוחר יותר.'
} as const;
