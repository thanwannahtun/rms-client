import { useAppStore } from "../useAppStore";

export const useRoutesData = () => useAppStore((s) => s.routes || []);
export const useRoutesLoading = () => useAppStore((s) => s.loading);
export const useRoutesError = () => useAppStore((s) => s.error);
export const useFetchRoutes = () => useAppStore((s) => s.fetchRoutes);
export const useAddRoute = () => useAppStore((s) => s.addRoute);
export const useUpdateRoute = () => useAppStore((s) => s.updateRoute);
