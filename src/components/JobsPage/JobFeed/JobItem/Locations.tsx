import ToggleTopic from '@/components/ToggleTopic/ToggleTopic';
import React from 'react';
const locationsStyle = {
  locationsWrapper: 'flex flex-col flex-wrap ',
  toggle: 'flex flex-col justify-start',
  location: 'flex-[30%] text-center'
};

function Locations({ locations }: { locations?: string }) {
  if (!locations) return <></>;
  const locationsArr = locations?.split(',');
  return (
    <ul className={locationsStyle.location}>
      <ToggleTopic
        buttonProps={{
          dir: 'rtl',
          className: 'justify-start'
        }}
        toggleWrapper={{
          className: locationsStyle.toggle
        }}
        headingProps={{
          dir: 'rtl',
          title: 'מיקום'
        }}
      >
        {locationsArr.map((location, i) => (
          <li className={locationsStyle.location} key={location + i}>
            {location}
          </li>
        ))}
      </ToggleTopic>
    </ul>
  );
}

export default Locations;
