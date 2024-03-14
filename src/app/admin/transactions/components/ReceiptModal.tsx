import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import Card from "components/card";
import { BsReceipt } from "react-icons/bs";


const ReceiptModal = ({ info, varient }: { info?: any, varient?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <button
        className="flex disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap text-blue-500 outline-none dark:text-gray-200"
        onClick={() => { onOpen() }}
        disabled={!info?.row?.original?.receipt_url}
      >
        <BsReceipt className={varient === "small" ? "h-4 w-4" : "w-5 h-5"} />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[450px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="max-w-[600px] flex flex-col !z-[1004]">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                Payment Receipt
              </h1>

              <div className="relative flex flex-col h-fit max-h-[250px] overflow-auto mx-[35px] rounded-xl border border-gray-100 w-[450px] scrollbar scrollbar-h-1.5 scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-w-1.5">
                <iframe
                  src={"https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTHNxTzlDSWFBV3RDQWlyKJSPj6UGMgZtPC1G2LU6LBbUWxB2O1BeNG34OtCWvI11BBSOFnxdANr0zxN5OgOa3WHZKKJn2nPqBCUH"}
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="outline-none linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ReceiptModal;
