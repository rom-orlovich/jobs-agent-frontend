import { Job } from '@/lib/jobsScanner.types';
import Link from 'next/link';
import React from 'react';

function JobItem(props: Job & { index: number }) {
  const { link, title, from, reason, jobID, index } = props;
  return (
    <li className="rounded-md bg-white p-4 shadow-md sm:flex-[50%] md:flex-[30%]" key={jobID + index}>
      <div>
        <Link href={link}> {title}</Link>{' '}
      </div>
      <div> {from} </div>
      <div> {reason || 'jobs is match'} </div>
    </li>
  );
}

export default JobItem;
