import { InputLabelProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { FormComponents } from '@/hooks/useUserProfileForm/useUserProfileForm';

export type AutocompletePropsUserQuery = FormComponents<unknown> & {
  inputLabelProps?: InputLabelProps;
};
