import { useAppStore } from "../useAppStore";

export const useDriversData = () => useAppStore((s) => s.drivers || []);
export const useDriversLoading = () => useAppStore((s) => s.loading);
export const useDriversError = () => useAppStore((s) => s.error);
export const useFetchDrivers = () => useAppStore((s) => s.fetchDrivers);
export const useAddDriver = () => useAppStore((s) => s.addDriver);
export const useUpdateDriver = () => useAppStore((s) => s.updateDriver);
