import { MouseEventHandler } from 'react';
import { IconBaseProps } from 'react-icons';
import { ButtonProps } from '../HTML.types';

export interface CircleButtonProps extends ButtonProps {
  iconsProps?: IconBaseProps;
}
export type TriggerByHash = (hash?: string) => MouseEventHandler<HTMLButtonElement>;
