interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const createResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
  error?: unknown
): ApiResponse<T> => {
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
      ? error.message
      : Boolean(error)
      ? "An unknown error occurred"
      : undefined;

  return {
    success,
    message,
    data,
    error: errorMessage,
  };
};
