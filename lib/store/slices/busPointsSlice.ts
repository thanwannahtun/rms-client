import type { StateCreator } from "zustand";
import { safeGet, safePost, safePut } from "@/lib/api";

export interface BusPoint {
    id: number | null;
    name: string;
}

export interface BusPointsSlice {
    busPoints: BusPoint[];
    loading: boolean;
    error: string | null;
    fetchBusPoints: () => Promise<void>;
    addBusPoint: (bt: BusPoint) => Promise<void>;
    updateBusPoint: (bt: BusPoint) => Promise<void>;
}

export const createBusPointsSlice: StateCreator<
    BusPointsSlice,
    [],
    [],
    BusPointsSlice
> = (set, get) => ({
    busPoints: [],
    loading: false,
    error: null,

    fetchBusPoints: async () => {
        if (get().busPoints.length > 0) return;
        set({ loading: true, error: null });
        try {
            const res = await safeGet<BusPoint[]>("/bus_points");

            if (res.success) {
                set({ busPoints: res.data });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    addBusPoint: async (bt) => {
        set({ loading: true, error: null });
        try {

            const res = await safePost<BusPoint>("/bus_points", bt);
            if (res.success) {
                set({ busPoints: [...get().busPoints, res.data] });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    updateBusPoint: async (bt: BusPoint) => {
        set({ loading: true, error: null });
        try {
            const res = await safePut<BusPoint>(`/bus_points/${bt.id}`, bt);
            if (res.success) {
                set({ busPoints: get().busPoints.map((bt) => (bt.id === res.data.id ? res.data : bt)) });
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
