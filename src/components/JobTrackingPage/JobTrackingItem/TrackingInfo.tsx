import { TrackingInfo } from '@/lib/types/jobsScanner.types';
import React from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { jobTrackingItemStyle } from './JobTrackingItem';

function TrackingInfo({ info }: { info?: TrackingInfo }) {
  const CVwasSent = info?.statusCV?.wasSent;
  const curStage = info?.stages.at(-1)?.name;
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
