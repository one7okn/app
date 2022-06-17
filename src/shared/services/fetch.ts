import { RequestResponse } from '../models';

async function fetchHttp<T, K>(url: string, method: string, body?: T): Promise<RequestResponse<K>> {
  const init = {
    method,
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(`${url}`, init);
  const result = [204, 403, 500].includes(response.status) ? undefined : await response.json();
  return response.ok
    ? { isSuccess: true, content: result as unknown as K, status: response.status }
    : { isSuccess: false, content: result, status: response.status };
}

export const httpGet = async <T>(url: string): Promise<RequestResponse<T>> => {
  return await fetchHttp(url, 'GET');
};

export const httpPut = async <T>(url: string, body: T): Promise<RequestResponse<undefined>> => {
  return await fetchHttp(url, 'PUT', body);
};

export const httpPost = async <T>(url: string, body: T): Promise<RequestResponse<string>> => {
  return await fetchHttp(url, 'POST', body);
};

export const httpDelete = async (url: string): Promise<RequestResponse<undefined>> => {
  return await fetchHttp(url, 'DELETE');
};
