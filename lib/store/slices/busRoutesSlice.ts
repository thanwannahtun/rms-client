import { StateCreator } from "zustand";
// import axios from "axios";

// mock 15 bus Routes 
const mockRoutes = [
    { id: 1, name: "Route 1", from: "A", to: "B", distanceKm: 100, active: true },
    { id: 2, name: "Route 2", from: "B", to: "C", distanceKm: 200, active: true },
    { id: 3, name: "Route 3", from: "C", to: "D", distanceKm: 300, active: true },
    { id: 4, name: "Route 4", from: "D", to: "E", distanceKm: 400, active: true },
    { id: 5, name: "Route 5", from: "E", to: "F", distanceKm: 500, active: true },
    { id: 6, name: "Route 6", from: "F", to: "G", distanceKm: 600, active: true },
    { id: 7, name: "Route 7", from: "G", to: "H", distanceKm: 700, active: true },
    { id: 8, name: "Route 8", from: "H", to: "I", distanceKm: 800, active: true },
    { id: 9, name: "Route 9", from: "I", to: "J", distanceKm: 900, active: true },
    { id: 10, name: "Route 10", from: "J", to: "K", distanceKm: 1000, active: true },
    { id: 11, name: "Route 11", from: "K", to: "L", distanceKm: 1100, active: true },
    { id: 12, name: "Route 12", from: "L", to: "M", distanceKm: 1200, active: true },
    { id: 13, name: "Route 13", from: "M", to: "N", distanceKm: 1300, active: true },
    { id: 14, name: "Route 14", from: "N", to: "O", distanceKm: 1400, active: true },
    { id: 15, name: "Route 15", from: "O", to: "P", distanceKm: 1500, active: true },
];

export interface BusRoute {
    id: number;
    name: string;
    from: string;
    to: string;
    distanceKm: number;
    active: boolean;
}

export interface BusRoutesSlice {
    routes: BusRoute[];
    loading: boolean;
    error: string | null;
    fetchRoutes: () => Promise<void>;
    addRoute: (route: BusRoute) => Promise<void>;
}

export const createBusRoutesSlice: StateCreator<
    BusRoutesSlice,
    [],
    [],
    BusRoutesSlice
> = (set) => ({
    routes: [],
    loading: false,
    error: null,

    fetchRoutes: async () => {
        set({ loading: true, error: null });
        try {
            // const res = await axios.get<BusRoute[]>("/api/routes");
            // set({ routes: res.data });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            set({ routes: mockRoutes });
        } catch (e: any) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    addRoute: async (route) => {
        set({ loading: true, error: null });
        try {
            // const res = await axios.post("/api/routes", route);
            // set((s) => ({ routes: [...s.routes, res.data] }));
            await new Promise((resolve) => setTimeout(resolve, 1000));
            set((s) => ({ routes: [...s.routes, route] }));
        } catch (e: any) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },
});
