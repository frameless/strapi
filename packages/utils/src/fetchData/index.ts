import { ErrorHandler } from '../errorHandler';

interface HandleGraphqlRequestProps {
  query?: string;
  variables: any;
  headers?: HeadersInit;
}

const handleGraphqlRequest = ({ query, variables, headers }: HandleGraphqlRequestProps) =>
  ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Merge custom headers (including the ability to overwrite 'Content-Type')
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  }) as RequestInit;

export interface FetchDataProps {
  url: string;
  query?: string;
  variables?: any;
  method?: string;
  headers?: HeadersInit; // Allow custom headers to be passed
}

/**
 * @description Fetches data from the server (GraphQL or REST).
 * @param {string} url - The URL to fetch data from.
 * @param {string} query - The GraphQL query (if applicable).
 * @param {any} variables - The variables to pass to the GraphQL queries.
 * @param {string} method - The HTTP method, default is POST for GraphQL.
 * @param {HeadersInit} headers - Custom headers to pass to the request.
 * @returns {Promise<T>} - The fetched data.
 */
export const fetchData = async <T>({
  url,
  query,
  variables,
  method = 'POST',
  headers = {}, // Default to an empty object if no headers are provided
}: FetchDataProps): Promise<T> => {
  // Default headers, which can be overwritten by custom headers (e.g., Content-Type)
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const requestOptions: RequestInit = query
    ? handleGraphqlRequest({ query, variables, headers: { ...defaultHeaders, ...headers } })
    : {
        method,
        cache: 'no-store',
        headers: {
          ...defaultHeaders,
          ...headers, // Merge custom headers with default ones (overwriting defaults if needed)
        },
      };

  try {
    const response = await fetch(url, requestOptions);

    // Check for non-successful responses (status not in the 2xx range)
    if (!response.ok) {
      handleHttpError(response);
    }

    const data = await response.json();

    // Handle GraphQL-specific errors
    if (data.errors && data.errors.length > 0) {
      data.errors.forEach(handleGraphqlError); // Process each error
    }

    return data;
  } catch (error: any) {
    // Handle and log client-side or unexpected errors
    throw new ErrorHandler(error.message || 'Unknown error occurred', {
      statusCode: error?.options?.statusCode || 500,
    });
  }
};

/**
 * Handle common HTTP errors and throw the appropriate ErrorHandler
 * @param response - Fetch API Response object
 */
const handleHttpError = (response: Response) => {
  const status = response.status;

  let errorMessage = response.statusText || 'Unknown error';

  // Specific error messages based on status codes
  switch (status) {
    case 400:
      errorMessage = 'Bad Request';
      break;
    case 401:
      errorMessage = 'Unauthorized';
      break;
    case 403:
      errorMessage = 'Forbidden';
      break;
    case 404:
      errorMessage = 'Resource Not Found';
      break;
    case 422:
      errorMessage = 'Unprocessable Entity';
      break;
    case 500:
      errorMessage = 'Internal Server Error';
      break;
    case 503:
      errorMessage = 'Service Unavailable';
      break;
    case 504:
      errorMessage = 'Gateway Timeout';
      break;
    case 505:
      errorMessage = 'HTTP Version Not Supported';
      break;
    default:
      errorMessage = `Unexpected error: ${status}`;
      break;
  }
  throw new ErrorHandler(errorMessage, { statusCode: status });
};

/**
 * Handle GraphQL-specific errors like 'Forbidden access'
 * @param error - The error object returned by GraphQL
 */
const handleGraphqlError = (error: any) => {
  const errorMessage = error?.message || 'GraphQL error';
  const errorCode = error?.extensions?.code || 400; // Handle extensions (specific to GraphQL)
  // Handle known GraphQL error messages
  if (errorCode === 'FORBIDDEN') {
    throw new ErrorHandler('Forbidden access: You do not have the required permissions.', {
      statusCode: 403,
    });
  }

  throw new ErrorHandler(errorMessage, {
    statusCode: errorCode,
  });
};