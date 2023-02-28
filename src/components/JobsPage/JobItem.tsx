import { Job } from '@/lib/jobsScanner.types';
import Link from 'next/link';
import React from 'react';
import { MdBookmarkBorder } from 'react-icons/md';

function JobItem(props: Job & { index: number }) {
  const { link, title, from, reason, jobID, index } = props;
  return (
    <li
      className="flex-[100%] rounded-md bg-white p-4 shadow-md sm:flex-[45%] md:flex-[30%]"
      key={jobID + index}
    >
      <div>
        <button>
          <MdBookmarkBorder />
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
