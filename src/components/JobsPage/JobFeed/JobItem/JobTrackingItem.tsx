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
    itemTracking: 'flex flex-col justify-between gap-2',
    dateContainer: 'flex flex-end',
    sendCVContainer: 'flex flex-end',

    linkTrackDetailsContainer: 'flex justify-center mt-2',
    linkTrackDetails: 'button-custom  bg-status-400 text-white text-sm  flex items-center gap-1'
  };
  const { link, title, jobID, index, mark, info, reason, isMatch, reasonStyle } = props;
  const localDateStr = createLocalDate(info?.createdAt);
  return (
    <li
      className={classNameGenerator(jobTrackingItemStyle.item, jobTrackingItemStyle.itemTracking)}
      key={jobID + index}
    >
      <div className={jobTrackingItemStyle.content}>
        <div className={jobTrackingItemStyle.bookmarkContainer}>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div dir="rtl" className={jobTrackingItemStyle.dateContainer}>
          <Field value={localDateStr} titleStyle={'font-bold'} title="נוצר ב-" />
        </div>
        <div className={jobTrackingItemStyle.title}>
          <Link href={link}> {title}</Link>
        </div>
        {props.company && <div> {props.company}</div>}
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
