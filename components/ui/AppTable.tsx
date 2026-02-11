'use client';

import { useMemo, useState } from 'react';

export type Column<T> = {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
};

type FilterOption = {
  label: string;
  value: string;
};

type AppTableProps<T extends { id: string | number }> = {
  columns: Column<T>[];
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;

  /* Optional filters */
  searchKey?: keyof T;
  filterOptions?: FilterOption[];
  filterKey?: keyof T;
};

export default function AppTable<T extends { id: string | number }>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  searchKey,
  filterOptions,
  filterKey,
}: AppTableProps<T>) {
  const totalPages = Math.ceil(total / pageSize);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  /* ---------------- Filtering ---------------- */

  const filteredData = useMemo(() => {
    let result = data;

    if (search && searchKey) {
      result = result.filter(row =>
        String(row[searchKey])
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filter && filterKey) {
      result = result.filter(row => String(row[filterKey]) === filter);
    }

    return result;
  }, [data, search, filter, searchKey, filterKey]);

  /* ---------------- Pagination Buttons ---------------- */

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
console.log("filteredDatafilteredData",totalPages,pages)
  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      {/* 🔍 Filters */}
      {(searchKey || filterOptions) && (
        <div className="flex flex-wrap gap-3 p-4 border-b bg-gray-50">
          {searchKey && (
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                onPageChange(1);
              }}
              placeholder="Search..."
              className="px-3 py-2 border text-black rounded-lg w-64 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          )}

          {filterOptions && (
            <select
              value={filter}
              onChange={e => {
                setFilter(e.target.value);
                onPageChange(1);
              }}
              className="px-3 py-2 text-black  border rounded-lg"
            >
              <option value="">All</option>
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* 📊 Table */}
      <div className="overflow-x-auto border-orange-500">
        <table className="w-full text-sm text-black">
          <thead className="bg-black-100 sticky top-0 z-10">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="p-3 text-left font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map(row => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map(col => (
                  <td key={String(col.key)} className="p-3">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-6 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 Pagination */}
      <div className="flex justify-between items-center p-4">
        <span className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1} –{' '}
          {Math.min(page * pageSize, total)} of {total}
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            ‹
          </button>

          {pages.map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-lg border ${
                p === page
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
