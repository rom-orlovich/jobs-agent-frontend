export const EXAMPLE_USER = {
  overallEx: 2,
  requirements: {
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
  userQuery: {
    position: 'Frontend',
    experience: '1,2', //Without -1 ,between 1-2,2-3,3-4,4-5,
    location: 'תל אביב',
    distance: '1', // 10,25,50,75,
    jobType: '1,2,3', // 1 hybrid, 2:home ,3:onsite
    scope: '1,2' // 1 full, 2:part
  }
};
