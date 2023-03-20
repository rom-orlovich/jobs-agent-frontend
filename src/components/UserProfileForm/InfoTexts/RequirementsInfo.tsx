import React from 'react';

function RequirementsInfo() {
  return (
    <div className="flex flex-col gap-1 p-4 text-right">
      <p>
        דרישה יכולה להיות<b> ניסיון מקצועי\מומחיות\תכונת אופי כלשהי</b> שיופיעו בתיאור המשרות.
      </p>
      <ul>
        <li> דוגמאות:</li>
        <li>
          <b>ניסיון מקצועי:</b> <span className="font-normal"> javascript, react.</span>
        </li>
        <li>
          <b>מומחיות:</b> ניסיון בגיוס,ניסיון בניהול.
        </li>
        <li>
          <b>תכונות אופי:</b> אחריות אישית,תודעת שירות.
        </li>
      </ul>

      <p>
        אפשר גם לציין <b>טווח של שנים</b> מינמום ומקסימום להתאמה מיטבית של הפרופיל.
      </p>
      <p>
        <b>דיוק הדרישות</b> יסייע לשיפור התאמת המשרות.
      </p>
    </div>
  );
}

export default RequirementsInfo;
