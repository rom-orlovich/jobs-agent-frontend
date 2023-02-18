import useForm from '@/hooks/useForm/useForm';

import { MinMaxSelectOption } from '../../Profile/MinMaxSelect';
import { handleExcludedRequirements, handleRequirements } from './handlers';

function useUserForm() {
  const formInitialValue = {
    'overall-experience': 0,
    requirements: {}
  };

  const { formValues, onChange, onSubmit, setFormValues } = useForm(formInitialValue);
  const setRequirements = (minMaxValues: MinMaxSelectOption[]) => {
    const requirements = handleRequirements(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirements: requirements
      };
    });
  };
  const setExcludedRequirements = (values: string[]) => {
    const excludedRequirements = handleExcludedRequirements(values);
    setFormValues((pre) => {
      return {
        ...pre,
        excludedRequirements: excludedRequirements
      };
    });
  };

  const setOverallExperience = onChange;
  return {
    formValues,
    setOverallExperience,
    onSubmit,
    setRequirements,
    setExcludedRequirements
  };
}

export default useUserForm;
