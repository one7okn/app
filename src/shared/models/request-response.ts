export interface RequestResponseSuccess<T> {
  isSuccess: true;
  content: T;
  status: number;
}

export interface RequestResponseFail {
  isSuccess: false;
  content: unknown;
  status: number;
}

export type RequestResponse<T> = RequestResponseSuccess<T> | RequestResponseFail;
