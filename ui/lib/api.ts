// Extend ApiResponse type if not already exported
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const DEFAULT_TIMEOUT = 8000;

const withTimeout = (ms: number): AbortController => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
};

const isJsonResponse = (res: Response) =>
  res.headers.get("content-type")?.includes("application/json");

const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  const body = isJsonResponse(res) ? await res.json() : null;

  if (!res.ok) {
    return {
      error: body?.error || `Request failed: ${res.status}`,
    };
  }

  return { data: body as T };
};

const handleError = (err: unknown): ApiResponse<never> => {
  if (err instanceof DOMException && err.name === "AbortError") {
    return { error: "Request timed out" };
  }
  if (err instanceof Error) {
    return { error: err.message };
  }
  return { error: "Unexpected error occurred" };
};

// 🔁 Reusable Request Helpers

export const get = async <T>(
  endpoint: string,
  timeout = DEFAULT_TIMEOUT,
  baseUrl = process.env.NEXT_PUBLIC_API_URL
): Promise<ApiResponse<T>> => {
  const controller = withTimeout(timeout);
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err) {
    return handleError(err);
  }
};

export const post = async <T>(
  endpoint: string,
  payload: unknown,
  timeout = DEFAULT_TIMEOUT,
  baseUrl = process.env.NEXT_PUBLIC_API_URL
): Promise<ApiResponse<T>> => {
  const controller = withTimeout(timeout);
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err) {
    return handleError(err);
  }
};

export const put = async <T>(
  endpoint: string,
  payload: unknown,
  timeout = DEFAULT_TIMEOUT,
  baseUrl = process.env.NEXT_PUBLIC_API_URL
): Promise<ApiResponse<T>> => {
  const controller = withTimeout(timeout);
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err) {
    return handleError(err);
  }
};

export const del = async <T>(
  endpoint: string,
  timeout = DEFAULT_TIMEOUT,
  baseUrl = process.env.NEXT_PUBLIC_API_URL
): Promise<ApiResponse<T>> => {
  const controller = withTimeout(timeout);
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err) {
    return handleError(err);
  }
};
