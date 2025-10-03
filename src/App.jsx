import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import Header from "./components/Header.jsx";
import { SummaryCard } from "./components/SummaryCard.jsx";
import IocFilters from "./components/IocFilters.jsx";
import IocTable from "./components/IocTable.jsx";
import Pagination from "./components/Pagination.jsx";
import IocPieChart from "./components/IocPieChart.jsx";
import IocHistogram from "./components/IocHistogram.jsx";
import Progress from "./components/Progress.jsx";
import LoadingAnimation from "./components/LoadingAnimation.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useThreatStore } from "./store/useThreatStore.js";

const PAGE_SIZE = 10;
const COLORS = [
  "#3e3eb5",
  "#00C49F",
  "#FFBB28",
  "#ba1aad",
  "#FF8042",
  "#0baa43",
  "#e80c0c",
  "#33cde6",
  "#8e44ad",
  "#e67e22",
  "#3498db",
  "#4d689d",
];

const App = () => {
  const { threats, loading, error, fetchThreats, searchTerm, filterType } =
    useThreatStore();

  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchThreats();
  }, [fetchThreats]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const filteredIocs = useMemo(() => {
    let filtered = threats;
    if (filterType !== "all") {
      filtered = filtered.filter((ioc) => ioc.type === filterType);
    }
    if (searchTerm) {
      filtered = filtered.filter(

        (ioc) =>
          ioc.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ioc.source.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [threats, filterType, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredIocs.length / PAGE_SIZE);
  const paginatedIocs = filteredIocs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleDarkMode = () => setDarkMode(() => !darkMode);

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

  // Logic: i.source (spamhaus, blocklist.de) naam ke hisaab se ginti
  const histogramData = useMemo(() => {
    const counts = {};
    threats.forEach((i) => {
      counts[i.source] = (counts[i.source] || 0) + 1;
    });
    return Object.entries(counts).map(([name, source]) => ({ name, source }));
  }, [threats]);
  // Logic: i.type (IPs, URLs, Subnets) value ke hisaab se ginti
  const pieChartData = useMemo(() => {
    const counts = {};
    threats.forEach((i) => {
      counts[i.type] = (counts[i.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [threats]);

  if (loading)
    return <LoadingAnimation darkMode={darkMode} loading={loading} />;

  if (error) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${themeClasses}`}
      >
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar darkMode={darkMode} />
        <main className="flex-1 p-8 overflow-auto" id="dashboard">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Total IOCs"
              icon={<FaSyncAlt />}
              darkMode={darkMode}
              type="all"
            />
            <SummaryCard
              title="IPs"
              icon={<FaSearch />}
              darkMode={darkMode}
              type="IPs"
            />
            <SummaryCard
              title="URLs"
              icon={<FaSearch />}
              darkMode={darkMode}
              type="URLs"
            />
            <SummaryCard
              title="Subnets"
              icon={<FaSearch />}
              darkMode={darkMode}
              type="Subnets"
            />
          </div>
          <IocFilters
            setCurrentPage={setCurrentPage}
            fetchIOCs={fetchThreats}
            inputClasses={inputClasses}
            searchIconClasses={searchIconClasses}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <IocTable
                paginatedIocs={paginatedIocs}
                sortConfig={sortConfig}
                requestSort={(key) => {
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
              pieChartData={pieChartData}
              colors={COLORS}
              widgetClasses={widgetClasses}
            />
          </div>
          <div className="space-y-6 mt-6">
            <IocHistogram
              histogramData={histogramData}
              colors={COLORS}
              widgetClasses={widgetClasses}
            />
            <Progress darkMode={darkMode} />
          </div>
          <Footer darkMode={darkMode} />
        </main>
      </div>
    </div>
  );
};

export default App;
