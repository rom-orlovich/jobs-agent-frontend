import useForm from '@/hooks/useForm/useForm';

import { MinMaxSelectOption } from '../../Profile/MinMaxSelect';
import { handleMinMaxValuesTransform } from './handlers';

function useUserForm() {
  const formInitialValue = {
    'overall-experience': 0,
    requirementsOptions: {}
  };

  const { formValues, onChange, onSubmit, setFormValues } = useForm(formInitialValue);
  const setMinMaxSelect = (minMaxValues: MinMaxSelectOption[]) => {
    const requirementsOptions = handleMinMaxValuesTransform(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirementsOptions: requirementsOptions
      };
    });
  };

  const setOverallExperience = onChange;
  return {
    formValues,
    setOverallExperience,
    onSubmit,
    setMinMaxSelect
  };
}

export default useUserForm;
