// lib/store/slices/createBusSlice.ts
import type { StateCreator } from "zustand";
import { safeGet, safePost, safePut } from "@/lib/api";
import { Bus } from "@/lib/types";

export interface BusSlice {
    buses: Bus[];
    loading: boolean;
    error: string | null;
    fetchBuses: () => Promise<void>;
    addBus: (bus: Omit<Bus, "id" | "createdAt" | "updatedAt" | "busType" | "driver">) => Promise<void>;
    updateBus: (bus: Omit<Bus, "createdAt" | "updatedAt" | "busType" | "driver">) => Promise<void>;
}

export const createBusSlice: StateCreator<
    BusSlice,
    [],
    [],
    BusSlice
> = (set, get) => ({
    buses: [],
    loading: false,
    error: null,

    fetchBuses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await safeGet<Bus[]>("/buses");
            if (res.success) {
                set({ buses: res.data });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    addBus: async (bus) => {
        set({ loading: true, error: null });
        try {
            const res = await safePost<Bus>("/buses", bus);
            if (res.success) {
                set({ buses: [...get().buses, res.data] });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    updateBus: async (bus) => {
        set({ loading: true, error: null });
        try {
            const res = await safePut<Bus>(`/buses/${bus.id}`, bus);
            if (res.success) {
                set({
                    buses: get().buses.map((b) => (b.id === res.data.id ? res.data : b)),
                });
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
