import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export interface IOC {
  value: string;
  type: "IPs" | "URLs" | "Subnets" | "Domains" | "Emails" | "Filenames" | "Bitcoin wallets";
  source: string;
  timestamp: string;
}

interface IocTableProps {
  paginatedIocs: IOC[];
  sortConfig: { key: keyof IOC; direction: "asc" | "desc" } | null;
  requestSort: (key: keyof IOC) => void;
  tableHeaderClasses: string;
  tableRowClasses: string;
}

const IocTable = ({
  paginatedIocs,
  sortConfig,
  requestSort,
  tableHeaderClasses,
  tableRowClasses,
}: IocTableProps) => {
  return (
    <div className="rounded-lg shadow-xl overflow-x-auto h-[400px]">
      <table className="min-w-400 table-auto w-full">
        <thead className={tableHeaderClasses}>
          <tr>
            {["value", "type", "source", "timestamp"].map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                onClick={() => requestSort(key as keyof IOC)}
                aria-sort={
                  sortConfig?.key === key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") requestSort(key as keyof IOC);
                }}
              >
                <div className="flex items-center gap-1">
                  <span className="capitalize">{key}</span>
                  {sortConfig?.key === key ? (
                    sortConfig.direction === "asc" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          <AnimatePresence>
            {paginatedIocs.length > 0 ? (
              paginatedIocs.map((ioc, idx) => (
                <motion.tr
                  key={`${ioc.value}-${ioc.source}-${ioc.timestamp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={tableRowClasses}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{ioc.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {ioc.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ioc.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(ioc.timestamp).toLocaleString()}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No threat data found matching your criteria.
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default IocTable;
