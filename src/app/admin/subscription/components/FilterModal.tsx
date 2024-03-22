import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/modal";
import { getGateways, getTimeZone, refundPayment } from "api/payments";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
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
import DateRange from "components/fields/DateRange";
import InputField from "components/fields/InputField";
import { CiFilter } from "react-icons/ci";

const FilterModal = ({
    subClientsData,
    setPage,
    filter,
    setFilter,
    roleData,
    filterData,
    fetchSubscriptions
}: {
    subClientsData?: any;

    setPage?: any;

    filter?: any;
    setFilter?: (e: any) => void;
    roleData?: any;
    filterData: () => void;
    fetchSubscriptions: any

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
    const [localFilter, setLocalFilter] = React.useState({
        clients: [],
        interval: [],
        duration: null,
        status: [],
    })



    // React.useEffect(() => {
    //     setPaymentName(roleData[0]?.payment?.value?.payment_show_method_name);
    //     if (allCardType !== undefined) {
    //         setCardOption(allCardType);
    //     }
    // }, [allCardType]);

    const clientRef = useRef();
    useOnClickOutsideSingel(clientRef, () => {
        setClientDropdown(false);
    });
    // const payRef = useRef();
    // useOnClickOutsideSingel(payRef, () => {
    //     setPaymentDropdown(false);
    // });
    // const cardRef = useRef();
    // useOnClickOutsideSingel(cardRef, () => {
    //     setCardtypeDropdown(false);
    // });
    // const getRef = useRef();
    // useOnClickOutsideSingel(getRef, () => {
    //     setDropdown(false);
    // });



    // const fetchTimeZone = () => {
    //     // setIsLoading(true);
    //     getTimeZone()
    //         .then((data) => {
    //             setTimeZone(data ?? []);
    //         })
    //         .catch((err) => {
    //             toast.error(
    //                 err?.response?.data?.message ??
    //                 "Something went wrong while fetching time zone"
    //             );
    //         })
    //         .finally(() => {
    //             // setIsLoading(false);
    //         });
    // };

    useEffect(() => {
        // fetchTimeZone();

    }, []);



    //console.log("filterrrrr", roleData[0]?.payment?.value?.payment_show_method_name);

    const handleClose = () => {
        onClose();
        // setFilter({
        //     clients: [],
        //     interval: [],
        //     duration: null,
        //     status: [],
        // });
        // filterData()
    };

    // const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    //     if (dates[0] !== null && dates[1] !== null) {
    //         setDates(dates);
    //         setFilter({ ...filter, dates });
    //     }
    // };

    const handleOnchange = (e: any, value?: string) => {

        // if (value === "dates") {
        //     console.log("dates", e, value);
        //     setFilter({ ...filter, [value]: e });
        // } else if (e?.target?.name === "gateway") {
        //     if (e?.target?.value === "all2") {
        //         if (filter?.allGateways?.length === allGateways?.length) {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [],
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: allGateways?.map((i: any) => i?.id) ?? [],
        //             });
        //         }
        //     } else {
        //         const data = filter?.allGateways?.filter((i: any) => i === e.target.value);
        //         if (data?.length > 0) {
        //             const data1 = filter?.allGateways?.filter(
        //                 (i: any) => i !== e.target.value
        //             );
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: data1,
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [...(filter?.gateway ?? []), e.target.value],
        //             });
        //         }
        //     }
        // } else if (e?.target?.name === "payment_status") {
        //     if (e?.target?.value === "all1") {
        //         if (filter?.payment_status?.length === 8) {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [],
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [
        //                     "APPROVED",
        //                     "REFUNDED",
        //                     "AUTHORIZED",
        //                     "CAPTURED",
        //                     "PENDING",
        //                     "CANCELLED",
        //                     "DECLINED",
        //                     "ERRORED",
        //                 ],
        //             });
        //         }
        //     } else {
        //         const data = filter?.payment_status?.filter(
        //             (i: any) => i === e.target.value
        //         );
        //         if (data?.length > 0) {
        //             const data1 = filter?.payment_status?.filter(
        //                 (i: any) => i !== e.target.value
        //             );
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: data1,
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [
        //                     ...(filter?.payment_status ?? []),
        //                     e.target.value,
        //                 ],
        //             });
        //         }
        //     }
        // } else if (e?.target?.name === "card_type") {
        //     if (e?.target?.value === "all5") {
        //         if (filter?.card_type?.length === 8) {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [],
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: CardOption,
        //             });
        //         }
        //     } else {
        //         const data = filter?.card_type?.filter(
        //             (i: any) => i === e.target.value
        //         );
        //         if (data?.length > 0) {
        //             const data1 = filter?.card_type?.filter(
        //                 (i: any) => i !== e.target.value
        //             );
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: data1,
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [
        //                     ...(filter?.card_type ?? []),
        //                     e.target.value,
        //                 ],
        //             });
        //         }
        //     }
        // } else if (e?.target?.name === "client") {
        //     if (e?.target?.value === "all") {
        //         if (filter?.client?.length === clients?.[0]?.length) {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [],
        //             });
        //             return;
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: clients?.[0]?.map((i: any) => i?.client_id) ?? [],
        //             });
        //         }
        //     } else {
        //         const data = filter?.client?.filter((i: any) => i === e.target.value);
        //         if (data?.length > 0) {
        //             const data1 = filter?.client?.filter(
        //                 (i: any) => i !== e.target.value
        //             );
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: data1,
        //             });
        //         } else {
        //             setFilter({
        //                 ...filter,
        //                 [e.target.name]: [...(filter?.client ?? []), e.target.value],
        //             });
        //         }
        //     }
        // } else {
        //     setFilter({ ...filter, [e.target.name]: e.target.value });
        // }

        // setFilter({ ...filter, [e.target.name]: e.target.value });

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

    const handleClientSubChange = (values: any) => {
        setLocalFilter((prev: any) => {
            return {
                ...prev,
                clients: values
            }
        })
    }

    const handleIntervalChange = (values: any) => {
        setLocalFilter((prev: any) => {
            return {
                ...prev,
                interval: values
            }
        })
    }

    const handleStatusChange = (values: any) => {
        setLocalFilter((prev: any) => {
            return {
                ...prev,
                status: values
            }
        })
    }

    const handleValueChange = (e: any) => {
        const value = e.target.value
        setLocalFilter((prev: any) => {
            return {
                ...prev,
                duration: value
            }
        })
    }



    return (
        <>
            <button
                // className="rounded-full bg-indigo-600 my-1 md:my-3 px-3 py-2 text-white hover:bg-indigo-500"
                className="rounded-full border my-1 md:my-3 px-3 py-2 text-gray-900 hover:text-white font-bold hover:bg-indigo-500"
                onClick={() => {
                    onOpen();
                }}
            >
               <CiFilter className="text-lg" />
            </button>


            {(
                filter?.clients?.length > 0 ||
                filter?.duration > 0 ||
                filter?.status?.length > 0 || filter?.interval?.length > 0) && (
                    <button
                        className="rounded-full bg-red-500 my-1 md:my-3 px-3 py-2 text-white hover:bg-red-400"
                        onClick={() => {
                            setFilter({
                                clients: [],
                                interval: [],
                                duration: null,
                                status: [],
                            });
                            setLocalFilter(
                                {
                                    clients: [],
                                    interval: [],
                                    duration: null,
                                    status: [],
                                }
                            )
                            fetchSubscriptions()


                        }}
                    >
                        Clear Filter
                    </button >
                )}

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay className="bg-[#000] !opacity-30" />
                {/* <ModalContent className="!z-20 !m-auto !w-max sm:min-w-[450px] !max-w-[85%] bg-white		"> */}
                {/* <ModalContent className="!z-20 !m-auto !w-max min-w-[25rem] !max-w-[85%] md:top-[12vh] top-[15vh] h-[85vh] overflow-auto w-full"> */}

                {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
                    <ModalBody>

                        <Card extra=" max-w-[800px]  flex flex-col !z-[1004]"> */}

                <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
                    <ModalBody className="p-2">

                        <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">
                            <h1 className="p-5 px-[30px] text-2xl font-bold">Apply Filter</h1>
                            <div className="mx-[35px]">
                                <div className="mb-3 block items-center gap-3">
                                    <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                                        Clients :
                                    </label>
                                    <div className="relative" ref={clientRef}>
                                        <MultiSelect
                                            options={subClientsData}
                                            value={localFilter?.clients}
                                            onChange={handleClientSubChange}
                                            labelledBy={"Select"}
                                            isCreatable={false}


                                        />
                                    </div>
                                </div>

                                <div className="mb-3 block items-center gap-3">
                                    <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                                        Intervals :
                                    </label>
                                    <div className="relative" ref={clientRef}>
                                        <MultiSelect
                                            options={["WEEKLY", "MONTHLY", "YEARLY"].map((m: any) => {
                                                return {
                                                    label: m,
                                                    value: m
                                                }
                                            })}
                                            value={localFilter?.interval}
                                            onChange={handleIntervalChange}
                                            labelledBy={"Select"}
                                            isCreatable={false}


                                        />
                                    </div>
                                </div>

                                <div className="mb-3 block items-center gap-3">
                                    <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                                        Duration :
                                    </label>
                                    <div className="relative" >
                                        <InputField
                                            variant="auth"

                                            extra="mb-1"
                                            label=""
                                            placeholder="Duration"
                                            id="Duration"
                                            type="number"
                                            value={localFilter?.duration ?? ""}
                                            // state={formValuesErr?.business_name ? "error" : ""}
                                            onChange={handleValueChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 block items-center gap-3">
                                    <label className="block pb-[6px] text-sm font-bold text-gray-900 dark:text-white">
                                        Status :
                                    </label>
                                    <div className="relative" ref={clientRef}>
                                        <MultiSelect
                                            options={["ACTIVE", "COMPLETED", "CANCELLED"].map((m: any) => {
                                                return {
                                                    label: m,
                                                    value: m
                                                }
                                            })}
                                            value={localFilter?.status}
                                            onChange={handleStatusChange}
                                            labelledBy={"Select"}
                                            isCreatable={false}


                                        />
                                    </div>
                                </div>


                            </div>
                            <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                                <button
                                    onClick={handleClose}
                                    className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter(localFilter)
                                        // filterData();
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
                    {/* <ModalFooter className="bg-white	">  
                   
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );

}
export default FilterModal;
