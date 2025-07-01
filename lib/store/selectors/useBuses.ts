import { useAppStore } from "../useAppStore";

export const useBusesData = () => useAppStore((s) => s.buses || []);
export const useBusesLoading = () => useAppStore((s) => s.loading);
export const useBusesError = () => useAppStore((s) => s.error);
export const useFetchBuses = () => useAppStore((s) => s.fetchBuses);
export const useAddBus = () => useAppStore((s) => s.addBus);
export const useUpdateBus = () => useAppStore((s) => s.updateBus);
