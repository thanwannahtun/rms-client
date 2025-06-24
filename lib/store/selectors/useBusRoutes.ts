import { useAppStore } from "../useAppStore";

// Bus Routes Selectors
export const useBusRoutes = () => useAppStore((s) => s.routes);
export const useFetchBusRoutes = () => useAppStore((s) => s.fetchRoutes);
export const useAddBusRoute = () => useAppStore((s) => s.addRoute);
export const useBusRoutesLoading = () => useAppStore((s) => s.loading);
export const useBusRoutesError = () => useAppStore((s) => s.error);