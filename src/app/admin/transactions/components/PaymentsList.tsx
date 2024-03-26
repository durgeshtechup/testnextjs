import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import InputField from "components/fields/InputField";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import React, { useState, useEffect, useContext } from "react";
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
// import { GatewayTypes } from "views/admin/clients/components/CreateClientGatewaysModal";
// import { TruncateCopy } from "views/admin/organizations/components/CreateOrgModal";
import { PaymentRowObj } from "../page";
import InfoModal from "./InfoModal";
import RefundModal from "./RefundModal";
import { convertToFloat } from "utils/formatNumber";
import ReceiptModal from "./ReceiptModal";
import { BsReceipt } from "react-icons/bs";
import { ClientContext } from "clientProvider";
import { DownloadCSV, getLive, getStatusHistory } from "api/payments";
import { toast } from "react-hot-toast";
import { RiRotateLockFill } from "react-icons/ri";
import FilterModal from "./FilterModal";
import { FaDownload } from "react-icons/fa";
import ShortTruncateCopy from "components/common/ShortTruncateCopy";
import Searchbox from "components/fields/Searchbox";
import { getCardSVG, getImage } from "utils/commonFunction";
import Pagination from "components/pagination";
import StatusRender from "./StatusRender";
import RetryModal from "./RetryModal";
import visa from "assets/svg/card_type/visa.svg"
import MasterCard from "../../../../../src/assets/svg/card_type/mastercard.svg"
import Discover from "../../../../../src/assets/svg/card_type/discover.svg"
import Amex from "../../../../../src/assets/svg/card_type/amex.svg"
import MaestroCard from "../../../../../src/assets/svg/card_type/maestro.svg"
import DinersClub from "../../../../../src/assets/svg/card_type/dinersclub.svg"
import JCB from "../../../../../src/assets/svg/card_type/jcb.svg"
import UnionPay from "../../../../../src/assets/svg/card_type/unionpay.svg"
import TooltipHorizon from "components/tooltip";
import { MdChangeCircle } from "react-icons/md";
import ChangeStatusModal from "./StatusChangeModal";
import {
  Popover, PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor
} from "@chakra-ui/popover";
import { Portal } from "@chakra-ui/portal";
// import moment from "moment";
// import PopoverHorizon from "components/popover";
// import { UncontrolledPopover, PopoverHeader as PopoverHeaderR, PopoverBody as PopoverBodyR, Button as ButtonR } from 'reactstrap';
import { GatewayTypes } from "app/admin/clients/components/CreateClientGatewaysModal";
import { TruncateCopy } from "app/admin/organizations/components/CreateOrgModal";
import Image from "next/image";

function PaymentTable(props: {
  tableData: any;
  fetchPayments: () => void;
  filterData: () => void;
  isLoading: boolean;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  clients: any[];
  allGateways: any[];
  allCardType: any[];
  curretClient: string;
  setCurrentClient: any;
  pageSize: number;
  setPageSize: any;
  roleData: any;
  filter: any;
  setFilter: (e: any) => void;
  onValueChange: (value: string) => void;
}) {
  const {
    tableData,
    filterData,
    fetchPayments,
    page,
    clients,
    allGateways,
    allCardType,
    setPage,
    currentPage,
    totalpage,
    curretClient,
    setCurrentClient,
    totalItems,
    pageSize,
    setPageSize,
    roleData,
    filter,
    setFilter,
    onValueChange,
  } = props;

  let defaultData = tableData;

  const [{ pageIndex }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [paymentHistoryData, setPaymentHistoryData] = useState<any>([])

console.log("MasterCard",MasterCard)

  const pagination = React.useMemo(() => ({
    pageIndex,
    pageSize,
  }), [pageIndex, pageSize],
  );

  const getStatusHistoryFun = (id: any) => {
    // setPaymentHistoryData([])

    getStatusHistory(id).then((res) => {
      console.log("ress", res)
      setPaymentHistoryData(res?.payment_history)

    }).catch((error) => {
      toast.error("Something went wrong!")
      setPaymentHistoryData([])

    })
  }

  

  const method = roleData[0]?.payment?.value?.payment_show_method_name;
  const columns = [
    columnHelper.accessor("payment_id", {
      id: "payment_id",
      header: () => <p></p>,
      cell: ({ row }) => {
        return (
          <div className="flex h-12 w-12 items-center justify-center px-2">



            {row.getCanExpand() ? (
              <>
                <button
                  {...{
                    // onClick: row.getToggleExpandedHandler(),
                    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
                    //  onClick: () => { row.getToggleExpandedHandler(); setExpandedRows((prev) => ({ [row.id]: !prev[row.id] })) },
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    // {Object.keys(expandedRows).includes(String(row.id)) && expandedRows[row.id]  ? (

                    <MdKeyboardDoubleArrowDown className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <MdKeyboardDoubleArrowRight className="h-5 w-5 text-indigo-500" />
                  )}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("client", {
      id: "client",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT NAME
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center">
                <p className="text-sm font-normal text-navy-700 dark:text-white">
                  {info.getValue()}
                </p>
              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">DATE</p>
      ),
      sortDescFirst: true,
      cell: (info) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <p className="text-sm font-normal text-navy-700 dark:text-white">
                {info.getValue()}
              </p>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          AMOUNT
        </p>
      ),
      cell: (info: any) => {
        //console.log("info.row",info.row.getIsExpanded());
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center">
                <p className="text-sm font-normal uppercase text-navy-700 dark:text-white">
                  {convertToFloat(info.getValue())}{" "}
                  {info?.row?.original?.currency}

                  {(info?.row?.original?.converted_amount && info?.row?.original?.converted_currency) && <span>
                    {` (${info?.row?.original?.converted_amount} ${info?.row?.original?.converted_currency})`}
                  </span>}
                </p>
              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("et_id", {
      id: "et_id_",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          TRANSACTION ID
        </p>
      ),
      cell: (info) => {
        return (
          <>
            <p className="text-sm font-normal uppercase text-navy-700 dark:text-white">

              {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
                <ShortTruncateCopy info={info?.getValue()} showCopy={true} />
              )}
            </p>
          </>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          INTERNAL ID
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            <p className="text-sm font-normal uppercase text-navy-700 dark:text-white">

              {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
                <ShortTruncateCopy info={info?.getValue()} showCopy={true} />
              )}
              {/*  <TruncateCopy info={info} slice={13} showCopy={false} /> */}
            </p>
          </>
        );
      },
    }),
    columnHelper.accessor("gateway_id", {
      id: "gateway_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          GATEWAY {method ? ("NAME") : "HASH ID"}
        </p>
      ),
      cell: (info) => {
        let gateway_name = info?.cell?.row?.original?.gateway_name;
        //console.log("info",info?.cell?.row?.original,"info22");
        return (
          <>
            <p className="text-sm font-normal uppercase text-navy-700 dark:text-white">

              {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
                <div
                  // className="flex items-center justify-start gap-3"
                  title={info?.cell?.row?.original?.gateway_id}
                >
                  {gateway_name === null ? (

                    <ShortTruncateCopy
                      //info={info?.cell?.row?.original?.gateway_id }
                      info={info?.cell?.row?.original?.gateway_id
                        ? info?.cell?.row?.original?.gateway_id
                        : "-"}
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
                      <p className="px-2">{info?.cell?.row?.original?.gateway_name
                        ? info?.cell?.row?.original?.gateway_name
                        : "-"}</p>
                    </span>

                  )}

                </div>
              )}
            </p>
          </>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          DESCRIPTOR
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <p className="text-sm font-normal text-navy-700 dark:text-white">
                {info?.cell?.row?.original?.meta_info?.Descriptor
                  ? info?.cell?.row?.original?.meta_info?.Descriptor
                  : "-"}
              </p>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CARD TYPE
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <p className="text-sm font-normal text-navy-700 dark:text-white">
                {info?.row?.original?.card_type
                  ?
                  <Image
                  style={{ height: "auto", width: "45px" }}
                  className="h-auto w-20"
                  src={getCardSVG(info?.row?.original?.card_type)}
                  alt="Image"
                  title={info?.row?.original?.card_type}
                />
                  
                  : '-'
                }
              </p>
            )}
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
      cell: (info) => {
        // console.log("infio")
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center gap-1.5 text-sm font-bold">
                {/* <StatusRender
                  status={info?.row?.original?.status}
                  value={info.getValue()}
                /> */}

                {/* <PopoverHorizon
                  extra=""
                  trigger={
                    <button onClick={() => {
                      getStatusHistoryFun(info?.row?.original?.id)

                    }} className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white">
                      <StatusRender
                        status={info?.row?.original?.status}
                        value={info.getValue()}
                      />
                    </button>
                  }
                  content={
                    <p>
                      {
                        paymentHistoryData?.length > 0 ?

                          paymentHistoryData?.map((hisData: any, index: number) => {
                            return <>
                              <Card className="shadow m-2">
                                <div className="max-w-[50vh] p-3 border-1">
                                  {index == 0 && <p className="text-black " >
                                    Created at {hisData?.created_at}  by API call from [{hisData?.client}{"-"}{hisData?.ip}] with status {hisData?.previous_status}
                                  </p>}

                                  <div className="text-black ">
                                    {(hisData?.status == "CHARGEBACK" && index != 0) && <div className="">


                                      <p>
                                        Status change from {hisData?.previous_status} to {hisData?.status} at {hisData?.status_changed_date} by {hisData?.client ? `System Api Call ${hisData?.gateway_name}` : `${hisData?.first_name} ${hisData?.last_name}`}
                                      </p>
                                      <p>
                                        ARN Number : {hisData?.arn ?? "-"}
                                      </p>
                                      <p>
                                        Charge Back Reason: {hisData?.reason ?? "-"}
                                      </p>
                                    </div>}
                                    {(hisData?.status != "CHARGEBACK" && index != 0) && <p className="text-black ">
                                      Status change from {hisData?.previous_status} to {hisData?.status} at {hisData?.status_changed_date} by {hisData?.status} at {hisData?.status_changed_date} by {hisData?.client ? `System Api Call ${hisData?.gateway_name}` : `${hisData?.first_name} ${hisData?.last_name}`}
                                    </p>}
                                  </div>





                                </div>
                              </Card>
                            </>
                          })


                          : "Loading...."

                      }
                    </p>

                  }
                /> */}










                {/* {info?.row?.original?.status == "CHARGEBACK" ? */}
                {true ?
                  <Popover
                  //  onOpen={() => {
                  //   getStatusHistoryFun(info?.row?.original?.id)
                  // }} onClose={() => {
                  //   setPaymentHistoryData([])
                  // }}
                  >
                    <PopoverTrigger >
                      <button className="flex items-center gap-1.5">
                        <StatusRender
                          status={info?.row?.original?.status}
                          value={info.getValue()}
                        />
                      </button>
                    </PopoverTrigger>
                    <Portal>

                      <PopoverContent borderColor='blue.800' className="z-20 dark:bg-gray-800  invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-3 border-1">
                        <PopoverArrow borderColor='blue.800' className="z-20 dark:bg-gray-800 absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-3 border-8" />
                        <PopoverHeader>
                          <span className="text-xl text-gray-900 font-bold">Status History</span>
                        </PopoverHeader>

                        <PopoverBody className="overflow-auto max-h-[50vh]">


                          {info?.row?.original?.payment_history?.length > 0 ?

                            info?.row?.original?.payment_history?.map((hisData: any, index: number) => {
                              return <>
                                <Card className="shadow m-2">
                                  <div className="max-w-[55vh] p-3 border-1 ">
                                    {index == 0 && <p className="text-black text-gray-900" >
                                      Created at {hisData?.created_at}  by API call from [{hisData?.client}{" - "}{hisData?.ip}] with status {hisData?.status}
                                    </p>}

                                    <div className="text-black text-gray-900">
                                      {(hisData?.status == "CHARGEBACK" && index != 0) && <div className="">


                                        <p>
                                          Status change from {hisData?.previous_status} to {hisData?.status} at {hisData?.status_changed_date} by {hisData?.client ? `System Api Call ${hisData?.gateway_name || ""}` : `${hisData?.first_name || ""} ${hisData?.last_name || ""}`}
                                        </p>
                                        <p>
                                          ARN Number : {hisData?.arn || "-"}
                                        </p>
                                        <p>
                                          Charge Back Reason : {hisData?.reason || "-"}
                                        </p>
                                      </div>}
                                      {(hisData?.status != "CHARGEBACK" && index != 0) && <p className="text-black ">
                                        Status change from {hisData?.previous_status} to {hisData?.status} at {hisData?.status_changed_date}  by {hisData?.client ? `System Api Call ${hisData?.gateway_name || ""}` : `${hisData?.first_name || ""} ${hisData?.last_name || ""}`}
                                      </p>}
                                    </div>





                                  </div>
                                </Card>
                              </>
                            })


                            : <span className="text-gray-900">No history available.</span>}





                        </PopoverBody>
                      </PopoverContent>
                    </Portal>

                  </Popover> :
                  <StatusRender
                    status={info?.row?.original?.status}
                    value={info.getValue()}
                  />
                }








              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("et_id", {
      id: "et_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info: any) => {
        let enRefund = allGateways.find(gateway => gateway.id === info?.row?.original?.gateway_id);
        console.log("enRefund", enRefund)
        //console.log("infoinfo",info,"fetchPayments",fetchPayments,"enRefund",enRefund);
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center">
                {roleData?.[0]?.payment?.value?.refund_payment_list && (
                  <RefundModal
                    info={info.row.original}
                    fetchPayments={fetchPayments}
                    enRefund={enRefund?.refund}
                    transactionID={info.row.original.et_id}
                  />
                )}
                {roleData?.[0]?.payment?.value
                  ?.view_payment_response_information && (
                    <InfoModal info={info.row.original} />
                  )}
                {/* <ReceiptModal info={info} /> */}
                <a
                  href={info.row.original?.receipt_url}
                  target="_blank"
                  aria-disabled={!info.row.original?.receipt_url}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                >
                  {roleData?.[0]?.payment?.value?.view_payment_receipt && (
                    <BsReceipt className={"h-5 w-5"} />
                  )}
                </a>

                {roleData?.[0]?.payment?.value?.refund_payment_list && (
                  <RetryModal
                    info={info.row.original}
                    fetchPayments={fetchPayments}
                    enRefund={enRefund?.refund}
                    transactionID={info?.row?.original?.id}
                  />
                )}

                {roleData?.[0]?.payment?.value?.edit_payment_status && (
                  <ChangeStatusModal
                    info={info.row.original}
                    fetchPayments={fetchPayments}
                    enRefund={enRefund?.refund}
                    transactionID={info?.row?.original?.id}
                  />)
                }

                {/* "" === "small" ? "h-4 w-4" :  */}
              </div>
            )}
          </>
        );
      },
    }),
  ]; // eslint-disable-next-line
  const columnsNonAction = [
    columnHelper.accessor("payment_id", {
      id: "payment_id",
      header: () => <p></p>,
      cell: ({ row }) => {
        return (
          <div className="flex h-12 w-12 items-center justify-center px-2">
            {row.getCanExpand() ? (
              <>
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <MdKeyboardDoubleArrowDown className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <MdKeyboardDoubleArrowRight className="h-5 w-5 text-indigo-500" />
                  )}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("client", {
      id: "client",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT NAME
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  {info.getValue()}
                </p>
              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">DATE</p>
      ),
      // sortDescFirst: true,
      cell: (info) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                {info.getValue()}
              </p>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          AMOUNT
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center">
                <p className="text-sm font-bold uppercase text-navy-700 dark:text-white">
                  {convertToFloat(info.getValue())}{" "}
                  {info?.row?.original?.currency}
                </p>
              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("et_id", {
      id: "et_id_",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          TRANSACTION ID
        </p>
      ),
      cell: (info) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <TruncateCopy
                info={info}
                slice={13}
                showCopy={info?.getValue() !== "-"}
              />
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          INTERNAL ID
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <ShortTruncateCopy info={info?.getValue()} showCopy={true} />
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("gateway_id", {
      id: "gateway_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          GATEWAY HASH ID
        </p>
      ),
      cell: (info) => {
        let _gateway = GatewayTypes.filter(
          (data) => data.id === info?.cell.row.original.gateway_id
        );
        let gateway_id =
          _gateway && _gateway.length > 0 ? _gateway[0].id : null;
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div
                className="flex items-center justify-start gap-3"
                title={gateway_id}
              >
                <ShortTruncateCopy
                  info={info?.cell?.row?.original?.gateway_id} showCopy={true}
                />
                {/* {GatewayTypes?.map((ele) => {
                  return (
                    <>
                      {gateway_id === ele?.id && (
                        <>
                          <button
                            className="shadoe-3xl rounded-lg shadow-shadow-500 outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={info?.row?.original?.status === "false"}
                            title={ele?.id}
                          >
                            <Image
                              src={ele.image}
                              className="h-8 w-8 object-cover"
                            />
                          </button>
                          <p className="font-bold lowercase first-letter:capitalize">
                            {gateway_id}
                          </p>
                        </>
                      )}
                    </>
                  );
                })} */}
              </div>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          DESCRIPTOR
        </p>
      ),
      cell: (info: any) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <p className="text-center text-sm font-bold text-navy-700 dark:text-white">
                {info?.cell?.row?.original?.meta_info?.Descriptor
                  ? info?.cell?.row?.original?.meta_info?.Descriptor
                  : "-"}
              </p>
            )}
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
      cell: (info) => {
        return (
          <>
            {!info.row.getIsExpanded() && !info.row.getIsExpanded() && (
              <div className="flex items-center gap-1.5 text-sm font-bold">
                <StatusRender
                  status={info?.row?.original?.status}
                  value={info.getValue()}
                />
              </div>
            )}
          </>
        );
      },
    }),
  ];

  const { paymentGateway, setPaymentGateway, paymentType, setPaymentType } =
    useContext(ClientContext);
  const [data, setData] = React.useState(() => [...defaultData]);
  const [selectedVal, setSelectedVal] = useState("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [methodName, setMethodName] = useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<string>("");
  // const [toggleVal,setToggleVal] = useState<any>(false)

  React.useEffect(() => {
    let method = roleData[0]?.payment?.value?.payment_show_method_name;
    setMethodName(method);
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns:
      roleData?.[0]?.payment?.value?.view_payment_receipt ||
        roleData?.[0]?.payment?.value?.view_payment_response_information ||
        roleData?.[0]?.payment?.value?.refund_payment_list
        ? columns
        : columnsNonAction,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getSubRows: (row) => row.all_data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,

  });

  useEffect(() => {
    const fetchData = async (type: any) => {
      try {
        const res = await getLive(type);
      } catch (err) {
        //console.log("err", err);
      }
    };

    if (paymentGateway === true) {
      fetchData("live"); // Make the API request for Live mode
    } else {
      fetchData("test"); // Make the API request for Test mode
    }
  }, [paymentGateway]);

  const handleToggle = () => {
    setPaymentGateway(!paymentGateway);
  };

  const handleSelectPayment = async (e: any) => {
    const newValue = e.target.value;
    setSelectedVal(newValue);
    setPaymentType(newValue);
  };

  const handleValueChange = async (e: string) => {
    onValueChange(e);
    //console.log('Searching for:', e);

  }

  const handelOnDownloadCSV = () => {
    const paymentType = filter?.status;
    const client = filter?.client;
    const gateway = filter?.gateway;
    const payment_status = filter?.payment_status;
    const card_type = filter?.card_type;
    const start_date = filter?.dates?.[0];
    const end_date = filter?.dates?.[1];
    setLoading(true);

    DownloadCSV(
      paymentType,
      client,
      gateway,
      payment_status,
      start_date,
      end_date
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

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 mb-6"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        <div className="lg:flex md:flex block w-full justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="text-xl font-normal text-navy-700 dark:text-white">
          <Searchbox onSearch={handleValueChange} />
             
            </div>

          </div>
          {/* <div className="flex">
            <label className="relative mb-3 inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                // @ts-ignore
                // checked={formValues && formValues.is_live}
                onChange={handleToggle}
              />

              <div className="peer h-6 w-11 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800" />

              <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                {paymentGateway ? "Live" : "Test"} 
              </span>
            </label>
          </div> */}
          <div className="flex flex-wrap justify-between gap-2 md:pe-[0px] lg:pe-[0px]">


            <button
              onClick={() => handelOnDownloadCSV()}
              disabled={Loading}
              className="flex w-[159px] my-1 md:my-3 items-center gap-2 rounded-full bg-white      pl-3 py-2 text-black hover:bg-indigo-500 hover:text-white border  "

              // className="flex w-[155px] my-1 md:my-3 items-center gap-2 rounded-full bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
            >
              <FaDownload className="w-[14px] " />
              <p>Download CSV</p>
            </button>


            <FilterModal
              clients={clients}
              allGateways={allGateways}
              allCardType={allCardType}
              paymentType={paymentType}
              curretClient={curretClient}
              handleSelectPayment={handleSelectPayment}
              setPage={setPage}
              setCurrentClient={setCurrentClient}
              filter={filter}
              setFilter={setFilter}
              filterData={filterData}
              roleData={roleData}
            />

            {/* <select
              className="flex w-20 items-center justify-center rounded-xl border border-gray-200 px-3 py-3 text-sm font-bold text-gray-800 outline-none hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
              value={paymentType}
              onChange={handleSelectPayment}
            >
              <option value="all">All</option>
              <option value="test">Test</option>
              <option value="live">Live</option>
            </select>
            <select
              className="flex w-44 items-center justify-center rounded-xl border border-gray-200 px-3 py-3 text-sm font-bold text-gray-800 outline-none hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
              value={curretClient}
              onChange={(e) => {
                setPage(1);
                setCurrentClient(e.target.value);
              }}
            >
              <option value={"all"}>{"All"}</option>
              {clients?.[0]?.map((data: any) => {
                return <option value={data.client_id}>{data.name}</option>;
              })}
            </select> */}
          </div>
        </div>
      </header>

      <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">
        {props.isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
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
              {table.getRowModel().rows?.length > 0 ? table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-50 ${row.getIsExpanded() ? "bg-gray-100" : ""} ${!row.getCanExpand() ? "bg-gray-100" : ""
                      } `}

                  // className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={`border-white/0 py-3  pr-4 ${cell.column.id === "payment_id"
                            ? "min-w-[30px]"
                            : "min-w-[150px]"
                            }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })



                    }
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

      <Pagination
        setPage={setPage}
        page={page}
        totalpage={totalpage}
        currentPage={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        arraySize={[50, 100, 200]}

      />


    </Card>
  );
}

export default PaymentTable;
const columnHelper = createColumnHelper<PaymentRowObj>();



