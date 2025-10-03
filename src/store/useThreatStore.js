import { create } from "zustand";

// Zustand store for threat data
export const useThreatStore = create((set) => ({
  threats: [],      // Array of threat data
  loading: false,  // Loading state
  error: null,     // Error message
  filterType: "all", // Current filter type
  searchTerm: "",  // Current search term

  // Function to set filter type
  setFilterType: (type) => set({ filterType: type }),
  // Function to set search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Fetch threat data from local JSON file (public/iocs.json)
  // 💡 Updated to use async/await
  fetchThreats: async () => {
    // 1. Start loading and reset previous error
    set({ loading: true, error: null });

    try {
      // 2. Await the fetch call
      const response = await fetch("/iocs.json");
      const data = await response.json();
        
      // 4. Update state with fetched data on success
      set({ threats: data, loading: false, error: null });
      
    } catch (error) {
      // 5. Catch any error during fetch or JSON parsing
      console.error("Error fetching threat data:", error);
      set({ 
        error: "Error fetching data: " + error.message, 
        loading: false, 
        threats: [] 
      }); 
    }
  },
}));












