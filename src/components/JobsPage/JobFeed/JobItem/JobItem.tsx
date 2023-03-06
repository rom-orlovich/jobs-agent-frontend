import { classNameGenerator } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import TrackButton from '../../../Buttons/TrackButton';
import { JobItemProps, jobItemStyle } from '../JobsFeed';
import Locations from './Locations';
function JobItem(props: JobItemProps) {
  const { link, title, from, reason, jobID, index, mark, location, isMatch, reasonStyle } = props;

  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div className={jobItemStyle.title}>
          <Link href={link}> {title}</Link>
        </div>
        {props.company && <div> {props.company}</div>}
        <Locations locations={location} />
        <div> {from} </div>
        <div className={classNameGenerator(jobItemStyle.reason, reasonStyle)}>
          {isMatch ? '!יש התאמה' : reason}
        </div>
      </div>
    </li>
  );
}

export default JobItem;
