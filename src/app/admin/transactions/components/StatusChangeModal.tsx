import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { changePaymentStatus, refundPayment, retryPayment } from "api/payments";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import React from "react";
import { toast } from "react-hot-toast";
import { MdChangeCircle, MdOutlineReplayCircleFilled } from "react-icons/md";
import { convertToFloat } from "utils/formatNumber";
import { MdOutlineRefresh } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import Checkbox from "components/checkbox";

import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import 'assets/css/dateRange.css';
import moment from "moment";
import convertTimezone from "utils/timeConvert";
import InputField from "components/fields/InputField";
// 


const ChangeStatusModal = ({
    info,
    fetchPayments,
    transactionID,
    varient,
    enRefund,
}: {
    info?: any;
    fetchPayments: () => void;
    transactionID: string;
    varient?: string;
    enRefund?: any;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = React.useState<boolean>();
    const [changeStatusFormData, setChangeStatusFormData] = React.useState<any>({});

    const handleClose = () => {
        onClose();
        setChangeStatusFormData({})
    };
    console.log("infosdd", info)
    async function handleSubmit() {
        if (!changeStatusFormData?.change_status_to) {
            toast.error("Please select status")
        } else if (changeStatusFormData?.isChangeStatusDate == true && !changeStatusFormData?.changeStatusDate) {
            toast.error("Please select date")

        } else if (changeStatusFormData?.change_status_to == "APPROVED" && (!changeStatusFormData?.transaction_id || !changeStatusFormData?.auth_id)) {
            toast.error("Please enter required fields")
        }

        else {
            setIsLoading(true);
            // if (changeStatusFormData?.isChangeStatusDate) {
            //     let sec = new Date()

            //     changeStatusFormData?.changeStatusDate.setSeconds(sec.getSeconds())

            // }
            let data = {
                arn_number: changeStatusFormData?.ARN_Number,
                reason: changeStatusFormData?.ReasonToChange,
                current_status: changeStatusFormData?.change_status_to,
                change_status_date: changeStatusFormData?.isChangeStatusDate == true ? moment(changeStatusFormData?.changeStatusDate).format("MM-DD-YYYY, HH:mm:ss") : moment(info?.created_at.replace("GMT", "")).format("MM-DD-YYYY, HH:mm:ss"),
                transaction_id: changeStatusFormData?.change_status_to == "APPROVED" ? changeStatusFormData?.transaction_id : undefined,
                auth_id: changeStatusFormData?.change_status_to == "APPROVED" ? changeStatusFormData?.auth_id : undefined
            }
            changePaymentStatus(data, transactionID)

                .then((resp: any) => {
                    // console.log("resp", resp)
                    // if (resp?.status) {
                    toast.success("Status updated successfully!");
                    // } else {
                    //     toast.error("Something went wrong!");
                    // }
                    handleClose()
                    fetchPayments();
                })
                .catch((err: any) => {
                    toast.error(
                        err?.response?.data?.error ?? "Something went wrong!"
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });

        }


    }
    const handleInputChange = (e: any) => {
        const name = e?.target?.name;
        const value = e?.target?.value

        setChangeStatusFormData((prev: any) => {
            return {
                ...prev,
                [name]: value === "true"
                    ? true
                    : value == "false"
                        ? false
                        : value
            }
        })




    }

    console.log("testsf", new Date(info?.created_at))

    const handleInputDateChange = (date: any) => {
        console.log("DateDate::", moment(date).format("MM-DD-YYYY, HH:mm:ss"))
        setChangeStatusFormData((prev: any) => {
            return {
                ...prev,
                "changeStatusDate": date
            }
        })

    }

    return (

        <>
            <button
                className="outline-none disabled:cursor-not-allowed disabled:opacity-50"
                onClick={onOpen}

            >

                <MdChangeCircle
                    className={
                        varient === "small"
                            ? "h-[21px] w-[21px] text-blue-500"
                            : "h-6 w-6 text-blue-500"
                    }
                />
            </button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay className="bg-[#000] !opacity-30" />
                {/* <ModalContent className="!z-[1002] !m-auto !w-max min-w-[450px] !max-w-[85%] md:top-[12vh]"> */}
                <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">

                    {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify- min-h-[100vh]"> */}
                    <ModalBody className="p-2">
                        {/* <Card extra="px-[5px] pt-[38px] max-w-[800px]  flex flex-col !z-[1004]"> */}
                        <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">

                            <h1 className="p-3 px-[30px] text-2xl font-bold text-gray-900">
                                Change Payment Status
                            </h1>
                            <div className="mx-[35px]">
                                <div>
                                    <label htmlFor="selected_status_dropdown" className=" mb-2 text-sm font-bold text-gray-900 dark:text-white">Current Status</label>
                                    <select
                                        id="selected_status_dropdown"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                                        // value={}
                                        name="current_status"
                                        value={info?.status}
                                        disabled

                                    >
                                        {[
                                            "APPROVED",
                                            "REFUNDED",
                                            "AUTHORIZED",
                                            "CAPTURED",
                                            "PENDING",
                                            "CANCELLED",
                                            "CREATED",
                                            "DECLINED",
                                            "ERRORED",
                                            "REFUND DECLINED",
                                            "REJECTED",
                                            "CHARGEBACK",
                                            "ALERTED",
                                            "HELD",
                                            "DUPLICATE"

                                        ].map((status:any,index:any) => {
                                            return <option key={index} value={status} >
                                                {status}
                                            </option>
                                        })}

                                    </select>

                                </div>
                                <div className="mt-3">
                                    <label htmlFor="change_status_dropdown" className=" mb-2 text-sm font-bold text-gray-900 dark:text-white">Change Status to</label>
                                    <select
                                        name="change_status_to"
                                        id="change_status_dropdown"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white mt-2 focus:outline-none"
                                        value={changeStatusFormData?.change_status_to}
                                        onChange={handleInputChange}

                                    >
                                        <option value="">
                                            Select
                                        </option>
                                        {[
                                            "APPROVED",
                                            "REFUNDED",
                                            "AUTHORIZED",
                                            "CAPTURED",
                                            "PENDING",
                                            "CANCELLED",
                                            "CREATED",
                                            "DECLINED",
                                            "ERRORED",
                                            "REFUND DECLINED",
                                            "REJECTED",
                                            "CHARGEBACK",
                                            "ALERTED",
                                            "HELD",
                                            "DUPLICATE"
                                        ].map((status:any,index:any) => {
                                            return <option
                                            key={index}
                                                value={status}
                                                disabled={info?.status == status}
                                            >
                                                {status}
                                            </option>
                                        })}

                                    </select>

                                </div>
                                {changeStatusFormData?.change_status_to == "APPROVED" && <div className="mt-3">
                                    <InputField
                                        variant="auth"
                                        extra="mb-1"
                                        label="Transaction Id*"
                                        placeholder="Transaction id"
                                        id="transaction_id"
                                        type="text"
                                        name="transaction_id"
                                        value={changeStatusFormData?.transaction_id ?? ""}
                                        //   state={changeStatusFormData?.transaction_id ? "error" : ""}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        variant="auth"
                                        extra="mb-1"
                                        label="Auth Id*"
                                        placeholder="Auth id"
                                        id="auth_id"
                                        type="text"
                                        name="auth_id"
                                        value={changeStatusFormData?.auth_id ?? ""}
                                        //   state={changeStatusFormData?.transaction_id ? "error" : ""}
                                        onChange={handleInputChange}
                                    />
                                </div>}
                                {changeStatusFormData?.change_status_to && <div>


                                    <div className="mt-3 flex items-center">

                                        <Checkbox
                                            id="isChangeStatusDate"
                                            value={!changeStatusFormData?.isChangeStatusDate}
                                            name="isChangeStatusDate"


                                            className={`${changeStatusFormData?.isChangeStatusDate == null ? "dark:bg-gray-700 w-4 h-4" : "w-4 h-4"}`}
                                            checked={changeStatusFormData?.isChangeStatusDate}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="isChangeStatusDate" className="text-sm font-bold text-gray-900 dark:text-white mx-2">Change Date</label>

                                    </div>
                                    {(changeStatusFormData?.isChangeStatusDate == "true" || changeStatusFormData?.isChangeStatusDate) && <div className="mt-3" >
                                        <label htmlFor="currentStatusDate" className=" mb-3 text-sm font-bold text-gray-900 dark:text-white">Current Date</label>

                                        <div className="relative max-w-sm flex items-center">


                                            <DatePicker
                                                id="currentStatusDate"
                                                name="currentStatusDate"
                                                placeholderText="Select Date"
                                                className={`flex h-10 w-full mt-2 items-center text-gray-700 justify-center rounded-xl border bg-gray/0 p-3 text-sm outline-none`}
                                                selected={new Date(new Date(info?.created_at?.replace("GMT", "")).toUTCString())}
                                                disabled
                                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                                onChange={handleInputDateChange}
                                            />
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pt-2 pointer-events-none">
                                                {/* <svg fill="none" className="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" /></svg>
                                             */}
                                                GMT
                                            </div>
                                        </div>

                                    </div>}
                                    {(changeStatusFormData?.isChangeStatusDate == "true" || changeStatusFormData?.isChangeStatusDate) && <div className="mt-3" >
                                        <label htmlFor="changeStatusDate" className=" mb-3 text-sm font-bold text-gray-900 dark:text-white">Change Date to</label>

                                        <div className="relative max-w-sm">


                                            <DatePicker
                                                id="changeStatusDate"
                                                name="changeStatusDate"
                                                placeholderText="Select Date"
                                                className={` h-10 w-full mt-2  text-gray-700  rounded-xl border bg-white/0 p-3 text-sm outline-none`}
                                                selected={changeStatusFormData?.changeStatusDate}
                                                // selected={new Date(info?.created_at)}
                                                timeInputLabel="Time:"

                                                dateFormat="yyyy-MM-dd HH:mm:ss"

                                                onChange={handleInputDateChange}
                                                showTimeSelect
                                                timeFormat="HH:mm:ss"
                                                timeIntervals={15}
                                            // dateFormat="Pp"
                                            />
                                            {/* <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pt-2 pointer-events-none">

                                            GMT
                                        </div> */}
                                        </div>

                                    </div>}
                                </div>}
                                {changeStatusFormData?.change_status_to == "CHARGEBACK" && <div className="mt-3" >
                                    <label htmlFor="ARN_Number" className=" mb-3 text-sm font-bold text-gray-900 dark:text-white">ARN Number</label>
                                    <input
                                        type="text"
                                        id="ARN_Number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white mt-2"
                                        placeholder="Enter ARN Number"
                                        required
                                        name="ARN_Number"
                                        onChange={handleInputChange}
                                        value={changeStatusFormData?.ARN_Number}


                                    />
                                </div>}
                                {changeStatusFormData?.change_status_to == "CHARGEBACK" && <div className="mt-3">
                                    <label htmlFor="Reason" className=" mb-2 text-sm font-bold text-gray-900 dark:text-white">Reason</label>
                                    <textarea id="Reason"
                                        onChange={handleInputChange}
                                        value={changeStatusFormData?.ReasonToChange}


                                        name="ReasonToChange" rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white mt-2" placeholder="Write chargeback reason..">

                                    </textarea>
                                </div>}
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
                                        handleSubmit();
                                    }}
                                    className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                                >
                                    {isLoading ? (
                                        <DivLoader className="mx-0 h-5 w-5 border-indigo-500 px-0" />
                                    ) : (
                                        "Ok"
                                    )}
                                </button>
                            </div>
                        </Card>

                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};
export default ChangeStatusModal;
