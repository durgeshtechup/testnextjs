import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { refundPayment, retryPayment } from "api/payments";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import React from "react";
import { toast } from "react-hot-toast";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { convertToFloat } from "utils/formatNumber";
import { MdOutlineRefresh } from "react-icons/md";


const RetryModal = ({
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

    const handleClose = () => {
        onClose();
    };
    //console.log("enRefund",info);
    async function handleRetry(data: any) {
        setIsLoading(true);
        //console.log("enRefund",data); 
        retryPayment(data)

            .then((resp: any) => {
                // console.log("resp", resp)
                if (resp?.status) {
                    toast.success("Payment created successfully");
                } else {
                    toast.error("Unable to do this transaction");
                }
                onClose();
                fetchPayments();
            })
            .catch((err: any) => {
                toast.error(
                    err?.response?.data?.error ?? "Unable to do this transaction"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (

        <>
            <button
                className="outline-none disabled:cursor-not-allowed disabled:opacity-50"
                onClick={onOpen}
                disabled={

                    (
                        info?.client === "Banwire" ||
                        info?.id?.includes("payout") ||
                        //enRefund === true           
                        (
                            info?.status === "REFUNDED" ||
                            // info?.status === "ERRORED" ||
                            // info?.status === "DECLINED" ||
                            info?.status === "CREATED" ||
                            info?.status === "AUTHORIZED" ||
                            // info?.status === "CANCELLED" ||
                            info?.status === "PENDING" ||
                            info?.status === "CAPTURED" ||
                            info?.status === "APPROVED" ||
                            info?.status === "REFUND DECLINED"

                        )
                    )
                        ? true
                        : false
                }
            >
                <MdOutlineRefresh
                    className={
                        varient === "small"
                            ? "h-[21px] w-[21px] text-blue-500"
                            : "h-6 w-6 text-blue-500"
                    }
                />
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className="bg-[#000] !opacity-30" />
                {/* <ModalContent className="!z-[1002] !m-auto !w-max min-w-[450px] !max-w-[85%] md:top-[12vh]"> */}
                <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
                    <ModalBody>

                        <Card extra="px-[5px] pt-[38px] max-w-[800px]  flex flex-col !z-[1004]">
                            <h1 className="p-3 px-[30px] text-2xl font-bold">
                                Retry Payment
                            </h1>

                            <div className="mx-[35px]">
                                <p>
                                    Retry the transaction{" "}
                                    <strong>{info?.id}</strong>. Do you want to
                                    continue?
                                </p>
                                <p className="mt-3 flex gap-1.5 text-xl">
                                    Retry
                                    <span className="text-xl font-bold uppercase">
                                        {convertToFloat(info?.amount)}{" "}
                                        {info?.currency}
                                    </span>
                                    ?
                                </p>
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
                                        handleRetry({ internal_id: transactionID });
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
export default RetryModal;
