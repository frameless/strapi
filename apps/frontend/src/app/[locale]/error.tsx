'use client'; // Error components must be Client Components

import { useEffect, useState } from 'react';
// TODO IMPROVE THIS PAGE

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const [, setErrorMessage] = useState<Error>();
  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      {/* <p>{errorMessage?.message}</p> */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
