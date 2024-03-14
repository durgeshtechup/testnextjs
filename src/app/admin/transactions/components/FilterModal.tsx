"use-client"
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/modal";
import { getGateways, getTimeZone, refundPayment } from "api/payments";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import DateRange from "components/fields/DateRange";
import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineReplayCircleFilled, MdPeople } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { DateRangePicker } from "rsuite";
import { convertToFloat } from "utils/formatNumber";
import { useOnClickOutsideSingel } from "utils/useOnClickOutside";
// import { GatewayTypes } from "views/admin/clients/components/CreateClientGatewaysModal";
// import TripleToggleSwitch from "./TripleToggleSwitch";
// import DateRange from "../../../../components/fields/DateRange";
const FilterModal = ({
  clients,
  allGateways,
  allCardType,
  paymentType,
  curretClient,
  setCurrentClient,
  setPage,
  handleSelectPayment,
  filterData,
  fetchPayments,
  varient,
  filter,
  setFilter,
  roleData,
}: {
  clients?: any;
  allGateways?: any;
  allCardType?: string[];
  paymentType?: any;
  curretClient?: any;
  setCurrentClient?: any;
  setPage?: any;
  handleSelectPayment?: (e: any) => void;
  filterData?: () => void;
  fetchPayments?: () => void;
  varient?: string;
  filter?: any;
  setFilter?: (e: any) => void;
  roleData?: any;

}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [clientdropdown, setClientDropdown] = React.useState<boolean>(false);
  const [paymentdropdown, setPaymentDropdown] = React.useState<boolean>(false);
  const [cardtypedropdown, setCardtypeDropdown] = React.useState<boolean>(false);
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [paymentName, setPaymentName] = React.useState<boolean>(false);
  const [CardOption, setCardOption] = React.useState([]);
  const [timeZone, setTimeZone] = React.useState<any>();
  const [dates, setDates] = React.useState<[Date, Date]>()


  React.useEffect(() => {
    setPaymentName(roleData[0]?.payment?.value?.payment_show_method_name);
    if (allCardType !== undefined) {
      setCardOption(allCardType);
    }
  }, [allCardType]);

  const clientRef = useRef();
  useOnClickOutsideSingel(clientRef, () => {
    setClientDropdown(false);
  });
  const payRef = useRef();
  useOnClickOutsideSingel(payRef, () => {
    setPaymentDropdown(false);
  });
  const cardRef = useRef();
  useOnClickOutsideSingel(cardRef, () => {
    setCardtypeDropdown(false);
  });
  const getRef = useRef();
  useOnClickOutsideSingel(getRef, () => {
    setDropdown(false);
  });



  const fetchTimeZone = () => {
    // setIsLoading(true);
    getTimeZone()
      .then((data) => {
        setTimeZone(data ?? []);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching time zone"
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTimeZone();

  }, []);



  //console.log("filterrrrr", roleData[0]?.payment?.value?.payment_show_method_name);

  const handleClose = () => {
    onClose();
    setFilter({
      status: "all",
      client: [],
      dates: null,
      payment_status: [],
      card_type: [],
      gateway: [],
      timezone: "",
    });
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    if (dates[0] !== null && dates[1] !== null) {
      setDates(dates);
      setFilter({ ...filter, dates });
    }
  };

  const handleOnchange = (e: any, value?: string) => {

    if (value === "dates") {
      console.log("dates", e, value);
      setFilter({ ...filter, [value]: e });
    } else if (e?.target?.name === "gateway") {
      if (e?.target?.value === "all2") {
        if (filter?.allGateways?.length === allGateways?.length) {
          setFilter({
            ...filter,
            [e.target.name]: [],
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: allGateways?.map((i: any) => i?.id) ?? [],
          });
        }
      } else {
        const data = filter?.allGateways?.filter((i: any) => i === e.target.value);
        if (data?.length > 0) {
          const data1 = filter?.allGateways?.filter(
            (i: any) => i !== e.target.value
          );
          setFilter({
            ...filter,
            [e.target.name]: data1,
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: [...(filter?.gateway ?? []), e.target.value],
          });
        }
      }
    } else if (e?.target?.name === "payment_status") {
      if (e?.target?.value === "all1") {
        if (filter?.payment_status?.length === 8) {
          setFilter({
            ...filter,
            [e.target.name]: [],
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: [
              "APPROVED",
              "REFUNDED",
              "AUTHORIZED",
              "CAPTURED",
              "PENDING",
              "CANCELLED",
              "DECLINED",
              "ERRORED",
            ],
          });
        }
      } else {
        const data = filter?.payment_status?.filter(
          (i: any) => i === e.target.value
        );
        if (data?.length > 0) {
          const data1 = filter?.payment_status?.filter(
            (i: any) => i !== e.target.value
          );
          setFilter({
            ...filter,
            [e.target.name]: data1,
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: [
              ...(filter?.payment_status ?? []),
              e.target.value,
            ],
          });
        }
      }
    } else if (e?.target?.name === "card_type") {
      if (e?.target?.value === "all5") {
        if (filter?.card_type?.length === 8) {
          setFilter({
            ...filter,
            [e.target.name]: [],
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: CardOption,
          });
        }
      } else {
        const data = filter?.card_type?.filter(
          (i: any) => i === e.target.value
        );
        if (data?.length > 0) {
          const data1 = filter?.card_type?.filter(
            (i: any) => i !== e.target.value
          );
          setFilter({
            ...filter,
            [e.target.name]: data1,
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: [
              ...(filter?.card_type ?? []),
              e.target.value,
            ],
          });
        }
      }
    } else if (e?.target?.name === "client") {
      if (e?.target?.value === "all") {
        if (filter?.client?.length === clients?.[0]?.length) {
          setFilter({
            ...filter,
            [e.target.name]: [],
          });
          return;
        } else {
          setFilter({
            ...filter,
            [e.target.name]: clients?.[0]?.map((i: any) => i?.client_id) ?? [],
          });
        }
      } else {
        const data = filter?.client?.filter((i: any) => i === e.target.value);
        if (data?.length > 0) {
          const data1 = filter?.client?.filter(
            (i: any) => i !== e.target.value
          );
          setFilter({
            ...filter,
            [e.target.name]: data1,
          });
        } else {
          setFilter({
            ...filter,
            [e.target.name]: [...(filter?.client ?? []), e.target.value],
          });
        }
      }
    } else {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
  };
  // const labels = {
  //   left: {
  //     title: "All",
  //     value: "left",
  //   },
  //   right: {
  //     title: "Live",
  //     value: "right",
  //   },
  //   center: {
  //     title: "Test",
  //     value: "center",
  //   },
  // };

  // const onChange = (value: any) => {
  //   console.log("value1111111", value);
  //   if (value === "left") {
  //     setFilter({ ...filter, status: "all" });
  //   } else if (value === "right") {
  //     setFilter({ ...filter, status: "live" });
  //   } else if (value === "center") {
  //     setFilter({ ...filter, status: "test" });
  //   }
  //   // filterData();
  // };

  return (
    <>
      <button
        className="rounded-full bg-indigo-600 my-1 md:my-3 px-3 py-2 text-white hover:bg-indigo-500"
        onClick={() => {
          onOpen();
        }}
      >
        Apply Filter
      </button>

      {/* <TripleToggleSwitch labels={labels} onChange={onChange} /> */}

      {(filter?.gateway?.length > 0 ||
        filter?.client?.length > 0 ||
        filter?.dates ||
        filter?.payment_status?.length > 0 || filter?.card_type?.length > 0 || filter?.timezone) && (
          <button
            className="rounded-full bg-red-500 my-1 md:my-3 px-3 py-2 text-white hover:bg-red-400"
            onClick={() => {
              setFilter({
                status: filter?.status ?? "all",
                client: [],
                dates: null,
                payment_status: [],
                card_type: [],
                gateway: [],
              });
            }}
          >
            Clear Filter
          </button>
        )}
      {/* <button
        className="disabled:opacity-50 disabled:cursor-not-allowed outline-none"
        onClick={onOpen}
        disabled={info?.row?.original?.status !== "APPROVED"}
      >
        <MdOutlineReplayCircleFilled className={varient === "small" ? "w-[21px] h-[21px] text-blue-500" : "w-6 h-6 text-blue-500"} />
      </button > */}
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-20 !m-auto !w-max    sm:min-w-[450px]  !max-w-[85%] bg-white		"> */}
        {/* <ModalContent className="!z-20 !m-auto !w-max min-w-[25rem] !max-w-[85%] md:top-[12vh] top-[15vh] h-[85vh] overflow-auto w-full"> */}
        {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh] ">
          <ModalBody className="">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] overflow-auto max-h-[84vh]  rounded-none " > */}
        <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="p-2">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">
              <h1 className="p-5 px-[30px] text-2xl font-bold ">Apply Filter</h1>
              {/* <div className="gap-2 max-h-[85vh] overflow-auto pb-[10px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"> */}

              <div className="mx-[35px] ">
                <div className="mb-3 block items-center gap-3">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Clients :
                  </label>
                  <div className="relative" ref={clientRef}>
                    <div
                      className="relative"
                      onClick={() => setClientDropdown(!clientdropdown)}
                    >
                      <p className="flex w-full items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none hover:cursor-pointer dark:!bg-navy-700 dark:text-white">
                        {filter?.client?.length > 0
                          ? filter?.client?.length === clients?.[0]?.length
                            ? "All Clients"
                            : clients?.[0]
                              ?.filter((item: any) =>
                                filter?.client.includes(item.client_id)
                              )
                              ?.map(
                                (i: any, index: any) => `${i?.name + " , "}`
                              )
                          : "Select Clients"}
                      </p>
                      <div className="absolute right-[14px] top-[50%] flex translate-y-[-50%] cursor-pointer items-center">
                        <FaChevronDown className="w-[14px]" />
                      </div>
                    </div>
                    <div
                      className={
                        clientdropdown
                          ? "absolute left-0 z-[999] max-h-[200px]	w-full overflow-y-auto bg-white duration-300 ease-in-out"
                          : "absolute left-0 z-[999] max-h-0	w-full overflow-hidden bg-white duration-300 ease-in-out"
                      }
                    >
                      <div className="rounded-xl rounded-xl border border-gray-200">
                        <div
                          className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                          key="all"
                        >
                          <input
                            className="h-[14px] w-[14px] cursor-pointer"
                            type="checkbox"
                            name="client"
                            value={"all"}
                            id={"all"}
                            checked={
                              filter?.client?.length === clients?.[0]?.length
                            }
                            onChange={(e) => handleOnchange(e)}
                          />
                          <label
                            className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                            htmlFor={`all`}
                          >
                            All
                          </label>
                        </div>
                        {clients?.[0]?.map((data: any, index: any) => {
                          return (
                            <div
                              className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                              key={index}
                            >
                              <input
                                className="h-[14px] w-[14px] cursor-pointer"
                                type="checkbox"
                                name="client"
                                value={data.client_id}
                                id={`${index + 1}c`}
                                checked={filter?.client?.includes(
                                  data?.client_id
                                )}
                                onChange={(e) => handleOnchange(e)}
                              />
                              <label
                                className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                                htmlFor={`${index + 1}c`}
                              >
                                {data.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 items-center gap-4">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Date :
                  </label>
                  {/*<DateRangePicker
                    className="w-full rounded-xl text-indigo-500"
                    placement={"auto"}
                    style={{ color: "#6366f1" }}
                    name="dates"
                    value={filter?.dates}
                    onClean={() => {
                      handleOnchange(null, "dates");
                    }}
                    onChange={(value) => {
                      handleOnchange(value, "dates");
                    }}
                  />*/}

                  <DateRange onDateChange={handleDateRangeChange} />
                </div>

                <div className="mb-3 block items-center gap-3">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Payments status :
                  </label>
                  <div className="relative" ref={payRef}>
                    <div
                      className="relative"
                      onClick={() => setPaymentDropdown(!paymentdropdown)}
                    >
                      <p className="flex w-full items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none hover:cursor-pointer dark:!bg-navy-700 dark:text-white">
                        {filter?.payment_status?.length > 0
                          ? filter?.payment_status?.length === 8
                            ? "All Payment Status"
                            : filter?.payment_status?.map(
                              (i: any, index: any) => `${i + " , "}`
                            )
                          : "Select payment status"}
                      </p>
                      <div className="absolute right-[14px] top-[50%] flex translate-y-[-50%] cursor-pointer items-center">
                        <FaChevronDown className="w-[14px]" />
                      </div>
                    </div>
                    <div
                      className={
                        paymentdropdown
                          ? "absolute left-0 z-[999] max-h-[200px]	w-full overflow-y-auto bg-white duration-300 ease-in-out"
                          : "absolute left-0 z-[999] max-h-0	w-full overflow-hidden bg-white duration-300 ease-in-out"
                      }
                    >
                      <div className="rounded-xl rounded-xl border border-gray-200">
                        <div
                          className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                          key="all"
                        >
                          <input
                            className="h-[14px] w-[14px] cursor-pointer"
                            type="checkbox"
                            name="payment_status"
                            value={"all1"}
                            id={"all1"}
                            checked={filter?.payment_status?.length === 8}
                            onChange={(e) => handleOnchange(e)}
                          />
                          <label
                            className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                            htmlFor={`all1`}
                          >
                            All
                          </label>
                        </div>
                        {[
                          "APPROVED",
                          "REFUNDED",
                          "AUTHORIZED",
                          "CAPTURED",
                          "PENDING",
                          "CANCELLED",
                          "DECLINED",
                          "ERRORED",
                          "REFUND DECLINED",
                          "CHARGEBACK",
                          "REJECTED"

                        ].map((item, index) => {
                          return (
                            <div
                              className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                              key={index}
                            >
                              <input
                                className="h-[14px] w-[14px] cursor-pointer"
                                type="checkbox"
                                name="payment_status"
                                value={item}
                                id={`${index + 1}p`}
                                checked={filter?.payment_status?.includes(item)}
                                onChange={(e) => handleOnchange(e)}
                              />
                              <label
                                className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                                htmlFor={`${index + 1}p`}
                              >
                                {item}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 block items-center gap-3">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Gateway :
                  </label>
                  <div className="relative" ref={getRef}>
                    <div
                      className="relative"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <p className="flex w-full items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none hover:cursor-pointer dark:!bg-navy-700 dark:text-white">
                        {filter?.allGateways?.length > 0
                          ? filter?.allGateways?.length === allGateways?.length
                            ? "All Gateway"
                            : filter?.allGateways?.map(
                              (i: any, index: any) => `${i + " , "}`
                            )
                          : "Select gateway"}
                      </p>
                      <div className="absolute right-[14px] top-[50%] flex translate-y-[-50%] cursor-pointer items-center">
                        <FaChevronDown className="w-[14px]" />
                      </div>
                    </div>
                    <div
                      className={
                        dropdown
                          ? "absolute left-0 z-[999] max-h-[200px]	w-full overflow-y-auto bg-white duration-300 ease-in-out"
                          : "absolute left-0 z-[999] max-h-0	w-full overflow-hidden bg-white duration-300 ease-in-out"
                      }
                    >
                      <div className="rounded-xl rounded-xl border border-gray-200">
                        <div
                          className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                          key="all"
                        >
                          <input
                            className="h-[14px] w-[14px] cursor-pointer"
                            type="checkbox"
                            name="gateway"
                            value={"all2"}
                            id={"all2"}
                            checked={
                              filter?.allGateways?.length === allGateways?.length
                            }
                            onChange={(e) => handleOnchange(e)}
                          />
                          <label
                            className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                            htmlFor={`all2`}
                          >
                            All
                          </label>
                        </div>

                        {allGateways?.map((item: any, index: any) => {
                          //console.log("ITEM",item,paymentName);
                          return (
                            <div
                              className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                              key={index}
                            >
                              <input
                                className="h-[14px] w-[14px] cursor-pointer text-gray-700"
                                type="checkbox"
                                name="gateway"
                                id={`${index + 1}`}
                                value={item?.id}
                                checked={filter?.allGateways?.includes(item?.id)}
                                onChange={(e) => handleOnchange(e)}
                              />
                              <label
                                className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                                htmlFor={`${index + 1}`}
                              >
                                {paymentName ? (item?.name) : (item?.id)}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 block items-center gap-3">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Time zone :
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={filter?.timezone}
                    onChange={(e) => handleOnchange(e)}
                    className="mt-1 flex h-10 w-full items-center justify-center rounded-xl border  bg-white/0 p-2 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  >
                    <option value="">Select TimeZone</option>
                    {timeZone?.map((data: any,index:number) => {
                      return (
                        <option
                          value={data?.label}
                          key={index}
                        >{`${data?.label}(${data?.value})`}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3  block items-center gap-3">
                  <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                    Card type :
                  </label>
                  <div className="relative" ref={cardRef}>
                    <div
                      className="relative"
                      onClick={() => setCardtypeDropdown(!cardtypedropdown)}
                    >
                      <p className="flex w-full items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none hover:cursor-pointer dark:!bg-navy-700 dark:text-white">
                        {filter?.card_type?.length > 0
                          ? filter?.card_type?.length === 8
                            ? "All Card Types"
                            : filter?.card_type?.map(
                              (i: any, index: any) => `${i + " , "}`
                            )
                          : "Select card types"}
                      </p>
                      <div className="absolute right-[14px] top-[50%] flex translate-y-[-50%] cursor-pointer items-center">
                        <FaChevronDown className="w-[14px]" />
                      </div>
                    </div>
                    <div
                      className={
                        cardtypedropdown
                          ? "absolute left-0 z-[999] max-h-[200px]  w-full overflow-y-auto bg-white duration-300 ease-in-out z-30 "
                          : "absolute left-0 z-[999] max-h-0  w-full overflow-hidden bg-white duration-300 ease-in-out"
                      }
                      style={{
                        overflow: "auto",
                        zIndex: 50000,
                        position: "relative"
                      }}
                    >
                      <div className="rounded-xl rounded-xl border border-gray-200 ">
                        <div
                          className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                          key="all"
                        >
                          <input
                            className="h-[14px] w-[14px] cursor-pointer"
                            type="checkbox"
                            name="card_type"
                            value={"all5"}
                            id={"all5"}
                            checked={filter?.card_type?.length === 8}
                            onChange={(e) => handleOnchange(e)}
                          />
                          <label
                            className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                            htmlFor={`all5`}
                          >
                            All
                          </label>
                        </div>
                        {CardOption.map((item) => {
                          return (
                            <div
                              className="border-b-zinc-300 flex items-center gap-[5px] p-[8px]"
                              key={item}
                            >
                              <input
                                className="h-[14px] w-[14px] cursor-pointer"
                                type="checkbox"
                                name="card_type"
                                value={item}
                                id={`${item + 1}p`}
                                checked={filter?.card_type?.includes(item)}
                                onChange={(e) => handleOnchange(e)}
                              />
                              <label
                                className="cursor-pointer text-sm font-normal text-[#777] dark:text-white"
                                htmlFor={`${item + 1}p`}
                              >
                                {item}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="mt-5 flex gap-2 px-[30px] pb-[10px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    filterData();
                    onClose();
                  }}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="mx-0 h-5 w-5 border-indigo-500 px-0" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
              {/* </div> */}

              {/* <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    filterData();
                    onClose();
                  }}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="mx-0 h-5 w-5 border-indigo-500 px-0" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div> */}

            </Card>
          </ModalBody>
          {/* <ModalFooter className="bg-white">
            <div className="mt-5 flex gap-2 px-[30px] pb-[10px]">
              <button
                onClick={handleClose}
                className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
              >
                Close
              </button>
              <button
                onClick={() => {
                  filterData();
                  onClose();
                }}
                className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
              >
                {isLoading ? (
                  <DivLoader className="mx-0 h-5 w-5 border-indigo-500 px-0" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
export default FilterModal;
