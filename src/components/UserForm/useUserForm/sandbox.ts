export const EXAMPLE_USER = {
  overallEx: 2,
  requirementsOptions: {
    javascript: {
      min: 0,
      max: 0
    }
  },
  excludeTechs: {
    'c#.net': true,
    php: true,
    c: true,
    'c#': true,
    java: true,
    'system administration': true,
    embedded: true,
    go: true,
    ruby: true,
    angular: true,
    net: true,
    qa: true
  },

  _id: '1',
  hashQueries: [],
  userQuery: {}
};

export interface ExperienceRange {
  min: number;
  max: number;
}
