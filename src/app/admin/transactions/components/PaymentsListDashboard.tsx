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
import React from "react";
import {
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdError,
  MdFileCopy,
  MdOutlineReplayCircleFilled,
  MdTimer,
} from "react-icons/md";
import { convertToFloat } from "utils/formatNumber";
// import { GatewayTypes } from "views/admin/clients/components/CreateClientGatewaysModal";
import { PaymentRowObj } from "../page";
import InfoModal from "./InfoModal";
import RefundModal from "./RefundModal";
//import { StatusRender } from "./PaymentsList";
import StatusRender from "./StatusRender";
import ShortTruncateCopy from "components/common/ShortTruncateCopy";
import { getImage } from "utils/commonFunction";
import Image from "next/image";
import { GatewayTypes } from "app/admin/clients/components/CreateClientGatewaysModal";
import Link from "next/link";

function PaymentsListDashboard(props: {
  tableData: any;
  fetchPayments: () => void;
  isLoading: boolean;
  paymentName: boolean;
}) {
  const { tableData, fetchPayments, isLoading, paymentName } = props;
  //console.log("paymentName",paymentName);
  let defaultData = tableData;

  const columns = [
    columnHelper.accessor("client", {
      id: "client",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT NAME
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-medium text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          AMOUNT
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-medium uppercase text-navy-700 dark:text-white">
            {convertToFloat(info.getValue())} {info?.row?.original?.currency}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("gateway_id", {
      id: "gateway_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          GATEWAY {paymentName ? "NAME" : "HASH ID"}
        </p>
      ),
      cell: (info: any) => {
        let gateway_name = info?.cell?.row?.original?.gateway_name;
        return (
          <>
            <div>
              {
                <>
                  {gateway_name === null ? (

                    <ShortTruncateCopy
                      info={info?.cell?.row?.original?.gateway_id}
                      showCopy={true}
                    />

                  ) : (

                    <span className="flex items-center ">
                      <Image
                        style={{ height: "auto", width: "15px" }}
                        className="h-auto w-20"
                        src={getImage(info?.cell?.row?.original?.gateway_name)}
                        alt="Gateway Image"
                      />
                      <p className="px-2">{info?.cell?.row?.original?.gateway_name}</p>
                    </span>

                  )}
                </>
              }
            </div>
          </>
        );
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-1 text-sm font-medium">
          <StatusRender
            status={info?.row?.original?.status}
            value={info.getValue()}
          />
        </div>
      ),
    }),
    columnHelper.accessor("et_id", {
      id: "et_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <RefundModal
            info={info?.row?.original}
            transactionID={info?.row?.original?.et_id}
            fetchPayments={fetchPayments}
            varient="small"
          />
          <InfoModal info={info?.row?.original} varient="small" />
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

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 mb-6"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Recent Transactions
        </div>
        <Link
          href="/admin/transactions"
          className="linear ml-auto mt-[5px] rounded-full bg-brand-500 px-4 py-2 text-base font-medium text-white hover:text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          View More
        </Link>

      </header>

      <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5">
        {isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
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
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[110px] border-white/0 pr-1 pt-2"
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
                table.getRowModel().rows?.length == 0 &&
                <tr>
                  <td colSpan={5} className="text-center py-3" >Data not found.</td>
                </tr>
              }
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}

export default PaymentsListDashboard;
const columnHelper = createColumnHelper<PaymentRowObj>();


