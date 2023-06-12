export const Cookies = {
  JWT: 'cookie-jwt',
};

export enum ErrorsMessages {
  INVALID_ID = 'Invalid ObjectId',
  NAME_EXIST = 'With name already exist',
  NOT_FOUND = 'With this id not found',
  PASSWORD_ERROR = 'Passwords do not match',
  PIN_ERROR = 'Pins do not match',
  EMAIL_EXIST = 'User with this email already exist',
  PHONE_EXIST = 'User with this phone already exist',
  LOGIN_ERROR = 'Could not log-in with the provided credentials',
  USER_NOT_FOUND = 'User not found',
}
