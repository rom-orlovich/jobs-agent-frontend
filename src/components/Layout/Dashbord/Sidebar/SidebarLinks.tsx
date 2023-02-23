import { ReactNode } from 'react';
import { MdWork, MdOutlineLocationSearching, MdHistory } from 'react-icons/md';
interface NavLinkProps {
  link: string;
  isMargin?: boolean;
  text: string;
  icon?: ReactNode;
}

export const navLinks: (iconsStyle: string) => NavLinkProps[] = (iconsStyle) => [
  {
    link: '/',
    text: 'חיפוש',
    icon: <MdOutlineLocationSearching className={iconsStyle} />
  },
  {
    link: '/',
    text: 'משרות',
    icon: <MdWork className={iconsStyle} />
  },
  {
    link: '/',
    text: 'היסטוריה',
    icon: <MdHistory className={iconsStyle} />
  }
];
