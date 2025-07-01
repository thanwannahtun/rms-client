import { useAppStore } from "../useAppStore";

export const useBusPointsData = () => useAppStore((s) => s.busPoints || []);
export const useBusPointsLoading = () => useAppStore((s) => s.loading);
export const useBusPointsError = () => useAppStore((s) => s.error);
export const useFetchBusPoints = () => useAppStore((s) => s.fetchBusPoints);
export const useAddBusPoint = () => useAppStore((s) => s.addBusPoint);
export const useUpdateBusPoint = () => useAppStore((s) => s.updateBusPoint);
