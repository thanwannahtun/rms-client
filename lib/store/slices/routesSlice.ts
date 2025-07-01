import type { StateCreator } from "zustand";
import { safeGetPagination, safePost, safePut } from "@/lib/api";
import { Pagination } from "@/lib/types";

export interface RouteLine {
    id: number;
    routeId: number;
    fromPointId: number;
    toPointId: number;
    startTime: string;
    endTime: string;
    price: number;
}

export interface Point {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Route {
    id: number;
    referenceNo: string;
    busId: number;
    startingPoint: number;
    dropingPoint: number;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    createdAt?: string;
    updatedAt?: string;
    routeLines?: RouteLine[];
    origin?: Point;
    destination?: Point;
}



export interface RouteSlice {
    routes: Route[];
    pagination: Pagination;
    loading: boolean;
    error: string | null;
    fetchRoutes: (query?: Record<string, string | number | boolean>) => Promise<void>;
    addRoute: (route: Partial<Route>) => Promise<void>;
    updateRoute: (route: Route) => Promise<void>;
}


export const createRouteSlice: StateCreator<
    RouteSlice,
    [],
    [],
    RouteSlice
> = (set, get) => ({
    routes: [],
    loading: false,
    error: null,

    pagination: {
        total: 0,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
        lastPage: 1,
        countPerPage: 5,
    },

    fetchRoutes: async (query = {}) => {
        set({ loading: true, error: null });
        try {
            const searchParams = new URLSearchParams(query as any).toString();

            const res = await safeGetPagination<Route>(`/routes?${searchParams}`);
            if (res.success) {
                set({
                    routes: res.data, pagination: {
                        total: res.total,
                        currentPage: res.currentPage,
                        previousPage: res.previousPage,
                        nextPage: res.nextPage,
                        lastPage: res.lastPage,
                        countPerPage: res.countPerPage,
                    }
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

    addRoute: async (route) => {
        set({ loading: true, error: null });
        try {
            const res = await safePost<Route>("/routes", route);
            if (res.success) {
                set({ routes: [...get().routes, res.data] });
            } else {
                set({ error: res.message });
            }
        } catch (err: unknown) {
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            set({ loading: false });
        }
    },

    updateRoute: async (route) => {
        set({ loading: true, error: null });
        try {
            const res = await safePut<Route>(`/routes/${route.id}`, route);
            if (res.success) {
                set({
                    routes: get().routes.map((r) => (r.id === res.data.id ? res.data : r)),
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
