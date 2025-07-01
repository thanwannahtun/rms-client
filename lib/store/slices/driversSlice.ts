// store/slices/driverSlice.ts
import type { StateCreator } from "zustand";
import { safeGet, safePost, safePut } from "@/lib/api";

export interface Driver {
  id: number | null;
  name: string;
  address?: string | null;
  nrc?: string | null;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DriverSlice {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  fetchDrivers: () => Promise<void>;
  addDriver: (driver: Driver) => Promise<void>;
  updateDriver: (driver: Driver) => Promise<void>;
}

export const createDriverSlice: StateCreator<
  DriverSlice,
  [],
  [],
  DriverSlice
> = (set, get) => ({
  drivers: [],
  loading: false,
  error: null,

  fetchDrivers: async () => {
    if (get().drivers.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await safeGet<Driver[]>("/drivers");
      if (res.success) {
        set({ drivers: res.data });
      } else {
        set({ error: res.message });
      }
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      set({ loading: false });
    }
  },

  addDriver: async (driver) => {
    set({ loading: true, error: null });
    try {
      const res = await safePost<Driver>("/drivers", driver);
      if (res.success) {
        set({ drivers: [...get().drivers, res.data] });
      } else {
        set({ error: res.message });
      }
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      set({ loading: false });
    }
  },

  updateDriver: async (driver) => {
    set({ loading: true, error: null });
    try {
      const res = await safePut<Driver>(`/drivers/${driver.id}`, driver);
      if (res.success) {
        set({
          drivers: get().drivers.map((d) => (d.id === res.data.id ? res.data : d)),
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
