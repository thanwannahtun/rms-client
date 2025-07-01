import { useAppStore } from "../useAppStore";

export const useBusTypesData = () => useAppStore((s) => s.busTypes || []);
export const useBusTypesLoading = () => useAppStore((s) => s.loading);
export const useBusTypesError = () => useAppStore((s) => s.error);
export const useFetchBusTypes = () => useAppStore((s) => s.fetchBusTypes);
export const useAddBusType = () => useAppStore((s) => s.addBusType);
export const useUpdateBusType = () => useAppStore((s) => s.updateBusType);
