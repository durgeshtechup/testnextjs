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
import { PaymentMethodRowObj } from "../page";
import CreatePaymentMethoddModal from "./CreatePaymentMethod";
import Pix from "../../../../assets/img/payment-clients/pix.png";
import pixLotus from "../../../../assets/img/payment-clients/pix.png";
import Stripe from "../../../../assets/img/payment-clients/stripe.png";
import Blumon from "../../../../assets/img/payment-clients/blumon.png";
import Sipe from "../../../../assets/img/payment-clients/sipe.png";
import Memphis from "../../../../assets/img/payment-clients/memphis.png";

import repyd from "../../../../assets/img/payment-clients/rapyd.png";
import mit from "../../../../assets/img/payment-clients/mit.png";
import banwire from "../../../../assets/img/payment-clients/banwire.jpg";
import valitor from "../../../../assets/img/payment-clients/valitor.png";
import bambora from "../../../../assets/img/payment-clients/bambora.png";
import Scipiopay from "../../../../assets/img/payment-clients/Scipiopay.png";
import Aurea_via from "../../../../assets/img/payment-clients/Aurea_via.png";
import Betapay from "../../../../assets/img/payment-clients/Betapay.png";
import Kasha from "../../../../assets/img/payment-clients/Kasha.jpg";
import reSet from "../../../../assets/img/payment-clients/reset.png";

import { MdCancel, MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Searchbox from "components/fields/Searchbox";
import Image from "next/image";

function PaymentMethodTable(props: {
  tableData: any;
  fetchUsers: () => void;
  isLoading: boolean;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  setPageSize: any;
  roleData: any;
  timeZone: any;
  allCardType: any;
  onValueChange: (value: string) => void;
}) {
  const {
    tableData,
    fetchUsers,
    page,
    setPage,
    currentPage,
    totalpage,
    totalItems,
    pageSize,
    setPageSize,
    roleData,
    timeZone,
    allCardType,
    onValueChange,
  } = props;
  let defaultData = tableData;
  let showPaymentName = roleData[0]?.payment_method?.value?.show_payment_method_name;
  //console.log("allCardType3333",allCardType);
  //console.log("time3333",timeZone);
  const columns = [

    columnHelper.accessor("logo", {
      id: "logo",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">Logo</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <div
            className="flex items-center text-sm font-bold text-navy-700 dark:text-white"
            style={{ height: "50px" }}
          >
            <Image
              style={{ height: "auto", width: "50px" }}
              alt={info.getValue()}
              src={
                info.getValue() === "Pix"
                  ? Pix
                  : info.getValue() === "Pix-Lotus"
                    ? pixLotus
                    : info.getValue() === "Sipe"
                      ? Sipe
                      : info.getValue() === "Re-set"
                        ? reSet
                        : info.getValue() === "Blumon"
                          ? Blumon
                          : info.getValue() === "Stripe"
                            ? Stripe
                            : info.getValue() === "Memphis"
                              ? Memphis
                              : info.getValue() === "Raypd"
                                ? repyd
                                : info.getValue() === "Banwire"
                                  ? banwire
                                  : info.getValue() === "Valitor"
                                    ? valitor
                                    : info.getValue() === "Bambora"
                                      ? bambora
                                      : info.getValue() === "MIT"
                                        ? mit
                                        : info.getValue() === "Scipiopay"
                                          ? Scipiopay
                                          : info.getValue() === "Aurea Via"
                                            ? Aurea_via
                                            : info.getValue() === "Betapay"
                                              ? Betapay

                                              : info.getValue()?.toLowerCase() == "Kasha".toLowerCase()
                                                ? Kasha
                                                : Pix
              }
            />
          </div>
        </div>
      ),
    }),

    showPaymentName ? (
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">Name</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        ),
      })
    ) : (
      columnHelper.accessor("id", {
        id: "id",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Hash ID
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.id}
          </p>
        ),
      })
    ),

    columnHelper.accessor("payments", {
      id: "payments",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payment
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),

    columnHelper.accessor("refund", {
      id: "refund",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Refund
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),

    columnHelper.accessor("apm", {
      id: "apm",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white   ">
          APM
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("authorization", {
      id: "authorization",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Authorization
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("subscription", {
      id: "subscription",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Subscription
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("token", {
      id: "token",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Token
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("payout", {
      id: "payout",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payout
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("payin", {
      id: "payin",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payin
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    // columnHelper.accessor("direct_debit", {
    //   id: "direct_debit",
    //   header: () => (
    //     <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
    //       Direct Debit
    //     </p>
    //   ),
    //   cell: (info: any) => (
    //     <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
    //       {info.getValue() ? (
    //         <MdCheckCircle className="h-5 w-5 text-teal-500" />
    //       ) : (
    //         <MdCancel className="h-5 w-5 text-red-500" />
    //       )}
    //     </div>
    //   ),
    // }),
    columnHelper.accessor("is_active", {
      id: "is_active",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          Status
        </p>
      ),
      cell: (info: any) => (
        <>
          {info.getValue() ? (
            <p className="text-sm w-fit px-2 py-1 font-bold bg-teal-100 dark:bg-teal-50 rounded-lg text-teal-700 dark:text-white">
              <span className="text-teal-500 text-center uppercase">Active</span>
            </p>
          ) : (
            <p className="text-sm w-fit px-2 py-1 font-bold bg-red-100 dark:bg-red-50 rounded-lg text-red-700 dark:text-white">
              <span className="text-red-500 text-center uppercase">Inactive</span>
            </p>
          )}
        </>
      ),
    }),
    columnHelper.accessor("name", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info: any) => (
        <p className="flex items-center gap-3 text-sm font-bold">
          <CreatePaymentMethoddModal
            fetchUsers={fetchUsers}
            id={info.getValue()}
            data={info.row?.original}
            roleData={roleData}
            timeZone={timeZone}
            allCardType={allCardType}
          />
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const columnsNonAction = [
    columnHelper.accessor("logo", {
      id: "logo",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">Logo</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <div
            className="flex items-center text-sm font-bold text-navy-700 dark:text-white"
            style={{ height: "50px" }}
          >
            <Image
              style={{ height: "auto", width: "50px" }}
              alt={info.getValue()}
              src={
                info.getValue() === "Pix"
                  ? Pix
                  : info.getValue() === "Pix-Lotus"
                    ? pixLotus
                    : info.getValue() === "Sipe"
                      ? Sipe
                      : info.getValue() === "Re-set"
                        ? reSet
                        : info.getValue() === "Blumon"
                          ? Blumon
                          : info.getValue() === "Stripe"
                            ? Stripe
                            : info.getValue() === "Memphis"
                              ? Memphis
                              : info.getValue() === "Raypd"
                                ? repyd
                                : info.getValue() === "Banwire"
                                  ? banwire
                                  : info.getValue() === "Valitor"
                                    ? valitor
                                    : info.getValue() === "Bambora"
                                      ? bambora
                                      : info.getValue() === "MIT"
                                        ? mit
                                        : info.getValue() === "Scipiopay"
                                          ? Scipiopay
                                          : info.getValue() === "Aurea Via"
                                            ? Aurea_via
                                            : info.getValue() === "Betapay"
                                              ? Betapay

                                              : info.getValue() === "Kasha"
                                                ? Kasha
                                                : Pix
              }
            />
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">Name</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          Hashed ID
        </p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info?.row?.original?.id}
        </p>
      ),
    }),
    columnHelper.accessor("payments", {
      id: "payments",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payment
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),


    columnHelper.accessor("refund", {
      id: "refund",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Refund
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("apm", {
      id: "apm",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white !bg-red">
          APM
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("authorization", {
      id: "authorization",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Authorization
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("subscription", {
      id: "subscription",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Subscription
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("token", {
      id: "token",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Token
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("payout", {
      id: "payout",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payout
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("payin", {
      id: "payin",
      header: () => (
        <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
          Payin
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <MdCheckCircle className="h-5 w-5 text-teal-500" />
          ) : (
            <MdCancel className="h-5 w-5 text-red-500" />
          )}
        </div>
      ),
    }),
    // columnHelper.accessor("direct_debit", {
    //   id: "direct_debit",
    //   header: () => (
    //     <p className="flex justify-center text-sm font-bold text-gray-900 dark:text-white">
    //       Direct Debit
    //     </p>
    //   ),
    //   cell: (info: any) => (
    //     <div className="flex justify-center text-sm font-bold text-navy-700 dark:text-white">
    //       {info.getValue() ? (
    //         <MdCheckCircle className="h-5 w-5 text-teal-500" />
    //       ) : (
    //         <MdCancel className="h-5 w-5 text-red-500" />
    //       )}
    //     </div>
    //   ),
    // }),
    columnHelper.accessor("is_active", {
      id: "is_active",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          Status
        </p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() ? (
            <span className="text-teal-500 uppercase">Active</span>
          ) : (
            <span className="text-red-500 uppercase">Inactive</span>
          )}
        </p>
      ),
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchVal, setSearchVal] = React.useState<any>("");
  const [data, setData] = React.useState(() => [...defaultData]);



  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns: roleData?.[0]?.payment_method?.value?.edit_payment_method
      ? columns
      : columnsNonAction,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleValueChange = (e: any) => {
    onValueChange(e);
    setSearchVal(e);
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 py-4"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        <div className="text-xl font-normal text-navy-700 dark:text-white">
          {/* Payment Method */}
        <Searchbox onSearch={handleValueChange} />

          {/* All Gateways */}
        </div>
        {/* <CardMenu /> */}
      </header>

      <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">
        {props.isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr
                  key={headerGroup.id}
                // className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header: any) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start p-2"
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
            <tbody className="">
              {table.getRowModel().rows?.length > 0 ? table.getRowModel().rows.map((row: any) => {
                return (
                  <tr key={row.id} className="p-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4 p-2"
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
              })
                :
                <tr>
                  <td colSpan={10} >
                    <p className="text-center p-4" >No records found.</p>
                  </td>

                </tr>
              }
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}

export default PaymentMethodTable;
const columnHelper = createColumnHelper<PaymentMethodRowObj>();
