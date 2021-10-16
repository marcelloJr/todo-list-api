export default {
  fullName: {
    IS_STRING: 'Fullname is must be string',
    IS_NOT_EMPTY: 'Fullname cannot be empty',
  },
  email: {
    IS_STRING: 'Email must be valid',
    IS_NOT_EMPTY: 'Email cannot be empty',
  },
  password: {
    IS_STRING: 'Password is must be string',
    IS_NOT_EMPTY: 'Password cannot be empty',
    MIN_LENGTH: 'Password must be longer than or equal to 8 characters',
    EMAIL_UNIQUE: 'Email is already in use',
  },
  USER_NOT_EXISTS: 'User does not exist',
};
