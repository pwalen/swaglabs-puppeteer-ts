export const ACCEPTED_USERNAMES = {
  STANDARD_USER: 'standard_user',
  LOCKED_OUT_USER: 'locked_out_user',
  PROBLEM_USER: 'problem_user',
  PERFORMANCE_GLITCH_USER: 'performance_glitch_user',
  ERROR_USER: 'error_user',
  VISUAL_USER: 'visual_user',
} as const;

export const ACCEPTED_PASSWORDS = {
  PASSWORD: 'secret_sauce',
} as const;

export const INCORRECT_USERNAMES = {
  INCORRECT_USERNAME: 'incorrect_username',
} as const;

export const INCORRECT_PASSWORDS = {
  INCORRECT_PASSWORD: 'incorrect_password',
};

export const PAGE_DATA = {
  PAGE_TITLE: 'Swag Labs',
  PASSWORD_IS_REQUIRED: 'Epic sadface: Password is required',
  USERNAME_IS_REQUIRED: 'Epic sadface: Username is required',
  USERNAME_AND_PASSWORD_DO_NOT_MATCH:
    'Epic sadface: Username and password do not match any user in this service',
  ONLY_ACCESS_INVENTORY_WHEN_LOGGED_IN:
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
} as const;
