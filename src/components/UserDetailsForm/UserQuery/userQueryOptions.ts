import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { UserQuery } from '@/lib/types/api.types';

/**
 * Experience
 * Without
/1-2
/3-4
4-6
7+
 */
export const EXAMPLE_QUERY: UserQuery = {
  position: 'Frontend',
  experience: '1,2', //Without -1 ,between 1-2,2-3,3-4,4-5,
  location: 'תל אביב',
  distance: '1', // 10,25,50,75,
  jobType: '1,2,3', // 1 hybrid, 2:home ,3:onsite
  scope: '1,2' // 1 full, 2:part

  //   Active: true,
};
export const EXPERIENCE_OPTIONS: Option<string>[] = [
  {
    id: '1',
    title: 'בלי ניסיון',
    value: '1'
  },
  {
    id: '2',
    title: '1-2 שנים',
    value: '2'
  },
  {
    id: '3',
    title: '3-4 שנים',
    value: '3'
  },
  {
    id: '4',
    title: '5-6 שנים',
    value: '4'
  },
  {
    id: '5',
    title: '7+ שנים',
    value: '5'
  }
];
export const DISTANCE_OPTIONS: Option<string>[] = [
  {
    id: '1',
    title: '10 קמ',
    value: '1'
  },
  {
    id: '2',
    title: '25 קמ',
    value: '2'
  },
  {
    id: '3',
    title: '50 קמ',
    value: '3'
  },
  {
    id: '4',
    title: '75 קמ',
    value: '4'
  }
];

export const JOB_TYPES_OPTIONS: Option<string>[] = [
  {
    id: '1',
    title: 'עבודה היברדית',
    value: '1'
  },
  {
    id: '2',
    title: 'עבודה מהבית',
    value: '2'
  },
  {
    id: '3',
    title: 'במקום',
    value: '3'
  }
];
export const SCOPES_OPTIONS: Option<string>[] = [
  {
    id: '1',
    title: 'משרה מלאה',
    value: '1'
  },
  {
    id: '2',
    title: 'משרה חלקית',
    value: '2'
  }
];
