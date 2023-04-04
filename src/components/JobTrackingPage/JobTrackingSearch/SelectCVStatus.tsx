/* eslint-disable prettier/prettier */
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { ReturnUseJobsTrackingFilterProps } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';
import React from 'react';

function SelectCVStatus({handleSetFilterValue,formValues}: ReturnUseJobsTrackingFilterProps) {
  
  const STATUS_CV_OPTIONS: Option<boolean | undefined>[] = [
    {
      id: 'הצג הכל',
      title: 'הצג הכל',
      value: undefined
    },
    {
      id: 'נשלחו',
      title: 'נשלחו',
      value: true
    },
    {
      id: 'לא נשלחו',
      title: 'לא נשלחו',
      value: false
    }
  ];
  const defaultValue=STATUS_CV_OPTIONS.find(status=>status.value===formValues.CVwasSent)
  console.log(defaultValue);
  return (
    <SelectInput
      setValue={handleSetFilterValue('CVwasSent')}
      defaultValue={defaultValue|| STATUS_CV_OPTIONS[0]}
      optionsElProps={{
        className: 'text-right'
      }}
      buttonProps={{
        className: 'w-full text-right'
      }}
      labelProps={{
        title: 'סטטוס קו"ח'
      }}
      options={STATUS_CV_OPTIONS}
      selectInputWrapper={{
        dir: 'rtl',
        className: 'w-full'
      }}
    />
  );
}

export default SelectCVStatus;
