import React from "react";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: "all" | "ip" | "url" | "subnet" | "domain";
  setFilterType: (value: "all" | "ip" | "url" | "subnet" | "domain") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchIOCs: () => void;
  inputClasses: string;
  searchIconClasses: string;
}

const IocFilters: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  setCurrentPage,
  fetchIOCs,
  inputClasses,
  searchIconClasses,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="relative w-full md:w-1/2">
        <FaSearch
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${searchIconClasses}`}
        />
        <input
          type="text"
          placeholder="Search by value or source..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
          aria-label="Search IOCs"
        />
      </div>

      <select
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value as any);
          setCurrentPage(1);
        }}
        className={`w-full md:w-auto py-3 px-4 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
        aria-label="Filter IOC Type"
      >
        <option value="all">All Types</option>
        <option value="ip">IPs</option>
        <option value="url">URLs</option>
        <option value="subnet">Subnets</option>
        <option value="domain">Domains</option>
      </select>

      <button
        onClick={() => {
          fetchIOCs();
          setCurrentPage(1);
        }}
        className="flex items-center gap-2 py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
        aria-label="Refresh IOCs"
      >
        <FaSyncAlt />
        Refresh
      </button>
    </div>
  );
};

export default IocFilters;
