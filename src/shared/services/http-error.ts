import { useCallback, useState } from 'react';
import { RequestResponseFail } from '../models';

export class HttpError extends Error {
  status: number;
  constructor(status: number) {
    super('A HTTP error occured');
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const useHttpErrorHandler = (): ((r: RequestResponseFail) => void) => {
  const [, throwError] = useState();
  return useCallback((r: RequestResponseFail): void => {
    throwError(() => {
      throw new HttpError(r.status);
    });
  }, []);
};
