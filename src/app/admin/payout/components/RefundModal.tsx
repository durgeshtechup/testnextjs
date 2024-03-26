import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { refundPayment } from "api/payments";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import React from "react";
import { toast } from "react-hot-toast";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { convertToFloat } from "utils/formatNumber";

const RefundModal = ({
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
  async function handleRefund(data: any) {
    setIsLoading(true);
    //console.log("enRefund",data); 
    refundPayment(data)

      .then((resp: any) => {
        if (resp?.message?.status === "REFUNDED") {
          toast.success("Successfully refunded");
        } else {
          toast.error("Refund failed");
        }
        onClose();
        fetchPayments();
      })
      .catch((err: any) => {
        toast.error(
          err?.response?.data?.error ?? "Unable refund this transaction"
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
            info?.et_id?.includes("payout") ||
            //enRefund === true           
            (
              info?.status === "REFUNDED" ||
              info?.status === "ERRORED" ||
              info?.status === "DECLINED" ||
              info?.status === "CREATED" ||
              info?.status === "AUTHORIZED" ||
              info?.status === "CANCELLED" ||
              info?.status === "PENDING" ||
              !enRefund

            )
          )
            ? true
            : false
        }
      >
        <MdOutlineReplayCircleFilled
          className={
            varient === "small"
              ? "h-[21px] w-[21px] text-blue-500"
              : "h-6 w-6 text-blue-500"
          }
        />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra=" max-w-[800px]   flex flex-col !z-[1004]">
              <h1 className="p-3 px-[30px] text-2xl font-bold">
                Refund Payment
              </h1>

              <div className="mx-[35px]">
                <p>
                  This will refund the transaction{" "}
                  <strong>{info?.et_id}</strong>. Do you want to
                  continue?
                </p>
                <p className="mt-3 flex gap-1.5 text-xl">
                  Refund
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
                    handleRefund({ transaction_id: transactionID });
                  }}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="mx-0 h-5 w-5 border-indigo-500 px-0" />
                  ) : (
                    "Refund"
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
export default RefundModal;
