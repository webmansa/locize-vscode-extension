import { HttpError } from "../helpers/HttpErrors";
import locize from '../config/locize/export';
import { vscode } from "./vscode";

const BASE_URL: string = locize.baseUrl;

interface RequestConfig extends RequestInit {
}

async function apiClient<T = any, B = any>(
  endpoint: string,
  method = "GET",
  body?: B | null,
  customHeaders: HeadersInit = {},
  customConfig: Partial<RequestConfig> = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${locize.apiKey}`,
    ...customHeaders,
  };

  const config: RequestConfig = {
    method,
    headers,
    ...customConfig, // Allow overriding fetch options like cache, mode, etc.
  };

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: any = { message: response.statusText };
      vscode.postMessage({
        command: "toast",
        text: `HTTP error! Status: ${response.status}, ${errorData}`,
      });

      throw new HttpError(
        `HTTP error! Status: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null as T;
    }

    if (response.status === 401) {
      vscode.postMessage({
        command: "toast",
        text: `Unauthorized: Please check your API key.`,
      });

      return null as T;
    }

    if (!response.ok || response.status === 412) {
      vscode.postMessage({
        command: "toast",
        text: `Error: Unnecessary Request: Nothing changed!`,
      });

      return null as T;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Error:", error);
    if (error instanceof HttpError) {
      // It's an HTTP error we threw, re-throw it
      throw error;
    } else {
      // Likely a network error or CORS issue
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}


export const get = <T = any>(
  endpoint: string,
  headers?: HeadersInit,
  config?: Partial<RequestConfig>
) => apiClient<T>(endpoint, "GET", null, headers, config);

export const post = <T = any, B = any>(
  endpoint: string,
  body: B,
  headers?: HeadersInit,
  config?: Partial<RequestConfig>
) => apiClient<T, B>(endpoint, "POST", body, headers, config);


export default apiClient;
