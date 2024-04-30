import { create } from "zustand";
import { combine } from "zustand/middleware";

interface DashboardState {
  activeTeam?: { id: string; name: string };
}

const initialState: DashboardState = {};

export const useDashboardStore = create(
  combine(initialState, (set) => ({
    setActiveTeam: (activeTeam: DashboardState["activeTeam"]) =>
      set((state) => ({ ...state, activeTeam })),
  }))
);
