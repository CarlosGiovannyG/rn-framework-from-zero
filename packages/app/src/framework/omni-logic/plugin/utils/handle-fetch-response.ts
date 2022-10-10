import { FetcherError } from "../../kernel/utils/errors";

export function getError(errors: any[] | null, status: number) {
  errors = errors ?? [{ message: 'Failed to fetch VTEX API' }];
  return new FetcherError({ errors, status });
}

export async function getAsyncError(res: Response) {
  const data = await res.json();
  return getError(data.errors, res.status);
}

const handleFetchResponse = async (res: Response) => {
  if (res.ok) {
    const response = await res.json();
    if (response?.errors && response?.errors.length) {
      throw getError(response.errors, res.status);
    }

    return response?.data || response;
  }

  throw await getAsyncError(res);
};

export default handleFetchResponse;
