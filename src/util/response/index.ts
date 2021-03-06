export default {
  response200: (message: string, data?: any) => ({
    status: '200 OK',
    message,
    data,
  }),
  response400: (message: string) => ({
    status: '400 Bad Request',
    message,
  }),
  response401: (message: string) => ({
    status: '401 Unauthorized',
    message,
  }),
  response403: (message: string, error?: any) => ({
    status: '403 Forbidden',
    message,
    error,
  }),
  response404: (message: string) => ({
    status: '404 Not Found',
    message,
  }),
  response409: (message: string) => ({
    status: '409 Conflict',
    message,
  }),
  response500: (message: string) => ({
    status: '500 Internal Server Error',
    message,
  }),
};
