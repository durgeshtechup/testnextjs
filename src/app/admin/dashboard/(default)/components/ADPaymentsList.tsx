import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import * as React from "react";
import { getCurrencySymbol } from "utils/currencySymbole";
import { convertToFloat } from "utils/formatNumber";
import ReactCountryFlag from "react-country-flag"



interface RowObj {
  key: string
  value: string
}


function ADPaymentsList(props: {
  tableData: any,
  isLoading: boolean,
  timeFrame: any,
  setTimeFrame: any,
  type: string,
  dates: [Date, Date],
  setDates: any
}) {
  const {
    tableData,
    isLoading,
    timeFrame,
    setTimeFrame,
    type,
    dates,
    setDates
  } = props;

  let defaultData = tableData;
  const hasNoData = tableData.length === 0;
  //console.log("hasNoData",tableData,hasNoData);
  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setDates(dateRange);
      setTimeFrame('custom');
    } else {
      setTimeFrame('monthly');
    }
  };

  const columns = [
    columnHelper.accessor("key", {
      id: "key",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white text-sm font-bold text-gray-900 dark:text-white">CURRENCY</p>
      ),
      cell: (info: any) => {
        const currency = info.getValue()
        const symbole = getCurrencySymbol(currency?.toUpperCase())
        //console.log(symbole);
        return (
          <div className="flex items-center" title={symbole?.title}>
            <p className="uppercase text-sm font-bold text-navy-700 dark:text-white">
              <ReactCountryFlag
                svg
                countryCode={symbole?.country_icon?.toUpperCase()}
                className="text-xl mr-2"
              />
              {currency}
            </p>
          </div>
        )
      },
    }),
    columnHelper.accessor("value", {
      id: "value",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white text-sm font-bold text-gray-900 dark:text-white">AMOUNT</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white uppercase">
            {convertToFloat(info.getValue())} {" "} {info?.row?.original?.currency}
          </p>
        </div>
      ),
    }),
  ]; // eslint-disable-next-line

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState(() => [...defaultData]);

  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  //console.log("tabledata",table);

  return (
    <Card extra={"w-full h-full px-6 mb-6"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        <div className="capitalize text-xl font-bold text-navy-700 dark:text-white">
          {type == "decline" ?
            (
              <>Declined {" "}</>
            ) : (
              <>Approved {" "}</>
            )} Payments
        </div>
      </header>
      {/* <div className="md:flex block md:justify-start justify-center sm:grid-1 gap-2 mt-4">
        <div className="flex justify-center">
          {["all", "yearly", "monthly"].map((ele) => {
            return (
              <button
                className={`border rounded-md px-3 py-2 mx-1 capitalize outline-none ${timeFrame === ele ? "border-blue-500" : "border gray-200"}`}
                onClick={() => { setTimeFrame(ele); }}
              >
                {ele}
              </button>
            )
          })}
        </div>
        
        <DateRange onDateChange={handleDateRangeChange} />
      </div> */}

      <div className="mt-4 overflow-x-auto scrollbar scrollbar-h-1.5 scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl">
        {/* {hasNoData ? (
          <p className="text-center h5" >Data not found.</p>

        ) :  */}
        {isLoading ? (<DivLoader className="h-6 w-6 border-indigo-500 m-5" />) : (
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-left "
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows
                .map((row) => {
                  return (
                    <tr key={row.id} className="AAA">
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[110px] border-white/0 pr-2 pt-3"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              {
                hasNoData &&
                <tr>
                  <td colSpan={2} className="text-center py-3" >Data not found.</td>
                </tr>
              }
            </tbody>
          </table>)

        }
      </div>
    </Card>
  );
}

export default ADPaymentsList;
const columnHelper = createColumnHelper<RowObj>();