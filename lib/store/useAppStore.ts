import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createBusTypesSlice, BusTypesSlice } from "./slices/busTypesSlice";
import { BusPointsSlice, createBusPointsSlice } from "./slices/busPointsSlice";
import { BusAmenitiesSlice, createBusAmenitiesSlice } from "./slices/useAmenitiesSlice";
import { BusSlice, createBusSlice } from "./slices/busSlice";
import { DriverSlice, createDriverSlice } from "./slices/driversSlice";
import { RouteSlice, createRouteSlice } from "./slices/routesSlice";

export type AppStore = BusTypesSlice
    // & BusRoutesSlice
    & BusPointsSlice
    & BusAmenitiesSlice
    & BusSlice
    & DriverSlice
    & RouteSlice
    
    
    // & BusPointsSlice
    //   & BusTypesSlice 
    //   & PackagesSlice 
    //   & TripsSlice 
    //   & SettingsSlice 
    //   & TeamsSlice
    ;

export const useAppStore = create<AppStore>()(
    devtools(
        subscribeWithSelector((...a) => ({
            ...createBusTypesSlice(...a),
            ...createBusPointsSlice(...a),
            ...createBusAmenitiesSlice(...a),
            ...createBusSlice(...a),
            ...createDriverSlice(...a),
            ...createRouteSlice(...a),
        }))
    )
);