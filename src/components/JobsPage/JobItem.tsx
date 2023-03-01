import { Job } from '@/lib/jobsScanner.types';

import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import TrackButton from '../Buttons/TrackButton';
const jobItemStyle = {
  item: 'flex-[100%]  rounded-md bg-white p-4 shadow-lg sm:flex-[45%] md:flex-[30%] ',
  content: 'flex gap-2 flex-col',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-base',
  buttonStatusContainer: 'flex justify-center mt-3'
};

function JobItem(
  props: Job & {
    index: number;
    handleClickBookmark: MouseEventHandler<HTMLButtonElement>;
    mark: boolean;
  }
) {
  const { link, title, from, reason, jobID, index, mark } = props;
  const trackButtonDisplay = {
    true: {
      text: 'ערוך'
    },
    false: {
      text: 'עקוב'
    }
  };

  const trackButtonCur = trackButtonDisplay[`${mark}`];
  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <TrackButton onClick={props.handleClickBookmark} mark={mark}>
            {trackButtonCur.text}
          </TrackButton>
        </div>
        <div>
          <Link href={link}> {title}</Link>{' '}
        </div>
        {props.company && <div> {props.company}</div>}
        <div>{props.location} </div>
        <div> {from} </div>
        <div> {reason === 'match' ? '!יש התאמה' : reason} </div>
      </div>
      {<div className={jobItemStyle.buttonStatusContainer}></div>}
    </li>
  );
}

export default JobItem;
