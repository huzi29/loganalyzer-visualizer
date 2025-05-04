import React, { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";

function LogTable({ filters }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        const { data } = await fetchLogs(filters);
        setLogs(data.data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
    const interval = setInterval(loadLogs, 3000);
    return () => clearInterval(interval);
  }, [filters]);

  return (
    <div className="w-full overflow-x-auto mt-6 mb-4 p-4 ">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Logs by Table</h2>
      <div className="min-w-[650px] w-full shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-auto text-left">
          <thead className="bg-blue-600 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500" />
                    <span>Loading logs...</span>
                  </div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No logs available
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition-colors cursor-pointer`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">{log.level}</td>
                  <td className="px-4 py-3">{log.service}</td>
                  <td className="px-4 py-3">{log.message}</td>
                </tr>
              ))              
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogTable;
