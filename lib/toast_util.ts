import { toast } from "sonner";


export const showApiErrorMessageToast = (error: any, defaultValue?: string) => {
    toast.error(error.response?.data?.message ?? (defaultValue ?? "An error occurred"));
}

export const showApiError = (message: string) => {
    toast.error(message);
}

export const getApiErrorMessage = (error: any, defaultValue?: string) => {
    return error.response?.data?.message ?? (defaultValue ?? "An error occurred");
}