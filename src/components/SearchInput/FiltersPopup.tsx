import { Popover } from '@headlessui/react';
import React, { PropsWithChildren } from 'react';
import { IoFilterCircleSharp } from 'react-icons/io5';
const filterPopupStyle = {
  popover: 'relative top-0 flex items-center',
  popoverButton: 'border-none focus:border-none focus:outline-none focus-visible:ring-white',
  filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl',
  panelContent:
    'absolute top-[2.4rem] left-[50%] z-10 min-h-[8rem] xs:min-w-[17rem]  min-w-[18rem]  rounded-lg bg-white p-4 shadow-lg translate-x-[-95%]'
};
function FiltersPopup({ children }: PropsWithChildren) {
  return (
    <Popover className={filterPopupStyle.popover}>
      <Popover.Button className={filterPopupStyle.popoverButton}>
        <IoFilterCircleSharp className={filterPopupStyle.filterIcon} />
      </Popover.Button>
      <Popover.Panel className={filterPopupStyle.panelContent}>{children} </Popover.Panel>
    </Popover>
  );
}

export default FiltersPopup;
