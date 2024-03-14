import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { getRecover } from 'api/users';
import Card from 'components/card';
import DivLoader from 'components/divloader/DivLoader';
import InputField from 'components/fields/InputField';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Recover({
    status,
    data,
    profileData,
    fetch2fa,
    fetchProfile,
    setModel2FA,
    setData,
    loginData
}:{
    status?: any;
    data?: any;
    fetch2fa?: () => void;
    profileData?: any;
    fetchProfile?: () => void;
    setModel2FA?: any;
    setData?: any;
    loginData?:any
}) {
  const verifyData = loginData;
  const rootForm = {
    recover_key: "",
  };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = React.useState<boolean>();
    const [formValues, setFormValues] = React.useState<any>();
    const [formValuesErr, setFormValuesErr] = React.useState<any>();

    const handleClose = () => {
        setFormValues(rootForm);
        setFormValuesErr(rootForm);
        onClose();
      };
      function handleValueChange(e: any) {
        setFormValues((preVal: any) => {
          return { ...preVal, [e.target.id]: e.target.value };
        });
        setFormValuesErr((preVal: any) => {
          return { ...preVal, [e.target.id]: "" };
        });
      }

      function validateData() {
        if (formValues.recover_key.length < 6) {
          setFormValuesErr((preval: any) => {
            return {
              ...preval,
              recover_key: "Recover key must be required",
            };
          });
          return false;
        }
    
        return true;
      }
      async function handleSubmit(e: any) {
        e.preventDefault();
        let validate = validateData();
        if (validate) {
          try {
            setIsLoading(true);
            await getRecover({
              recover_key: formValues?.recover_key?.trim(),
              user_id: verifyData?.user_id,
            })
              .then((data) => {
                setModel2FA(formValues?.recover_key);
                setData(data)
                // fetchProfile();
                toast.success(data?.message ?? "Recover key verified successfully");
              })
              .catch((err) => {
                toast.error(
                  err?.response?.data?.message ??
                    "Something went wrong while fetching Recover"
                );
              })
              .finally(() => {
                // setIsLoading(false);
              });
            handleClose();
          } catch (err: any) {
            if (err?.response?.status === 422) {
              toast.error("Please provide valid values");
            } else {
              toast.error(err?.response?.data?.message ?? "Unable save user data");
            }
          } finally {
            setIsLoading(false);
          }
        }
      }
      const handelEnter = (event: any) => {
        const keyCode = event.keyCode || event.which;
        if (keyCode === 13) {
          handleSubmit(event);
        }
      };




  return (
    <div>
         <p
        onClick={() => {
          onOpen();
        }}
        className="ml-1 mt-2 cursor-pointer text-[15px] font-medium text-brand-500 hover:text-brand-600 dark:text-white"
      >
        Add Recover
      </p>
        <Modal isOpen={isOpen} onClose={() => {}} >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="top-[12vh] !z-[1002] !m-auto !w-max min-w-[400px] !max-w-[85%] max-w-[600px] lg:min-w-[400px]">

    <ModalBody>
        <Card extra="max-w-[600px] flex flex-col !z-[1004] h-[300px] w-[550px] 2xl:h-full ">

        <h1 className="border-b-2 p-5 px-[30px] text-2xl font-bold">
                Recover Authentication
              </h1>
              <h2 className="mx-[30px] border-b-2 pt-5 text-lg font-medium font-semibold text-indigo-500">
                Recover Key
              </h2>

              <p className="px-[30px] pt-3 text-[15px] text-gray-900 dark:text-white">
                Must provide it when they want to reset their 2FA:
              </p>
              <div className="max-h-[calc(100vh-300px)] px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
              <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label=""
                  placeholder="Recover Key"
                  id="recover_key"
                  onKeyDown={(e: any) => handelEnter(e)}
                  type="text"
                  value={formValues?.recover_key}
                  state={formValuesErr?.recover_key ? "error" : ""}
                  errMessage={formValuesErr?.recover_key}
                  onChange={handleValueChange}
                />

</div>
<div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
        </Card>

    </ModalBody>
</ModalContent>
        </Modal>
    </div>
  )
}

export default Recover