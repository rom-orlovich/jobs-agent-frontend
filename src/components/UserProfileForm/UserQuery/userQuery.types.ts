import { InputLabelProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { ProfileFormComponentsProps } from '@/hooks/useProfileForm/useProfileForm';

export type AutocompletePropsUserQuery = ProfileFormComponentsProps<unknown> & {
  inputLabelProps?: InputLabelProps;
};
