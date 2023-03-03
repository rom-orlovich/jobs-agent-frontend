/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job } from '@/lib/jobsScanner.types';
import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import { getCollection, getDocumentsByName } from './utils';

export const getLocations = async (name: string) => {
  const locationsDocs = await getDocumentsByName(name, 'locations', 'locationName');
  return locationsDocs;
};

export const getPositions = async (name: string) => {
  const positionsDocs = await getDocumentsByName(name, 'positions', 'positionName');
  return positionsDocs;
};
