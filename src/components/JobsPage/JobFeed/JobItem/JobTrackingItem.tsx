import { APP_ROUTES } from '@/lib/routes';
import { classNameGenerator, createLocalDate } from '@/lib/utils';

import Link from 'next/link';
import React from 'react';
import { MdTextSnippet } from 'react-icons/md';
import TrackButton from '../../../Buttons/TrackButton';
import Field from '../../../Field/Field';
import { JobItemProps, jobItemStyle } from '../JobsFeed';

function JobTrackingItem(props: JobItemProps) {
  const jobTrackingItemStyle = {
    ...jobItemStyle,
    itemTracking: 'flex flex-col justify-between gap-4',
    content: `${jobItemStyle.content} gap-[0.5rem]`,
    dateContainer: 'flex flex-end',
    sendCVContainer: 'flex flex-end',
    linkTrackDetailsContainer: 'flex justify-center mt-4',
    linkTrackDetails:
      'button-custom  bg-[#20b2aa] hover:opacity-75 text-white text-sm  flex items-center gap-1'
  };
  const { link, title, jobID, fromClass, from, index, mark, info, reason, isMatch, reasonStyle } = props;
  const localDateStr = createLocalDate(info?.createdAt);
  return (
    <li
      className={classNameGenerator(jobTrackingItemStyle.item, jobTrackingItemStyle.itemTracking)}
      key={jobID + index}
    >
      <div className={jobTrackingItemStyle.content}>
        <div className={jobTrackingItemStyle.bookmarkContainer}>
          <div className={fromClass}> {from} </div>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div dir="rtl" className={jobTrackingItemStyle.dateContainer}>
          <Field value={localDateStr} titleStyle={'font-bold'} title="נוצר ב-" />
        </div>
        <div className={jobTrackingItemStyle.title}>
          <Link target="_blank" href={link}>
            {title}
          </Link>
        </div>
        {props.company && <div className="text-center"> {props.company}</div>}
      </div>
      <div>
        <div className={classNameGenerator(jobItemStyle.reason, reasonStyle)}>
          {isMatch ? '!יש התאמה' : reason}
        </div>

        <div className={jobTrackingItemStyle.linkTrackDetailsContainer}>
          <Link
            className={jobTrackingItemStyle.linkTrackDetails}
            href={`/${APP_ROUTES.JOBS_TRACKING_INFO(jobID)}`}
          >
            <MdTextSnippet /> הוסף פרטים
          </Link>
        </div>
      </div>
    </li>
  );
}

export default JobTrackingItem;
