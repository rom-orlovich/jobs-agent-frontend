import useForm from '@/hooks/useForm/useForm';
import { GenericRecord } from '@/lib/type';
import { MinMaxSelectOption } from '../../Profile/MinMaxSelect';
import { handleMinMaxValuesTransform } from './handlers';
export const EXAMPLE_USER = {
  overallEx: 2,
  requirementsOptions: {
    javascript: {
      min: 0,
      max: 0
    }
  },
  excludeTechs: {
    'c#.net': true,
    php: true,
    c: true,
    'c#': true,
    java: true,
    'system administration': true,
    embedded: true,
    go: true,
    ruby: true,
    angular: true,
    net: true,
    qa: true
  },

  _id: '1',
  hashQueries: [],
  userQuery: {}
};

export interface ExperienceRange {
  min: number;
  max: number;
}
function useUserForm() {
  const formInitialValue: GenericRecord<unknown> = {
    'overall-experience': 0
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
