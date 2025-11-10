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
