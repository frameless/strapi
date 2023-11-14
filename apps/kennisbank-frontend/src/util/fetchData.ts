interface FetchDataProps {
  url: string;
  query?: string;
  variables?: any;
  method?: string;
}

export const fetchData = async ({ url, query, variables, method = 'POST' }: FetchDataProps) => {
  try {
    const response = await fetch(url, {
      method,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        method !== 'GET'
          ? JSON.stringify({
              query,
              variables,
            })
          : undefined,
    });
    if (!response.ok) {
      const { logger } = new ErrorHandler();
      logger();
      switch (response.status) {
        case 400:
          throw new ErrorHandler(response.statusText, {
            statusCode: 400,
          });
        case 403:
          throw new ErrorHandler('Forbidden', {
            statusCode: 403,
          });
        case 404:
          throw new ErrorHandler('Not found', {
            statusCode: 404,
          });
        case 422:
          throw new ErrorHandler('Unprocessable entity', {
            statusCode: 422,
          });
        case 500:
          throw new ErrorHandler('Internal server error', {
            statusCode: 500,
          });
        case 503:
          logger();
          throw new ErrorHandler('Service unavailable', {
            statusCode: 503,
          });
        case 504:
          throw new ErrorHandler('Gateway timeout', {
            statusCode: 504,
          });
        case 505:
          throw new ErrorHandler('HTTP version not supported', {
            statusCode: 505,
          });
        default:
          throw new ErrorHandler(response.statusText, {
            statusCode: response.status,
          });
      }
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new ErrorHandler(error?.message, {
      statusCode: error?.options?.statusCode,
    });
  }
};

type Options = {
  statusCode: number;
};

export class ErrorHandler extends Error {
  constructor(
    message?: string,
    public options?: Options,
  ) {
    super(message);
    this.name = 'ErrorHandler';
    this.options = options;
  }
  // this logger method should be used only on the server side to give some information when something goes wrong
  logger() {
    // eslint-disable-next-line no-console
    console.log({
      message: this?.message,
      statusCode: this?.options?.statusCode,
    });
  }
}
