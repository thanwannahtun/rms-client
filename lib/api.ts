import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from "axios";
import { showApiError } from "./toast_util";

/**
 * Axios instance for client-side requests in Next.js frontend
 */
export const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3300/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

/**
 * Attach access token from localStorage if available (client-side only)
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    /// For CORS issue temp disabled
    // if (typeof window !== "undefined") {
    //     const token = localStorage.getItem("accessToken");
    //     if (token) {
    //         config.headers["Authorization"] = `Bearer ${token}`;
    //     }
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Handle global response logic like auth errors (401)
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            if (error.response?.status === 401) {
                console.warn("Unauthorized. Redirecting to login or refreshing token...");
                // Optionally clear token or trigger global auth handler
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Get user-friendly error message from Axios error
 */
export function extractAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; errors?: any }>;
        const responseMsg = axiosError.response?.data?.message;
        const fallback = axiosError.message;
        return responseMsg || fallback || "Unknown error occurred";
    }
    return "Unexpected error";
}


interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export async function safeGet<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await api.get<ApiResponse<T>>(url, config);
        return response.data;
    } catch (err) {
        const message = extractAxiosError(err);
        showApiError(message);
        return {
            success: false,
            message,
            data: null as unknown as T, // `data` must still exist for consistent shape
        };
    }
}


/**
 * Wrapper for POST requests with safe error handling
 */
export async function safePost<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response = await api.post<ApiResponse<T>>(url, data, config);
        return response.data;
    } catch (err) {
        const message = extractAxiosError(err);
        showApiError(message);
        return {
            success: false,
            message,
            data: null as unknown as T,
        };
    }
}

/**
 * Wrapper to handle file uploads with FormData
 */
export async function uploadFile<T>(url: string, file: File, fieldName = "file"): Promise<T | null> {
    const formData = new FormData();
    formData.append(fieldName, file);
    // formData.append('my_field', 'my value');
    // formData.append('my_buffer', new Buffer(10));
    // formData.append('my_file', fs.createReadStream('/foo/bar.jpg'));

    try {
        const response = await api.post<T>(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Upload error:", extractAxiosError(err));
        return null;
    }
}
