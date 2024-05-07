import { create } from "zustand";
import { combine } from "zustand/middleware";

interface DashboardState {
  activeTeam?: { id: string; name: string };
  searchParams: {
    favorites?: boolean;
    searchTerm?: string;
  };
}

const initialState: DashboardState = {
  searchParams: {},
};

export const useDashboardStore = create(
  combine(initialState, (set) => ({
    setActiveTeam: (activeTeam: DashboardState["activeTeam"]) =>
      set((state) => ({ ...state, activeTeam })),
    setSearchParams: (searchParams: DashboardState["searchParams"]) =>
      set((state) => ({
        ...state,
        searchParams,
      })),
  }))
);
