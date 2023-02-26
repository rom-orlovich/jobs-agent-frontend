import React from 'react';
import { Popover } from '@headlessui/react';
import { IoFilterCircleSharp } from 'react-icons/io5';

import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { Job } from '@/lib/jobsScanner.types';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs/useFilterJobs';
function FiltersPopup({
  jobs,
  iconButtonProps,
  filterJobsProps
}: {
  jobs: Job[];
  iconButtonProps: IconButtonProps;
  filterJobsProps: ReturnUseFilterJobsProps;
}) {
  const { handleSearchValue } = filterJobsProps;
  // const checkMatchJob = (title?: string) => {
  //   if (title === 'match') return 'יש התאמה!';
  //   return title;
  // };
  const optionsReasons: Option<string>[] = jobs.map((job, i) => ({
    id: job.jobID + i,
    title: job.reason || '',
    value: job.reason || ''
  }));
  const filterPopupStyle = {
    filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl'
  };

  return (
    <Popover className="relative top-0 flex items-center ">
      <Popover.Button
        className={'border-none focus:border-none focus:outline-none focus-visible:ring-white'}
      >
        <IoFilterCircleSharp className={filterPopupStyle.filterIcon} />
      </Popover.Button>
      <Popover.Panel className="absolute top-[2.4rem] left-[50%] z-10  min-h-[8rem] min-w-[16rem] translate-x-[-50%] rounded-lg bg-white p-4 shadow-lg">
        <div className="">
          <Autocomplete
            label="חפש עפ התאמה"
            setValue={handleSearchValue('reason')}
            options={optionsReasons}
            inputLabelProps={{
              IconButtonProps: iconButtonProps
              // inputProps: {
              //   value: filterJobsProps.formValues.reason
              // }
            }}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default FiltersPopup;
