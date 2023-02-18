import { GenericRecord } from '@/lib/type';
import { MinMaxSelectOption } from './Profile/MinMaxSelect';
import useUserForm from './useUserForm/useUserForm';
export type FormComponents<T> = T & ReturnType<typeof useUserForm>;

export type MinMaxSelectValueWithoutTitle = OmitKey<MinMaxSelectOption, 'title'>;
export type requirements = GenericRecord<MinMaxSelectValueWithoutTitle>;
