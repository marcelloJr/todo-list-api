export default {
  description: {
    IS_STRING: 'Description is must be string',
    IS_NOT_EMPTY: 'Description cannot be empty',
  },
  priority: {
    IS_ENUM:
      'Priority is invalid. Please, check endpoint to get all priorities availables',
  },
  todoList: {
    IS_NOT_EMPTY: 'To do list ID is required',
  },
  TODO_ITEM_NOT_EXISTS: 'To do list item does not exist',
};
