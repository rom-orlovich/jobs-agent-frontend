import { classNameGenerator } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import TrackButton from '../../../Buttons/TrackButton';
import { JobItemProps, jobItemStyle } from '../JobsFeed';
import Locations from './Locations';
function JobItem(props: JobItemProps) {
  const {
    fromClass,
    link,
    title,
    from,
    reason,
    jobID,
    index,
    mark,
    location,
    isMatch,
    reasonStyle,
    handleSaveObservedJob
  } = props;

  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <div className={fromClass}> {from} </div>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div className={jobItemStyle.title}>
          <Link target="_blank" href={link} onClick={handleSaveObservedJob}>
            {title}
          </Link>
        </div>
        {<div className="text-center"> {props.company ? props.company : 'אנונימי'}</div>}

        <Locations locations={location} />
        <div className={classNameGenerator(jobItemStyle.reason, reasonStyle)}>
          {isMatch ? '!יש התאמה' : reason}
        </div>
      </div>
    </li>
  );
}

export default JobItem;
