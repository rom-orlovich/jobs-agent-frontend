import { InputLabelProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { FormComponents } from '@/hooks/useProfileForm/useProfileForm';

export type AutocompletePropsUserQuery = FormComponents<unknown> & {
  inputLabelProps?: InputLabelProps;
};
