import TrackButton from '@/components/Buttons/TrackButton';
import Field from '@/components/Field/Field';
import { JobItemProps, jobItemStyle } from '@/components/JobsPage/JobFeed/JobsFeed';
import { createLocalDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { jobTrackingItemStyle } from '../JobTrackingItem';

function JobInfo({
  company,
  from,
  fromClass,
  handleClickBookmark,
  mark,
  info,
  link,
  title
}: JobItemProps) {
  const localDateStr = createLocalDate(info?.updatedAt);
  return (
    <div className={`${jobItemStyle.content} ${jobTrackingItemStyle.content}`}>
      <div className={jobItemStyle.bookmarkContainer}>
        <div className={fromClass}> {from} </div>
        <TrackButton onClick={handleClickBookmark} mark={mark} />
      </div>
      <div dir="rtl" className={jobTrackingItemStyle.dateContainer}>
        <Field value={localDateStr} titleStyle={'font-bold'} title="עודכן ב-" />
      </div>
      <div className={jobItemStyle.title}>
        <Link target="_blank" href={link}>
          {title}
        </Link>
      </div>
      {company && <div className="text-center"> {company}</div>}
    </div>
  );
}

export default JobInfo;
