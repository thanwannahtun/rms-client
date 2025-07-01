import { useAppStore } from "../useAppStore";

export const useAmenitiesData = () => useAppStore((s) => s.amenities || []);
export const useAmenitiesLoading = () => useAppStore((s) => s.loading);
export const useAmenitiesError = () => useAppStore((s) => s.error);
export const useFetchAmenities = () => useAppStore((s) => s.fetchAmenities);
export const useAddAmenity = () => useAppStore((s) => s.addAmenity);
export const useUpdateAmenity = () => useAppStore((s) => s.updateAmenity);
