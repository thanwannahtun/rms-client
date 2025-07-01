import type { StateCreator } from "zustand";
import { safeGet, safePost, safePut } from "@/lib/api";

export interface BusAmenity {
    id: number | null;
    name: string;
}

export interface BusAmenitiesSlice {
    amenities: BusAmenity[];
    loading: boolean;
    error: string | null;
    fetchAmenities: () => Promise<void>;
    addAmenity: (bt: BusAmenity) => Promise<void>;
    updateAmenity: (bt: BusAmenity) => Promise<void>;
}

export const createBusAmenitiesSlice: StateCreator<
    BusAmenitiesSlice,
    [],
    [],
    BusAmenitiesSlice
> = (set, get) => ({
    amenities: [],
    loading: false,
    error: null,

    fetchAmenities: async () => {
        if (get().amenities.length > 0) return;
        set({ loading: true, error: null });
        try {
            const res = await safeGet<BusAmenity[]>("/amenities");

            if (res.success) {
                set({ amenities: res.data });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    addAmenity: async (bt) => {
        set({ loading: true, error: null });
        try {

            const res = await safePost<BusAmenity>("/amenities", bt);
            if (res.success) {
                set({ amenities: [...get().amenities, res.data] });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    updateAmenity: async (bt: BusAmenity) => {
        set({ loading: true, error: null });
        try {
            const res = await safePut<BusAmenity>(`/amenities/${bt.id}`, bt);
            if (res.success) {
                set({ amenities: get().amenities.map((bt) => (bt.id === res.data.id ? res.data : bt)) });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },
});
