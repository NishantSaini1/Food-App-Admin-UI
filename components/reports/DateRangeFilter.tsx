"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface Props {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export default function DateRangeFilter({
  dateRange,
  setDateRange,
}: Props) {
  const { startDate, endDate } = dateRange;

  return (
    <div className="flex items-center gap-2">
      {/* Start Date */}
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) =>
          setDateRange((prev) => ({
            ...prev,
            startDate: date,
          }))
        }
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start date"
        className="border rounded px-3 py-2 text-sm"
      />

      {/* End Date */}
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) =>
          setDateRange((prev) => ({
            ...prev,
            endDate: date,
          }))
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate ?? undefined}
        placeholderText="End date"
        className="border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
