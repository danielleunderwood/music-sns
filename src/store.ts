import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AppState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const useStore = create<AppState>()((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session })),
}));

export default useStore;
