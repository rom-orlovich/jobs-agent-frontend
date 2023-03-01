import { Job } from '@/lib/jobsScanner.types';
import { APP_ROUTES } from '@/lib/routes';

import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import TrackButton from '../Buttons/TrackButton';
const jobItemStyle = {
  item: 'flex flex-[100%] flex-col justify-between rounded-md bg-white p-4 shadow-lg sm:flex-[45%] md:flex-[30%] ',
  content: 'flex gap-2 flex-col',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-xl',
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
      href: APP_ROUTES.JOBS_TRACK_EDIT,
      text: 'ערוך מעקב'
    },
    false: {
      href: APP_ROUTES.JOBS_TRACK_ADD,
      text: 'עקוב'
    }
  };
  const trackButtonCur = trackButtonDisplay[`${mark}`];
  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <button onClick={props.handleClickBookmark} className={jobItemStyle.bookmarkButton}>
            {mark ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
        <div> {props.jobID}</div>
        <div>
          <Link href={link}> {title}</Link>{' '}
        </div>
        {props.company && <div> {props.company}</div>}
        <div>{props.location} </div>
        <div> {from} </div>
        <div> {reason === 'match' ? '!יש התאמה' : reason} </div>
      </div>
      {
        <div className={jobItemStyle.buttonStatusContainer}>
          <TrackButton href={trackButtonCur.href}> {trackButtonCur.text}</TrackButton>
        </div>
      }
    </li>
  );
}

export default JobItem;
