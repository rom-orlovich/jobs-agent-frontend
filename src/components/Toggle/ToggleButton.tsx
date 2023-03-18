import { classNameGenerator } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import React, { PropsWithChildren } from 'react';
import { ButtonProps, LabelProps, SpanProps } from '../HTML.types';

function ToggleButton({
  checked,
  name,
  onChange,
  spanProps,
  children,
  labelProps
}: Parameters<typeof Switch>['0'] & {
  spanProps?: SpanProps;
  labelProps?: LabelProps;
  buttonProps?: ButtonProps;
} & PropsWithChildren) {
  return (
    <Switch.Group>
      <span
        className={classNameGenerator(
          'flex w-full items-center justify-end gap-2',
          spanProps?.className
        )}
        {...spanProps}
      >
        <Switch
          value={'on'}
          name={name}
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-success-primary-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 rounded-full bg-white transition`}
          />
        </Switch>
        <Switch.Label className={classNameGenerator(labelProps?.className)}>{children}</Switch.Label>
      </span>
    </Switch.Group>
  );
}

export default ToggleButton;
