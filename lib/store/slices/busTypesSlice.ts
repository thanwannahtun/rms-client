import type { StateCreator } from "zustand";
import { safeGet, safePost } from "@/lib/api";

export interface BusType {
    id: number | null;
    name: string;
    rows: number;
    capacity: number;
    layout: string;
}

export interface BusTypesSlice {
    busTypes: BusType[];
    loading: boolean;
    error: string | null;
    fetchBusTypes: () => Promise<void>;
    addBusType: (bt: BusType) => Promise<void>;
}

export const createBusTypesSlice: StateCreator<
    BusTypesSlice,
    [],
    [],
    BusTypesSlice
> = (set, get) => ({
    busTypes: [],
    loading: false,
    error: null,

    fetchBusTypes: async () => {
        set({ loading: true, error: null });
        try {
            const res = await safeGet<BusType[]>("/bus_types");

            console.log("🚍 res", res);

            if (res.success) {
                console.log("✅ Bus Types:", res.data);
                set({ busTypes: res.data });
            } else {
                console.warn("⚠️ API Warning:", res.message);
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    addBusType: async (bt) => {
        set({ loading: true, error: null });
        try {

            const res = await safePost<BusType>("/bus_types", bt);
            if (res.success) {
                console.log("✅ Bus Type added:", res.data);
                set({ busTypes: [...get().busTypes, res.data] });
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
