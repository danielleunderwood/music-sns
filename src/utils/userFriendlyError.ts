/** A class for sanitized errors. */
class UserFriendlyError extends Error {}

/** Return the message of an internal error or a standard error message. */
export const getSanitizedError = (e: unknown) => {
  if (e instanceof UserFriendlyError) {
    return e.message;
  }

  return "An unknown error occurred.";
};

export default UserFriendlyError;
