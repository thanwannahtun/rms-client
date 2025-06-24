import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createBusTypesSlice, BusTypesSlice } from "./slices/busTypesSlice";
import { BusRoutesSlice, createBusRoutesSlice } from "./slices/busRoutesSlice";

export type AppStore = BusTypesSlice
    & BusRoutesSlice
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
            ...createBusRoutesSlice(...a)
        }))
    )
);