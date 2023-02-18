import React from 'react';
import Autocomplete from '../Inputs/Autocomplete/Autocomplete';

function BlackListStack() {
  return (
    <Autocomplete
      multiple
      options={['pthp', 'angular', 'c+'].map((el) => ({
        id: el,
        title: el,
        value: el
      }))}
    />
  );
}

export default BlackListStack;
