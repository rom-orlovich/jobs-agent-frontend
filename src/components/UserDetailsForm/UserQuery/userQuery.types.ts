import { InputLabelProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { FormComponents } from '@/hooks/useUserDetailsForm/useUserDetailsForm';

export type AutocompletePropsUserQuery = FormComponents<unknown> & {
  inputLabelProps?: InputLabelProps;
};
