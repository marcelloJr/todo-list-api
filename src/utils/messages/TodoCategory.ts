export default {
  description: {
    IS_STRING: 'Description is must be string',
    IS_NOT_EMPTY: 'Description cannot be empty',
  },
  TODO_CATEGORY_NOT_EXISTS: 'To do category does not exist',
  TODO_CATEGORY_REFERENCED: (description: string) =>
    `${description} category is in use, it is not possible to delete it`,
};
