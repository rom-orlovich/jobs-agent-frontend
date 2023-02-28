import { Job } from '@/lib/jobsScanner.types';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { FaRegBookmark } from 'react-icons/fa';
const jobItemStyle = {
  item: 'flex-[100%] rounded-md bg-white p-4 shadow-md sm:flex-[45%] md:flex-[30%]',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-xl'
};

function JobItem(
  props: Job & { index: number; handleClickBookmark: MouseEventHandler<HTMLButtonElement> }
) {
  const { link, title, from, reason, jobID, index } = props;
  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.bookmarkContainer}>
        <button onClick={props.handleClickBookmark} className={jobItemStyle.bookmarkButton}>
          <FaRegBookmark />
        </button>
      </div>
      <div> {props.jobID}</div>
      <div>
        <Link href={link}> {title}</Link>{' '}
      </div>
      <div> {props.company}</div>
      <div>{props.location} </div>
      <div> {from} </div>
      <div> {reason === 'match' ? '!יש התאמה' : reason} </div>
    </li>
  );
}

export default JobItem;
