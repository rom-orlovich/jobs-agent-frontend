export const createAutocompleteOptions = (filters: string[]) => {
  return filters.map((filter, i) => ({
    id: filter + i,
    title: filter,
    value: filter
  }));
};
