import { GenericRecord } from '@/lib/types/types';
import { ReactNode } from 'react';
import { MdWork, MdOutlineLocationSearching, MdHistory } from 'react-icons/md';
interface NavLinkProps {
  link: string;
  isMargin?: boolean;
  text: string;
  icon?: ReactNode;
  query?: GenericRecord<boolean>;
}

export const navLinks: (iconsStyle: string) => NavLinkProps[] = (iconsStyle) => [
  {
    link: '/search',
    text: 'חיפוש',
    icon: <MdOutlineLocationSearching className={iconsStyle} />
  },
  {
    link: '/jobs',
    text: 'משרות',
    icon: <MdWork className={iconsStyle} />
  },
  {
    link: '/search/history',
    text: 'היסטוריה',
    icon: <MdHistory className={iconsStyle} />
  }
];
