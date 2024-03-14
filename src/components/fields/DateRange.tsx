import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'assets/css/dateRange.css';

interface DateRangeProps {
  onDateChange: (dateRange: [Date | null, Date | null]) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    onDateChange(dateRange);
    //console.log("dateRange",dateRange);
  }, [dateRange]);




  return (
    <div>
      <DatePicker
        className={`flex h-10 w-full items-center text-gray-700 justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none`}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        placeholderText="Date range..."
        onChange={(update: [Date, Date] | null) => {
          if (update) {
            setDateRange(update);
          }
        }}
        isClearable={true}
      />
    </div>
  );
};

export default DateRange;
