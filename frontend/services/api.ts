const BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiClient<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
      next: options.method && options.method !== "GET" ? undefined : { revalidate: 60 },
    });

    if (!response.ok) {
      throw new ApiError(`Request gagal (${response.status})`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Network error: tidak dapat terhubung ke DummyJSON API.", 503);
  }
}
