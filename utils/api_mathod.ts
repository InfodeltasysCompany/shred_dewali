// apiUtility.ts
import { Alert } from 'react-native';


export interface APIResponse {
    message: string;
    status: string;
    [key: string]: any; // This can represent other properties dynamically
  }
  
  export interface Params {
    [key: string]: string | number;
  }
  
  export interface RequestData {
    [key: string]: any; // Represents the data to be sent in FormData
  }
// Helper function for API requests with optional callback
export const apiRequest = async <T = APIResponse>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
  route: string, 
  data: RequestData | null = null, 
  params: Params | null = null, 
  callback?: (data: T) => void // Optional callback function after the API call
): Promise<T> => {
  try {
    const url = new URL(route, process.env.BASE_URL); // Combine base URL and route

    // For GET method, append params to the URL query string
    if (method === 'GET' && params) {
      Object.keys(params).forEach((key) => {
        url.searchParams.append(key, String(params[key]));
      });
    }

    const headers = new Headers();

    // Set Content-Type for methods that require it (POST, PUT, DELETE)
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      headers.append('Content-Type', 'multipart/form-data');
    }

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    // Add body (FormData) for POST, PUT, DELETE requests
    if (data) {
      const formData = new FormData();
      // If `data` is an object, append its properties to the form data
      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      requestOptions.body = formData;
    }

    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const result: T = await response.json();

    // If a callback is provided, call it with the result
    if (callback) {
      callback(result);
    }

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    Alert.alert('Error', 'Something went wrong with the API request.');
    throw error;
  }
};
