import { create } from "zustand";

interface ThreatData {
  value: string;
  type: string;
  source: string;
  timestamp: string;
}

interface ThreatStore {
  threats: ThreatData[];
  loading: boolean;
  error: string | null;
  filterType: string;
  searchTerm: string;
  fetchThreats: () => Promise<void>;
  setFilterType: (type: string) => void;
  setSearchTerm: (term: string) => void;
}

export const useThreatStore = create<ThreatStore>((set) => ({
  threats: [],
  loading: false,
  error: null,
  filterType: "all",
  searchTerm: "",

  setFilterType: (type) => set({ filterType: type }),
  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchThreats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/iocs.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: ThreatData[] = await response.json();
      set({ threats: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
