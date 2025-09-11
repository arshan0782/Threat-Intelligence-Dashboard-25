import { useState, useEffect, useMemo, useCallback } from "react";
import { FaMoon,FaSun,FaSearch,FaSyncAlt,FaUserCircle,FaBell,} from "react-icons/fa";

import { SummaryCard } from "./components/SummaryCard.tsx";
import IocFilters from "./components/IocFilters";
import IocTable from "./components/IocTable";
import Pagination from "./components/Pagination";
import IocPieChart from "./components/IocPieChart";
import IocHistogram from "./components/IocHistogram";
import Progress from "./components/Progress";
import LoadingAnimation from "./components/LoadingAnimation";

interface IOC {
  value: string;
  type: "ip" | "url" | "subnet" | "domain";
  source: string;
  timestamp: string;
}

const PAGE_SIZE = 20;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const App = () => {
  const [iocs, setIocs] = useState<IOC[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "ip" | "url" | "subnet" | "domain"
  >("all");
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IOC;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchIOCs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/iocs.json");
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data: IOC[] = await response.json();
      setIocs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIOCs();
  }, [fetchIOCs]);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredIocs = useMemo(() => {
    let filtered = iocs;
    if (filterType !== "all")
      filtered = filtered.filter((ioc) => ioc.type === filterType);
    if (debouncedSearch) {
      filtered = filtered.filter(
        (ioc) =>
          ioc.value.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          ioc.source.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      filtered = [...filtered].sort((a, b) => {
        const aKey = a[sortConfig.key];
        const bKey = b[sortConfig.key];
        if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [iocs, filterType, debouncedSearch, sortConfig]);

  const totalPages = Math.ceil(filteredIocs.length / PAGE_SIZE);
  const paginatedIocs = filteredIocs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const widgetClasses = darkMode ? "bg-gray-800" : "bg-white";
  const tableHeaderClasses = darkMode
    ? "bg-gray-800 text-gray-300"
    : "bg-gray-200 text-gray-600";
  const tableRowClasses = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const inputClasses = darkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-300";
  const searchIconClasses = darkMode ? "text-gray-400" : "text-gray-600";

  const pieData = useMemo(() => {
    const counts: Record<string, number> = {};
    iocs.forEach((i) => {
      counts[i.type] = (counts[i.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [iocs]);

 if (loading) {
  return <LoadingAnimation darkMode={darkMode} loading={loading} />;
}

if (error) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${themeClasses}`}>
      <p className="text-xl text-red-500">Error: {error}</p>
    </div>
  );
}

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-64 p-6 border-r ${
            darkMode ? "border-gray-700" : "border-gray-300"
          } hidden md:block`}
        >
          <h2 className="text-2xl font-bold mb-8">TID</h2>
          <nav className="flex flex-col gap-4 text-sm">
            <a href="#" className="hover:text-blue-500">
              Dashboard
            </a>
            <a href="#" className="hover:text-blue-500">
              Reports
            </a>
            <a href="#" className="hover:text-blue-500">
              Settings
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8 overflow-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              Threat Intelligence Dashboard
            </h1>
            <div className="flex items-center gap-6">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
                className="p-2 rounded-full hover:bg-gray-700 transition"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400" size={24} />
                ) : (
                  <FaMoon className="text-gray-600" size={24} />
                )}
              </button>
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-700 transition"
              >
                <FaBell size={24} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button
                aria-label="User Profile"
                className="p-2 rounded-full hover:bg-gray-700 transition"
              >
                <FaUserCircle size={28} />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Total IOCs"
              count={iocs.length}
              icon={<FaSyncAlt />}
              darkMode={darkMode}
            />
            <SummaryCard
              title="Unique IPs"
              count={
                new Set(iocs.filter((i) => i.type === "ip").map((i) => i.value))
                  .size
              }
              icon={<FaSearch />}
              darkMode={darkMode}
            />
            <SummaryCard
              title="Unique URLs"
              count={
                new Set(
                  iocs.filter((i) => i.type === "url").map((i) => i.value)
                ).size
              }
              icon={<FaSearch />}
              darkMode={darkMode}
            />
            <SummaryCard
              title="Unique Subnets"
              count={
                new Set(
                  iocs.filter((i) => i.type === "subnet").map((i) => i.value)
                ).size
              }
              icon={<FaSearch />}
              darkMode={darkMode}
            />
          </div>
          <IocFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fetchIOCs={fetchIOCs}
            inputClasses={inputClasses}
            searchIconClasses={searchIconClasses}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <IocTable
                paginatedIocs={paginatedIocs}
                sortConfig={sortConfig}
                requestSort={(key: keyof IOC) => {
                  setSortConfig((prev) => {
                    if (prev?.key === key) {
                      return {
                        key,
                        direction: prev.direction === "asc" ? "desc" : "asc",
                      };
                    }
                    return { key, direction: "asc" };
                  });
                }}
                tableHeaderClasses={tableHeaderClasses}
                tableRowClasses={tableRowClasses}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <IocPieChart
              pieData={pieData}
              colors={COLORS}
              widgetClasses={widgetClasses}
            />
          </div>
          <div className="space-y-6">
    <IocHistogram
  pieData={pieData}
  colors={COLORS}
  widgetClasses={widgetClasses}
/>

    <Progress darkMode={darkMode} />
  </div>
        </main>
      </div>
    </div>
  );
};

export default App;
