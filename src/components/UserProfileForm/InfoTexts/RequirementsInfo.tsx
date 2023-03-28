import React from 'react';

function RequirementsInfo() {
  return (
    <div className="flex flex-col gap-1 p-2 text-right xs:p-4">
      <p>
        דרישה יכולה להיות<strong> ניסיון מקצועי\מומחיות\תכונת אופי כלשהי</strong> שיופיעו בתיאור המשרות.
      </p>
      <ul>
        <li className="underline">דוגמאות לדרישות:</li>
        <li>
          <strong>ניסיון מקצועי:</strong> <span className="font-normal"> javascript, react...</span>
        </li>
        <li>
          <strong>מומחיות:</strong> ניסיון בגיוס,ניסיון בניהול...
        </li>
        <li>
          <strong>תכונות אופי:</strong> אחריות אישית,תודעת שירות...
        </li>
      </ul>

      <p>
        אפשר גם לציין <strong>טווח של שנים</strong> מינמום ומקסימום להתאמה מיטבית של הפרופיל.
      </p>
      <p>
        <strong>דיוק הדרישות</strong> לאחר כל חיפוש, יגדיל את <strong>סיכויי ההתאמה</strong> של המשרות
        לפרופיל האישי שלך.
      </p>
    </div>
  );
}

export default RequirementsInfo;
