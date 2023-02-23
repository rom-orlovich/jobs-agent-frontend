import React from 'react';
import HamburgerMenu from '../../Navabar/HamburgerMenu/HamburgerMenu';

function Sidebar() {
  return (
    <section className="fixed top-0 flex h-full min-w-[4rem] flex-col items-center divide-y-2 bg-nav-500 shadow-lg">
      <HamburgerMenu />
    </section>
  );
}

export default Sidebar;
