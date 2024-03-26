import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React from "react";
import Card from "components/card";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdCheck, MdFileCopy } from "react-icons/md";


const InfoModal = ({ info, varient }: { info?: any, varient?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copyPayment, setCopyPayment] = React.useState<boolean>(false)
  const [copyRefund, setCopyRefund] = React.useState<boolean>(false)
  const handleClose = () => {
    onClose();
  };

  //console.log(info);

  return (
    <>
      <button
        className="flex disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap px-3 py-2 text-blue-500 outline-none dark:text-gray-200"
        onClick={() => { onOpen() }}
        disabled={!info}
      >
        <BsInfoCircleFill className={varient === "small" ? "h-4 w-4" : "w-5 h-5"} />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-[1002] !m-auto !w-max min-w-[300px] !max-w-[85%] md:top-[12vh] flex justify-center min-h-[100vh] overflow-x-scroll">

          <ModalBody className="">
            <Card extra="max-w-[600px] flex flex-col !z-[1004]"> */}

        <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start !py-[100px] min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="p-2">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">

              <h1 className="p-5 px-[30px] text-2xl font-bold">
                Payment Info
              </h1>

              <div className="  relative flex flex-col h-fit max-h-[250px] overflow-auto mx-[35px] rounded-xl border border-gray-100  scrollbar scrollbar-h-1.5 scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-w-1.5  !overflow-auto max-w-[75vw]">
                <pre className="p-2">{JSON.stringify(info?.meta_info, null, 2)}</pre>
                <div className="absolute top-3 right-3 outline-none">
                  {copyPayment ?
                    <MdCheck className="cursor-pointer text-teal-500" />
                    :
                    <MdFileCopy
                      className="cursor-pointer text-teal-500"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(info?.meta_info))
                        setCopyPayment(true);
                        setTimeout(() => { setCopyPayment(false) }, 1500)
                      }}
                    />}
                </div>
              </div>
              {info?.refund_info &&
                <>
                  <h1 className="p-5 px-[30px] text-2xl font-bold">
                    Refund Info
                  </h1>

                  <div className="flex relative flex-col h-fit max-h-[250px] overflow-auto mx-[35px] rounded-xl border border-gray-100  scrollbar scrollbar-h-1.5 scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-w-1.5">
                    <pre className="p-2">{JSON.stringify(info?.refund_info, null, 2)}</pre>
                    <div className="absolute top-3 right-3 outline-none">
                      {copyRefund ?
                        <MdCheck className="cursor-pointer text-teal-500" />
                        :
                        <MdFileCopy
                          className="cursor-pointer text-teal-500"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(info?.refund_info))
                            setCopyRefund(true);
                            setTimeout(() => { setCopyRefund(false) }, 1500)
                          }}
                        />}
                    </div>
                  </div>
                </>
              }

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
export default InfoModal;
