import { Job } from '@/lib/types/jobsScanner.types';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import TrackButton from '../../../Buttons/TrackButton';
import { jobItemStyle } from '../JobsFeed';
function JobItem(
  props: Job & {
    index: number;
    handleClickBookmark: MouseEventHandler<HTMLButtonElement>;
    mark: boolean;
  }
) {
  const { link, title, from, reason, jobID, index, mark } = props;

  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div className={jobItemStyle.title}>
          <Link href={link}> {title}</Link>{' '}
        </div>
        {props.company && <div> {props.company}</div>}
        <div>{props.location} </div>
        <div> {from} </div>
        <div className={jobItemStyle.reason}> {reason === 'match' ? '!יש התאמה' : reason} </div>
      </div>
    </li>
  );
}

export default JobItem;