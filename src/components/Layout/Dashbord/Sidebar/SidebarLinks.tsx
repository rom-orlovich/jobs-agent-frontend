import { APP_ROUTES } from '@/lib/routes';
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
    link: `/${APP_ROUTES.SEARCH_PAGE}`,
    text: 'חיפוש',
    icon: <MdOutlineLocationSearching className={iconsStyle} />
  },
  {
    link: `/${APP_ROUTES.JOBS_PAGE}`,
    text: 'משרות',
    icon: <MdWork className={iconsStyle} />
  },
  {
    link: `${APP_ROUTES.SEARCH_HISTORY_PAGE}`,
    text: 'היסטוריה',
    icon: <MdHistory className={iconsStyle} />
  }
];
