/* eslint-disable prettier/prettier */
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import { ReturnUseFilterJobsProps } from '@/hooks/useFiltersHooks/useFilterJobs';

import { MutateJobs } from '@/lib/types/jobsScanner.types';

import React, { useMemo } from 'react';

function SelectStatusObserved({handleSetFilterValue,formValues,mutate}: ReturnUseFilterJobsProps&{ mutate: MutateJobs;}) {
  
  const STATUS_OBSERVED_OPTIONS: Option<boolean | undefined>[] = [
    {
      id: 'הצג הכל',
      title: 'הצג הכל',
      value: undefined
    },
    {
      id: 'משרות חדשות',
      title: 'משרות חדשות',
      value: false
    },
    {
      id: 'משרות שצפית',
      title: 'משרות שצפית',
      value: true
    },
  
  ];

  const defaultValue=useMemo(()=>STATUS_OBSERVED_OPTIONS.find(status=>status.value===formValues.jobObserved),[STATUS_OBSERVED_OPTIONS,formValues.jobObserved])

  return (
    <SelectInput
      setValue={(v)=>{handleSetFilterValue('jobObserved')(v); mutate()}}
      defaultValue={defaultValue|| STATUS_OBSERVED_OPTIONS[0]}
      optionsElProps={{
        className: 'text-right'
      }}
      buttonProps={{
        className: 'w-full text-right'
      }}
      labelProps={{
        title: 'סטטוס משרות שצפית',
  className:"self-start",
      }}
      options={STATUS_OBSERVED_OPTIONS}
      selectInputWrapper={{
        dir: 'rtl',
        className: 'w-full'
      }}
    />
  );
}

export default SelectStatusObserved;
