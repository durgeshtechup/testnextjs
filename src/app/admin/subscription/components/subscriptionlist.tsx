import {
  PaginationState,

  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  MdAdd,
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdError,
  MdExpand,
  MdFileCopy,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdOutlineCancel,
  MdOutlineReplayCircleFilled,
  MdRemove,
  MdTimer,
} from "react-icons/md";
import React, { useEffect, useMemo, useState } from 'react';
import Card from "components/card";
import Searchbox from "components/fields/Searchbox";
import { getCardSVG, getImage } from "utils/commonFunction";
import { convertToFloat } from "utils/formatNumber";
import { BsReceipt } from "react-icons/bs";
import Pagination from "components/pagination";
import ShortTruncateCopy from "components/common/ShortTruncateCopy";
// import StatusRender from "../../payments/components/StatusRender";
import StatusRender from "../../transactions/components/StatusRender";
import StatusStyle from "./StatusStyle";
import { SubscriptionObj } from "../page";
import RefundModal from "../../transactions/components/RefundModal";
import InfoModal from "../../transactions/components/InfoModal";
import toast from "react-hot-toast";

import { useTable, useSortBy, useExpanded, Column, Row } from 'react-table';
import RetryModal from "../../transactions/components/RetryModal";
import visa from "assets/svg/card_type/visa.svg"
import MasterCard from "assets/svg/card_type/mastercard.svg"
import Discover from "assets/svg/card_type/discover.svg"
import Amex from "assets/svg/card_type/amex.svg"
import MaestroCard from "assets/svg/card_type/maestro.svg"
import DinersClub from "assets/svg/card_type/dinersclub.svg"
import JCB from "assets/svg/card_type/jcb.svg"
import UnionPay from "assets/svg/card_type/unionpay.svg"
import DivLoader from "components/divloader/DivLoader";
import FilterModal from "./FilterModal";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { FaDownload } from "react-icons/fa";
import { DownloadCSV, subscriptionGetClients } from "api/subscription";
import Image from "next/image";

export type Payment = {
  id: string;
  payment_id: string;
  et_id: string;
  amount: number;
  currency: string;
  gateway_id: string;
  gateway_hash: string;
  gateway_name: string;
  status: string;
  meta_info: string;
  payment_type: string;
  client: string;
  card_type: string;
  descriptor: string;
  refund_info: string;
  // created_at: string;
  image: string;
  receipt_url: string;
  created_at: any,
  next_payment_date: any
}

function SubscriptionList(props: {
  data: SubscriptionObj[],
  isLoading: boolean;
  roleData: any;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  setPageSize: any;
  allGateways: any;
  fetchSubscriptions: any;
  onValueChange: (value: string) => void;
  filterData: () => void;
  filter: any;
  setFilter: (value: any) => void;
}) {
  const {
    data,
    pageSize,
    setPageSize,
    isLoading,
    page,
    setPage,
    totalpage,
    totalItems,
    currentPage,
    onValueChange,
    roleData,
    allGateways,
    fetchSubscriptions,
    setFilter,
    filter,
    filterData
  } = props;
  let defaultData = data;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchVal, setSearchVal] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [subClientsData, setSubClientsData] = useState([]);




  const [{ pageIndex }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const pagination = React.useMemo(() => ({
    pageIndex,
    pageSize,
  }), [pageIndex, pageSize],
  );


  // const getCardSVG = (type: string) => {
  //   switch (type) {
  //     case 'VISA':
  //       return <Image className="" style={{ maxWidth: "65px" }} title={type} src={`${visa}`} alt={`${type}`} />
  //     case 'MasterCard':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${MasterCard}`} alt={`${type}`} />
  //     case 'Discover':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${Discover}`} alt={`${type}`} />
  //     case 'Amex':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${Amex}`} alt={`${type}`} />
  //     case 'MaestroCard':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${MaestroCard}`} alt={`${type}`} />
  //     case 'DinersClub':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${DinersClub}`} alt={`${type}`} />
  //     case 'JCB':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${JCB}`} alt={`${type}`} />
  //     case 'UnionPay':
  //       return <Image style={{ maxWidth: "65px" }} title={type} src={`${UnionPay}`} alt={`${type}`} />

  //     default: return "-"
  //   }

  // }


  const method = roleData[0]?.payment?.value?.payment_show_method_name;
  //console.log("method",method,"method");
  const columns: any[] = useMemo(
    () => [
      {
        Header: '',
        accessor: 'subscription_id',
        Cell: ({ row }) => (
          <div className="flex h-12 w-12 items-center justify-center px-2">

            <button
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => {
                console.log('Clicked row:', row.id);
                setExpandedRows((prev) => ({ [row.id]: !prev[row.id] }))
              }
              }
            >
              {Object.keys(expandedRows).includes(String(row.id)) && expandedRows[row.id] ? (
                <MdKeyboardDoubleArrowDown className="h-5 text-indigo-500 w-5 ml-4" />
              ) : (
                <MdKeyboardDoubleArrowRight className="h-5 text-indigo-500 w-5 ml-4" />
              )}
            </button>
          </div>
        ),
        sortType: 'alphanumeric',
      },
      { Header: 'CLIENT NAME', accessor: 'client', sortType: 'alphanumeric' },
      { Header: 'START DATE', accessor: 'start_date', sortType: 'alphanumeric' },
      { Header: 'CREATED DATE', accessor: 'created_at', sortType: 'alphanumeric' },

      { Header: 'NEXT PAYMENT DATE', accessor: 'next_payment_date', sortType: 'alphanumeric' },

      { Header: 'SUBSCRIPTION ID', accessor: 'id', sortType: 'alphanumeric' },
      { Header: 'INTERVAL', accessor: 'interval', sortType: 'alphanumeric' },
      { Header: 'DURATION', accessor: 'duration', sortType: 'alphanumeric' },
      { Header: 'AMOUNT', accessor: 'amount', sortType: 'alphanumeric' },
      /*{ 
        Header: method ? 'GATEWAY NAME' : 'GATEWAY HASH',
        accessor: method ? 'gateway_name' : 'gateway_hash',
        sortType: 'alphanumeric'
      },*/


      { Header: 'DESCRIPTOR', accessor: 'descriptor', sortType: 'alphanumeric' },
      { Header: 'TRANSACTION', accessor: 'transaction', sortType: 'alphanumeric' },
      { Header: 'STATUS', accessor: 'status', sortType: 'alphanumeric' },

    ],
    [expandedRows]
  );

  console.log("Object.keys(expandedRows).includes(row.id)", Object.keys(expandedRows))

  const dataWithExpandedContent = useMemo(
    () =>
      data.map((row) => ({
        ...row,
        subRows: row.payment.map((payment: any) => ({ ...payment })),
      })),
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: dataWithExpandedContent,
    },
    useSortBy,
    useExpanded,

  );

  const handleValueChange = (e: any) => {

    onValueChange(e);
    setSearchVal(e);
  };
  console.log("expandedRows", expandedRows)

  const handleSelectPayment = async (e: any) => {
    const newValue = e.target.value;
    // setSelectedVal(newValue);
    // setPaymentType(newValue);
  };

  const handelOnDownloadCSV = () => {
    const clients = filter?.clients?.map((m: any) => m.value);
    const interval = filter?.interval?.map((m: any) => m.value);
    const duration = filter?.duration;
    const status = filter?.status?.map((m: any) => m.value);
    // const start_date = filter?.dates?.[0];
    // const end_date = filter?.dates?.[1];
    setLoading(true);
    DownloadCSV(
      clients,
      interval,
      duration,
      status,
    )
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`Failed to download CSV. Status: ${response.status}`);
        // }
        const csvText = response;
        const blob = new Blob([csvText], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "generated_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download Completed");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while downloading CSV"
        );
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };
  const getSubClientsData = () => {

    subscriptionGetClients().then((response: any) => {
      let res = response?.map((m: any) => {
        return {
          label: m,
          value: m
        }
      })
      // console.log("response", response)
      setSubClientsData(res)
    }).catch((error) => {
      toast.error(
        error?.response?.data?.message ??
        "Something went wrong!"
      );
    })
  }
  useEffect(() => {
    getSubClientsData()
  }, [])

  return (
    <>




      <Card extra={"w-full h-full sm:overflow-auto px-6 mb-6 border"}>
        {/* <header className="relative flex items-center justify-between pt-5"> */}
        <header className="relative flex items-center justify-between pt-5 flex-wrap">
          <div className="lg:flex md:flex block w-full justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="text-xl font-normal text-navy-700 dark:text-white">
                {/* All Subscriptions */}
            <Searchbox onSearch={handleValueChange} />


              </div>

            </div>
            <div className="flex flex-wrap justify-between gap-2 md:pe-[0px] lg:pe-[0px]">
            {/* <Searchbox onSearch={handleValueChange} /> */}

           

              <button
                onClick={() => handelOnDownloadCSV()}
                // disabled={Loading}
                // className="flex w-[155px] my-1 md:my-3 items-center gap-2 rounded-full bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
                className="flex w-[159px] my-1 md:my-3 items-center gap-2 rounded-full bg-white      px-3 py-2 text-black hover:bg-indigo-500 hover:text-white border  "
              >
                <FaDownload className="w-[14px] " />

                <p>Download CSV</p>
              </button>

              <FilterModal
                subClientsData={subClientsData}
                setPage={setPage}
                filter={filter}
                setFilter={setFilter}
                roleData={roleData}
                filterData={filterData}
                fetchSubscriptions={fetchSubscriptions}
              />


             


            </div>
          </div>
        </header>

        <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">

          {

            props?.isLoading ?
              <DivLoader className="m-5 h-6 w-6  border-indigo-500" /> :

              <table {...getTableProps()} className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index} className="!border-px !border-gray-400">
                      {headerGroup.headers.map((column,i) => (
                        <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                          className={`text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start `} >
                          {column.render('Header')}
                          <div className=" justify-between text-xs text-gray-200">
                            {column.isSorted ? (column.isSortedDesc ? ' ' : ' ') : ''}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>


                <tbody {...getTableBodyProps()}>
                  {rows?.length > 0 ? rows.map((row: any) => {
                    prepareRow(row);

                    return (
                      <React.Fragment key={row.id}>
                        <tr {...row.getRowProps()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          {row.cells.map((cell, index) => (

                            <td {...cell.getCellProps()} key={index} className={`min-w-[150px] border-white/0 py-3  pr-4 ${index == 0 ? "min-w-[70px]" : ""} `}
                            > <div className="flex items-center">
                                <div className="flex text-sm font-normal text-navy-700 dark:text-white">

                                  {
                                    cell.column.id === 'amount' ?

                                      `${convertToFloat(cell.value)} ${row.original.currency}`

                                      : cell.column.id === 'status' ?
                                      <>
                                      <span className="font-bold flex">
                                      <StatusStyle status={cell.value} value={cell.value} />

                                      </span>

                                      
                                      </>


                                        : cell.column.id === 'transaction' ?
                                          `${row.original.paid_payments}/${row.original.billing_cycles}`

                                          : cell.column.id === 'id' ?
                                            <ShortTruncateCopy
                                              info={row.original.subscription_id
                                                ? row.original.subscription_id
                                                : "-"}
                                              showCopy={true}
                                            />
                                            : cell.render('Cell')}

                                </div>
                              </div>
                            </td>
                          ))

                          }
                        </tr>
                        {expandedRows[row.id] && (
                          <tr className="bg-gray-100 pl-2">
                            <td colSpan={columns.length} className="pl-2">
                              <table className="w-full" >
                                <thead>
                                  <tr>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CLIENT NAME</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >DATE</th>
                                    {/* <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CREATED AT</th> */}
                                    {/* <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >NEXT PAYMENT DATE              </th> */}

                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >AMOUNT</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >TRANSACTION ID</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >INTERNAL ID</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >{method ? 'GATEWAY NAME' : 'GATEWAY HASH'}</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >DESCRIPTOR</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CARD TYPE</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >STATUS</th>
                                    <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >ACTION</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  {row?.original?.payment?.map((payment: any, index: number) => {
                                    let enRefund = allGateways.find((gateway: any) => gateway?.id === payment?.gateway_id);
                                    //console.log("enRefund",enRefund);  
                                    return (
                                      <tr key={index}>

                                        <td className="min-w-[150px] border-white/0 py-3  pr-1" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {payment.client}
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {payment.created_at}
                                          </p>
                                        </div>
                                        </td>
                                        {/* <td className="min-w-[150px] border-white/0 py-3  pr-4" >
                                    <div className="flex items-center">

                                      {payment.created_at}
                                    </div>

                                  </td> */}
                                        {/* <td className="min-w-[150px] border-white/0 py-3  pr-4" >
                                    <div className="flex items-center">

                                      {payment.next_payment_date}
                                    </div>

                                  </td> */}
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {convertToFloat((payment.amount))} {payment.currency}
                                            {
                                              (payment?.converted_amount && payment?.converted_currency) && <>
                                                {
                                                  ` (${payment?.converted_amount} ${payment?.converted_currency})`
                                                }
                                              </>
                                            }
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">



                                            <ShortTruncateCopy
                                              info={payment?.et_id
                                                ? payment?.et_id
                                                : "-"}
                                              showCopy={true}
                                            />
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            <ShortTruncateCopy
                                              info={payment?.id
                                                ? payment?.id
                                                : "-"}
                                              showCopy={true}
                                            />

                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {method === false ? (

                                              <ShortTruncateCopy
                                                info={payment?.gateway_hash
                                                  ? payment?.gateway_hash
                                                  : "-"}
                                                showCopy={true}
                                              />

                                            ) : (

                                              <span className="flex items-center ">
                                                <Image
                                                  style={{ height: "auto", width: "15px" }}
                                                  className="h-auto w-20"
                                                  src={getImage(payment?.gateway_name)}
                                                  alt="Gateway Image"
                                                />
                                                <p className="px-2">{payment?.gateway_name
                                                  ? payment?.gateway_name
                                                  : "-"}
                                                </p>
                                              </span>

                                            )}
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {payment.gateway_name}
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <p className="text-sm font-normal text-navy-700 dark:text-white">
                                            {/* {getCardSVG(payment.card_type)} */}

                                            <Image
                                                  style={{ height: "auto", width: "45px" }}
                                                  className="h-auto w-20"
                                                  src={getCardSVG(payment?.card_type)}
                                                  alt="Gateway Image"
                                                />
                                          </p>
                                        </div>
                                        </td>
                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                          <div className="flex items-center gap-1.5 text-sm font-bold">

                                            <StatusRender
                                              status={payment.status}
                                              value={payment.status}
                                            />
                                          </div>
                                        </div>
                                        </td>

                                        <td className="min-w-[150px] border-white/0 py-3  pr-4" >
                                          <div className="flex items-center">

                                            <RefundModal
                                              info={payment}
                                              transactionID={payment?.et_id}
                                              fetchPayments={fetchSubscriptions}
                                              enRefund={enRefund.refund}
                                            />

                                            {roleData?.[0]?.payment?.value
                                              ?.view_payment_response_information && (
                                                <InfoModal info={payment} />
                                              )}

                                            <a
                                              href={payment?.receipt_url}
                                              target="_blank"
                                              aria-disabled={!payment?.receipt_url}
                                              className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                                            >
                                              {roleData?.[0]?.payment?.value?.view_payment_receipt && (
                                                <BsReceipt className={"h-5 w-5"} />
                                              )}
                                            </a>
                                            <RetryModal
                                              info={payment}
                                              transactionID={payment?.id}
                                              fetchPayments={fetchSubscriptions}
                                              enRefund={enRefund.refund}
                                            />

                                          </div>
                                        </td>


                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })

                    :
                    <tr>
                      <td colSpan={15} >
                        <p className="text-center p-4" >No records found.</p>
                      </td>

                    </tr>
                  }
                </tbody>

              </table>

          }

          {/* <div className="mt-14 h-fit w-full bg-yellow-200 dark:!bg-navy-800"> */}
          {false && <table {...getTableProps()} className="w-full">
            {/* <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start">
                      {column.render('Header')}
                      <div className=" justify-between text-xs text-gray-200">
                        {column.isSorted ? (column.isSortedDesc ? ' ' : ' ') : ''}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead> */}
            <tbody {...getTableBodyProps()}>


              <Accordion
                className="bg-white dark:!bg-navy-800"
                allowMultipleExpanded={false}
                allowZeroExpanded={true}
              >
                {rows.map((row: any) => {
                  prepareRow(row);

                  return (
                    <React.Fragment key={row.id}>
                      <tr {...row.getRowProps()}>
                        <AccordionItem className="bg-white dark:!bg-navy-800">
                          <AccordionItemHeading
                            className="pr-6"
                            onClick={() => {
                              setOpen(!open);
                            }}
                          >
                            <AccordionItemButton className="flex items-center justify-between border-b border-gray-200 py-[17px] dark:!border-white/10">

                              {row.cells.map((cell,index) => (

                                <td key={index} {...cell.getCellProps()} className="min-w-[150px] border-white/0 py-3  pr-4"
                                > <div className="flex items-center">
                                    <div className="flex text-sm font-bold text-navy-700 dark:text-white">

                                      {
                                        cell.column.id === 'amount' ?

                                          `${convertToFloat(cell.value)} ${row.original.currency}`

                                          : cell.column.id === 'status' ?
                                            <StatusStyle status={cell.value} value={cell.value} />


                                            : cell.column.id === 'transaction' ?
                                              `${row.original.paid_payments}/${row.original.billing_cycles}`

                                              : cell.column.id === 'id' ?
                                                <ShortTruncateCopy
                                                  info={row.original.subscription_id
                                                    ? row.original.subscription_id
                                                    : "-"}
                                                  showCopy={true}
                                                />
                                                : cell.render('Cell')}

                                    </div>
                                  </div>
                                </td>
                              ))

                              }
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          {true && <AccordionItemPanel>
                            {expandedRows[row.id] && (
                              <tr className=" pl-2 border">
                                <td colSpan={columns.length} className="pl-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                                  <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                      <tr>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CLIENT NAME</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >DATE</th>
                                        {/* <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CREATED AT</th> */}
                                        {/* <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >NEXT PAYMENT DATE              </th> */}

                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >AMOUNT</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >TRANSACTION ID</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >INTERNAL ID</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >{method ? 'GATEWAY NAME' : 'GATEWAY HASH'}</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >DESCRIPTOR</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >CARD TYPE</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >STATUS</th>
                                        <th className="text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start" >ACTION</th>

                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row?.original?.payment?.map((payment: any, index: number) => {
                                        let enRefund = allGateways.find((gateway: any) => gateway?.id === payment?.gateway_id);
                                        return (
                                          <tr key={index} className="border">

                                            <td className="min-w-[150px] border-white/0 py-3  pr-1" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {payment.client}
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {payment.created_at}
                                              </p>
                                            </div>
                                            </td>

                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {convertToFloat((payment.amount))} {payment.currency}
                                                {
                                                  (payment?.converted_amount && payment?.converted_currency) && <>
                                                    {
                                                      ` (${payment?.converted_amount} ${payment?.converted_currency})`
                                                    }
                                                  </>
                                                }
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">



                                                <ShortTruncateCopy
                                                  info={payment?.et_id
                                                    ? payment?.et_id
                                                    : "-"}
                                                  showCopy={true}
                                                />
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                <ShortTruncateCopy
                                                  info={payment?.id
                                                    ? payment?.id
                                                    : "-"}
                                                  showCopy={true}
                                                />

                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {method === false ? (

                                                  <ShortTruncateCopy
                                                    info={payment?.gateway_hash
                                                      ? payment?.gateway_hash
                                                      : "-"}
                                                    showCopy={true}
                                                  />

                                                ) : (

                                                  <span className="flex items-center ">
                                                    <Image
                                                      style={{ height: "auto", width: "15px" }}
                                                      className="h-auto w-20"
                                                      src={getImage(payment?.gateway_name)}
                                                      alt="Gateway Image"
                                                    />
                                                    <p className="px-2">{payment?.gateway_name
                                                      ? payment?.gateway_name
                                                      : "-"}
                                                    </p>
                                                  </span>

                                                )}
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {payment.gateway_name}
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {/* {getCardSVG(payment.card_type)} */}
                                                <Image
                                                  style={{ height: "auto", width: "45px" }}
                                                  className="h-auto w-20"
                                                  src={getCardSVG(payment?.card_type)}
                                                  alt="Gateway Image"
                                                />
                                              </p>
                                            </div>
                                            </td>
                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" > <div className="flex items-center">
                                              <div className="flex items-center gap-1.5 text-sm font-bold">

                                                <StatusRender
                                                  status={payment.status}
                                                  value={payment.status}
                                                />
                                              </div>
                                            </div>
                                            </td>

                                            <td className="min-w-[150px] border-white/0 py-3  pr-4" >
                                              <div className="flex items-center">

                                                <RefundModal
                                                  info={payment}
                                                  transactionID={payment?.et_id}
                                                  fetchPayments={fetchSubscriptions}
                                                  enRefund={enRefund.refund}
                                                />

                                                {roleData?.[0]?.payment?.value
                                                  ?.view_payment_response_information && (
                                                    <InfoModal info={payment} />
                                                  )}

                                                <a
                                                  href={payment?.receipt_url}
                                                  target="_blank"
                                                  aria-disabled={!payment?.receipt_url}
                                                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                                                >
                                                  {roleData?.[0]?.payment?.value?.view_payment_receipt && (
                                                    <BsReceipt className={"h-5 w-5"} />
                                                  )}
                                                </a>
                                                <RetryModal
                                                  info={payment}
                                                  transactionID={payment?.id}
                                                  fetchPayments={fetchSubscriptions}
                                                  enRefund={enRefund.refund}
                                                />

                                              </div>
                                            </td>


                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </AccordionItemPanel>}
                        </AccordionItem>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </Accordion>




            </tbody>
          </table>}

          {/* </div> */}

        </div>
        <Pagination
          setPage={setPage}
          page={page}
          totalpage={totalpage}
          currentPage={currentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          arraySize={[50, 100, 200]}
        />

      </Card >

    </>

  );
};

export default SubscriptionList;
