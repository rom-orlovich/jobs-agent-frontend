import { APP_ROUTES } from '@/lib/routes';
import { classNameGenerator } from '@/lib/utils';

import Link from 'next/link';
import React from 'react';
import { MdTextSnippet } from 'react-icons/md';
// import TrackButton from '../Buttons/TrackButton';
// import Field from '../Field/Field';
import { JobItemProps, jobItemStyle } from '../JobsPage/JobFeed/JobsFeed';
import JobInfo from './JobTrackingItem/JobInfo';
import TrackingInfo from './JobTrackingItem/TrackingInfo';

export const jobTrackingItemStyle = {
  // ...jobItemStyle,
  itemTracking: 'flex flex-col justify-between gap-4',
  content: `gap-[0.5rem]`,
  dateContainer: 'flex flex-end',
  statusCVContainer: 'flex flex-end',
  trackingStatus: 'flex flex-col gap-2',
  CVWasSent: 'text-right flex items-center gap-2 font-medium',
  currentStageContainer: 'text-right flex items-center gap-2',
  linkTrackDetailsContainer: 'flex justify-center mt-4',
  linkTrackDetails:
    'button-custom  bg-[#20b2aa] hover:opacity-75 text-white text-sm  flex items-center gap-1'
};

function JobTrackingItem(props: JobItemProps) {
  const { jobID, index, reason, isMatch, reasonStyle } = props;
  // const localDateStr = createLocalDate(info?.updatedAt);
  const CVwasSent = props.info?.statusCV?.wasSent;
  const curStage = props.info?.stages.at(-1)?.name;
  return (
    <li
      className={classNameGenerator(jobItemStyle.item, jobTrackingItemStyle.itemTracking)}
      key={jobID + index}
    >
      {/* <div className={`${jobItemStyle.content} ${jobTrackingItemStyle.content}`}>
        <div className={jobItemStyle.bookmarkContainer}>
          <div className={fromClass}> {from} </div>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div dir="rtl" className={jobTrackingItemStyle.dateContainer}>
          <Field value={localDateStr} titleStyle={'font-bold'} title="עודכן ב-" />
        </div>
        <div className={jobItemStyle.title}>
          <Link target="_blank" href={link}>
            {title}
          </Link>
        </div>
        {props.company && <div className="text-center"> {props.company}</div>}
      </div> */}
      <JobInfo {...props} />
      <div className={classNameGenerator(jobItemStyle.reason, reasonStyle)}>
        {isMatch ? '!יש התאמה' : reason}
      </div>

      <div>
        <TrackingInfo curStage={curStage} CVwasSent={CVwasSent} />
        <div className={jobTrackingItemStyle.linkTrackDetailsContainer}>
          <Link
            className={jobTrackingItemStyle.linkTrackDetails}
            href={`/${APP_ROUTES.JOBS_TRACKING_INFO(jobID)}`}
          >
            <MdTextSnippet /> ערוך פרטים
          </Link>
        </div>
      </div>
    </li>
  );
}

export default JobTrackingItem;
