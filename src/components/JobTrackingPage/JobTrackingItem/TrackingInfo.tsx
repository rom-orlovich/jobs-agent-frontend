import React from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { jobTrackingItemStyle } from '../JobTrackingItem';

function TrackingInfo({ CVwasSent, curStage }: { CVwasSent?: boolean; curStage?: string }) {
  return (
    <div className={jobTrackingItemStyle.trackingStatus}>
      {CVwasSent && (
        <div dir="rtl" className={jobTrackingItemStyle.CVWasSent}>
          קורות חיים נשלחו! <RiSendPlaneFill className="text-loading-400" />
        </div>
      )}
      {curStage && (
        <div dir="rtl" className={jobTrackingItemStyle.currentStageContainer}>
          <span className="font-bold">שלב נוכחי:</span>
          <span>{curStage} </span>
        </div>
      )}
    </div>
  );
}

export default TrackingInfo;
